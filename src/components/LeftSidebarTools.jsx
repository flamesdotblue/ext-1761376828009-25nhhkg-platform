import React, { useRef } from 'react';
import { Wand2, Image as ImageIcon, Brush, Paintbrush, Bone, Film, Loader2 } from 'lucide-react';

export default function LeftSidebarTools({ selectedTool, setSelectedTool, aiParams, setAiParams, onGenerateTextTo3D, generationProgress, onCancelGeneration, accent = '#26A69A' }) {
  const fileRef = useRef();

  return (
    <aside className="h-full overflow-y-auto" style={{ borderRight: '1px solid #1f1f1f' }}>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <ToolButton icon={<Wand2 size={18} />} label="Text" active={selectedTool === 'text-to-3d'} onClick={() => setSelectedTool('text-to-3d')} accent={accent} />
          <ToolButton icon={<ImageIcon size={18} />} label="Image" active={selectedTool === 'image-to-3d'} onClick={() => setSelectedTool('image-to-3d')} accent={accent} />
          <ToolButton icon={<Brush size={18} />} label="Sculpt" active={selectedTool === 'sculpt'} onClick={() => setSelectedTool('sculpt')} accent={accent} />
          <ToolButton icon={<Paintbrush size={18} />} label="Paint" active={selectedTool === 'paint'} onClick={() => setSelectedTool('paint')} accent={accent} />
          <ToolButton icon={<Bone size={18} />} label="Rig" active={selectedTool === 'rig'} onClick={() => setSelectedTool('rig')} accent={accent} />
          <ToolButton icon={<Film size={18} />} label="Animate" active={selectedTool === 'animate'} onClick={() => setSelectedTool('animate')} accent={accent} />
        </div>

        {selectedTool === 'text-to-3d' && (
          <section className="space-y-3">
            <h3 className="font-medium">Text to 3D</h3>
            <label className="flex flex-col gap-1 text-sm">
              <span>Prompt</span>
              <textarea className="bg-[#111] border border-[#2a2a2a] rounded p-2" rows={4} value={aiParams.textPrompt} onChange={(e) => setAiParams({ ...aiParams, textPrompt: e.target.value })} placeholder="e.g., A photorealistic ceramic mug with a wooden handle" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Style</span>
              <select className="bg-[#111] border border-[#2a2a2a] rounded px-2 py-1" value={aiParams.style} onChange={(e) => setAiParams({ ...aiParams, style: e.target.value })}>
                <option value="photorealistic">Photorealistic</option>
                <option value="stylized">Stylized</option>
                <option value="abstract">Abstract</option>
                <option value="low-poly">Low Poly</option>
                <option value="hand-painted">Hand-Painted</option>
              </select>
            </label>
            <Range label="Complexity" value={aiParams.complexity} onChange={(v) => setAiParams({ ...aiParams, complexity: v })} />
            <Range label="Detail Level" value={aiParams.detail} onChange={(v) => setAiParams({ ...aiParams, detail: v })} />

            <div className="flex items-center gap-2">
              {!generationProgress.active ? (
                <button onClick={onGenerateTextTo3D} className="px-3 py-1 rounded text-black" style={{ backgroundColor: accent }}>Generate</button>
              ) : (
                <button onClick={onCancelGeneration} className="px-3 py-1 rounded border border-[#2a2a2a]">Cancel</button>
              )}
              {generationProgress.active && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Loader2 size={16} className="animate-spin" />
                  <span>{generationProgress.phase} {Math.floor(generationProgress.percent)}%</span>
                </div>
              )}
            </div>

            <div className="rounded p-2 mt-2" style={{ backgroundColor: '#161616', border: '1px solid #262626' }}>
              <div className="text-xs text-gray-400 mb-2">Real-time Mesh Preview</div>
              <div className="h-28 rounded bg-[#0f0f0f] border border-[#1f1f1f] flex items-center justify-center text-gray-500 text-xs">Preview viewport</div>
            </div>
          </section>
        )}

        {selectedTool === 'image-to-3d' && (
          <section className="space-y-3">
            <h3 className="font-medium">Image to 3D</h3>
            <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.tif,.tiff" className="block w-full text-sm" />
            <Range label="Depth Estimation" value={aiParams.depthEstimation} onChange={(v) => setAiParams({ ...aiParams, depthEstimation: v })} />
            <Range label="Mesh Density" value={aiParams.meshDensity} onChange={(v) => setAiParams({ ...aiParams, meshDensity: v })} />
            <Range label="Texture Detail" value={aiParams.textureDetail} onChange={(v) => setAiParams({ ...aiParams, textureDetail: v })} />
            <button className="px-3 py-1 rounded text-black" style={{ backgroundColor: accent }}>Reconstruct</button>
          </section>
        )}

        {selectedTool === 'sculpt' && (
          <section className="space-y-3">
            <h3 className="font-medium">Sculpting</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a]">Brush</button>
              <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a]">Smooth</button>
              <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a]">Inflate</button>
              <button className="px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a]">Flatten</button>
            </div>
            <Range label="Brush Size" value={0.5} onChange={() => {}} />
            <Range label="Strength" value={0.6} onChange={() => {}} />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Subdivision</button>
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Simplify</button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Retopology</button>
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Boolean Ops</button>
            </div>
          </section>
        )}

        {selectedTool === 'paint' && (
          <section className="space-y-3">
            <h3 className="font-medium">Texture Painting</h3>
            <Range label="Brush Size" value={0.4} onChange={() => {}} />
            <Range label="Opacity" value={0.8} onChange={() => {}} />
            <div className="text-sm">Layers</div>
            <div className="space-y-1 text-xs">
              <LayerItem name="Albedo" active />
              <LayerItem name="Roughness" />
              <LayerItem name="Normal" />
              <LayerItem name="Metalness" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">New Layer</button>
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Mask</button>
            </div>
          </section>
        )}

        {selectedTool === 'rig' && (
          <section className="space-y-3">
            <h3 className="font-medium">Rigging</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Add Bone</button>
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Skin</button>
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Weights</button>
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">IK</button>
            </div>
            <div className="text-xs text-gray-400">Import MoCap (BVH, FBX)</div>
            <button className="px-2 py-1 rounded border border-[#2a2a2a] text-sm">Import</button>
          </section>
        )}

        {selectedTool === 'animate' && (
          <section className="space-y-3">
            <h3 className="font-medium">Animation</h3>
            <div className="text-xs text-gray-400">Timeline & Keyframes</div>
            <div className="h-20 rounded bg-[#0f0f0f] border border-[#1f1f1f]" />
            <div className="grid grid-cols-3 gap-2 text-sm">
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Keyframe</button>
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Play</button>
              <button className="px-2 py-1 rounded border border-[#2a2a2a]">Stop</button>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}

function ToolButton({ icon, label, active, onClick, accent }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center gap-1 px-2 py-2 rounded text-xs" style={{ backgroundColor: active ? '#1b1f1f' : '#151515', border: `1px solid ${active ? accent : '#2a2a2a'}`, color: active ? accent : '#e5e7eb' }}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Range({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-gray-300">{label}</span>
      <input type="range" min="0" max="1" step="0.01" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
      <span className="text-xs text-gray-500">{Math.round(value * 100)}%</span>
    </label>
  );
}

function LayerItem({ name, active }) {
  return (
    <div className="flex items-center justify-between px-2 py-1 rounded border" style={{ background: active ? '#1a1a1a' : 'transparent', borderColor: '#2a2a2a' }}>
      <span>{name}</span>
      <span className="text-gray-500 text-[10px]">Visible</span>
    </div>
  );
}
