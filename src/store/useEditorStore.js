import { create } from 'zustand';
import { produce } from 'immer';

const initialState = {
  selectedTool: 'sculpt',
  generating: false,
  generationProgress: 0,
  exporting: false,
  exportProgress: 0,
  aiParams: {
    prompt: '',
    style: 'photorealistic',
    complexity: 50,
    detail: 60,
  },
  imageParams: {
    depth: 60,
    density: 50,
    textureDetail: 70,
  },
  material: {
    color: '#26A69A',
    roughness: 0.6,
    metalness: 0.1,
    normalMap: '',
    roughnessMap: '',
    specularMap: '',
  },
  meshProps: {
    type: 'box',
    resolution: 16,
    size: 1.2,
  },
  lodEnabled: true,
  gridVisible: true,
  exportSettings: {
    format: 'glTF',
    polyCount: 50000,
    textureRes: '2048',
  },
  history: [],
  future: [],
};

let aiInterval = null;
let exportInterval = null;

const useEditorStore = create((set, get) => ({
  ...initialState,

  setSelectedTool: (tool) => set({ selectedTool: tool }),

  setAITextPrompt: (prompt) => set(produce((s) => { s.aiParams.prompt = prompt; })),
  setAIStyle: (style) => set(produce((s) => { s.aiParams.style = style; })),
  setAIComplexity: (complexity) => set(produce((s) => { s.aiParams.complexity = complexity; })),
  setAIDetail: (detail) => set(produce((s) => { s.aiParams.detail = detail; })),
  setImageReconstruction: (partial) => set(produce((s) => { Object.assign(s.imageParams, partial); })),

  setMaterial: (partial) => set(produce((s) => { s.history.push({ material: { ...s.material } }); s.future = []; Object.assign(s.material, partial); })),
  setMeshProps: (partial) => set(produce((s) => { s.history.push({ meshProps: { ...s.meshProps } }); s.future = []; Object.assign(s.meshProps, partial); })),
  setExportSettings: (partial) => set(produce((s) => { Object.assign(s.exportSettings, partial); })),
  setLodEnabled: (v) => set({ lodEnabled: v }),
  setGridVisible: (v) => set({ gridVisible: v }),

  startAIGeneration: () => {
    if (get().generating) return;
    set({ generating: true, generationProgress: 0 });
    aiInterval = setInterval(() => {
      const p = get().generationProgress;
      if (p >= 100) {
        clearInterval(aiInterval);
        set({ generating: false });
        return;
      }
      const inc = Math.max(1, Math.random() * 8);
      set({ generationProgress: Math.min(100, p + inc) });
    }, 200);
  },
  cancelAIGeneration: () => {
    if (aiInterval) clearInterval(aiInterval);
    set({ generating: false, generationProgress: 0 });
  },

  startExport: () => {
    if (get().exporting) return;
    set({ exporting: true, exportProgress: 0 });
    exportInterval = setInterval(() => {
      const p = get().exportProgress;
      if (p >= 100) {
        clearInterval(exportInterval);
        set({ exporting: false });
        return;
      }
      const inc = Math.max(1, Math.random() * 10);
      set({ exportProgress: Math.min(100, p + inc) });
    }, 180);
  },
  cancelExport: () => {
    if (exportInterval) clearInterval(exportInterval);
    set({ exporting: false, exportProgress: 0 });
  },

  undo: () => set(produce((s) => {
    if (s.history.length === 0) return;
    const last = s.history.pop();
    s.future.push({ material: { ...s.material }, meshProps: { ...s.meshProps } });
    if (last.material) s.material = last.material;
    if (last.meshProps) s.meshProps = last.meshProps;
  })),
  redo: () => set(produce((s) => {
    if (s.future.length === 0) return;
    const next = s.future.pop();
    s.history.push({ material: { ...s.material }, meshProps: { ...s.meshProps } });
    if (next.material) s.material = next.material;
    if (next.meshProps) s.meshProps = next.meshProps;
  })),
  get canUndo() { return get().history.length > 0; },
  get canRedo() { return get().future.length > 0; },
}));

export default useEditorStore;
