import React, { useCallback, useMemo, useState } from 'react';
import TopBar from './components/TopBar';
import LeftSidebarTools from './components/LeftSidebarTools';
import Viewport3D from './components/Viewport3D';
import RightSidebarProperties from './components/RightSidebarProperties';

const baseBg = '#121212';
const accent = '#26A69A';

export default function App() {
  const [selectedTool, setSelectedTool] = useState('text-to-3d');
  const [aiParams, setAiParams] = useState({
    textPrompt: '',
    style: 'photorealistic',
    complexity: 0.6,
    detail: 0.7,
    depthEstimation: 0.5,
    meshDensity: 0.5,
    textureDetail: 0.7,
  });

  const [material, setMaterial] = useState({
    name: 'Default PBR',
    color: '#cccccc',
    metallic: 0.1,
    roughness: 0.6,
    normalStrength: 0.5,
    maps: {
      albedo: '',
      normal: '',
      roughness: '',
      metalness: '',
      specular: '',
    },
  });

  const [meshSettings, setMeshSettings] = useState({ resolution: 1, subdivision: 0, lod: true, occlusionCulling: true, autoRetopo: false });

  const [animation, setAnimation] = useState({
    playing: false,
    time: 0,
    interpolation: 'linear',
    easing: 'easeInOut',
  });

  const [generationProgress, setGenerationProgress] = useState({ active: false, percent: 0, phase: '' });
  const [exportProgress, setExportProgress] = useState({ active: false, percent: 0, format: 'glTF' });

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const pushHistory = useCallback((snapshot) => {
    setUndoStack((s) => [...s, snapshot]);
    setRedoStack([]);
  }, []);

  const onUndo = useCallback(() => {
    setUndoStack((s) => {
      if (!s.length) return s;
      const prev = s[s.length - 1];
      setRedoStack((r) => [...r, getSnapshot()]);
      applySnapshot(prev);
      return s.slice(0, -1);
    });
  }, []);

  const onRedo = useCallback(() => {
    setRedoStack((r) => {
      if (!r.length) return r;
      const next = r[r.length - 1];
      setUndoStack((s) => [...s, getSnapshot()]);
      applySnapshot(next);
      return r.slice(0, -1);
    });
  }, []);

  const getSnapshot = () => ({ selectedTool, aiParams, material, meshSettings, animation });
  const applySnapshot = (snap) => {
    setSelectedTool(snap.selectedTool);
    setAiParams(snap.aiParams);
    setMaterial(snap.material);
    setMeshSettings(snap.meshSettings);
    setAnimation(snap.animation);
  };

  const handleGenerateTextTo3D = useCallback(() => {
    pushHistory(getSnapshot());
    setGenerationProgress({ active: true, percent: 5, phase: 'Parsing prompt' });
    let p = 5;
    const steps = ['Parsing prompt', 'Generating base mesh', 'Refining topology', 'Texturing', 'Lighting preview'];
    const interval = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18);
      const phase = steps[Math.min(steps.length - 1, Math.floor((p / 100) * steps.length))];
      setGenerationProgress({ active: p < 100, percent: p, phase });
      if (p >= 100) clearInterval(interval);
    }, 500);
  }, []);

  const handleCancelGeneration = useCallback(() => {
    setGenerationProgress({ active: false, percent: 0, phase: '' });
  }, []);

  const handleExport = useCallback((format, settings) => {
    setExportProgress({ active: true, percent: 5, format });
    let p = 5;
    const interval = setInterval(() => {
      p = Math.min(100, p + Math.random() * 22);
      setExportProgress((e) => ({ ...e, active: p < 100, percent: p }));
      if (p >= 100) clearInterval(interval);
    }, 450);
  }, []);

  const uiTheme = useMemo(() => ({ baseBg, accent }), []);

  return (
    <div className="h-screen w-screen overflow-hidden" style={{ backgroundColor: baseBg, color: '#e5e7eb' }}>
      <TopBar
        accent={accent}
        onUndo={onUndo}
        onRedo={onRedo}
        onExport={handleExport}
        exportProgress={exportProgress}
      />
      <div className="h-[calc(100vh-56px)] grid" style={{ gridTemplateColumns: '300px 1fr 360px' }}>
        <LeftSidebarTools
          selectedTool={selectedTool}
          setSelectedTool={(t) => { pushHistory(getSnapshot()); setSelectedTool(t); }}
          aiParams={aiParams}
          setAiParams={(p) => { pushHistory(getSnapshot()); setAiParams(p); }}
          onGenerateTextTo3D={handleGenerateTextTo3D}
          onCancelGeneration={handleCancelGeneration}
          generationProgress={generationProgress}
          accent={accent}
        />
        <Viewport3D
          theme={uiTheme}
          animation={animation}
          setAnimation={(a) => { pushHistory(getSnapshot()); setAnimation(a); }}
          meshSettings={meshSettings}
        />
        <RightSidebarProperties
          material={material}
          setMaterial={(m) => { pushHistory(getSnapshot()); setMaterial(m); }}
          meshSettings={meshSettings}
          setMeshSettings={(m) => { pushHistory(getSnapshot()); setMeshSettings(m); }}
          aiParams={aiParams}
          setAiParams={(p) => { pushHistory(getSnapshot()); setAiParams(p); }}
          animation={animation}
          setAnimation={(a) => { pushHistory(getSnapshot()); setAnimation(a); }}
          accent={accent}
        />
      </div>
    </div>
  );
}
