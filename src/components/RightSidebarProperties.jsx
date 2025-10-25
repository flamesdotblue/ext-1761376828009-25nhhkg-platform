import React from 'react';
import { Layers, Sliders } from 'lucide-react';

export default function RightSidebarProperties({ material, setMaterial, meshSettings, setMeshSettings, aiParams, setAiParams, animation, setAnimation, accent = '#26A69A' }) {
  return (
    <aside className="h-full overflow-y-auto" style={{ borderLeft: '1px solid #1f1f1f' }}>
      <div className="p-3 space-y-5">
        <section>
          <h3 className="font-medium flex items-center gap-2 mb-2"><Layers size={16} /> Material</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="flex flex-col gap-1">
              <span className="text-gray-300">Name</span>
              <input className="bg-[#111] border border-[#2a2a2a] rounded px-2 py-1" value={material.name} onChange={(e) => setMaterial({ ...material, name: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-300">Base Color</span>
              <input type="color" className="h-8 w-full" value={material.color} onChange={(e) => setMaterial({ ...material, color: e.target.value })} />
            </label>
            <Slider label="Metallic" value={material.metallic} onChange={(v) => setMaterial({ ...material, metallic: v })} />
            <Slider label="Roughness" value={material.roughness} onChange={(v) => setMaterial({ ...material, roughness: v })} />
            <Slider label="Normal Strength" value={material.normalStrength} onChange={(v) => setMaterial({ ...material, normalStrength: v })} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs mt-3">
            <MapInput label="Albedo" value={material.maps.albedo} onChange={(v) => setMaterial({ ...material, maps: { ...material.maps, albedo: v } })} />
            <MapInput label="Normal" value={material.maps.normal} onChange={(v) => setMaterial({ ...material, maps: { ...material.maps, normal: v } })} />
            <MapInput label="Roughness" value={material.maps.roughness} onChange={(v) => setMaterial({ ...material, maps: { ...material.maps, roughness: v } })} />
            <MapInput label="Metalness" value={material.maps.metalness} onChange={(v) => setMaterial({ ...material, maps: { ...material.maps, metalness: v } })} />
            <MapInput label="Specular" value={material.maps.specular} onChange={(v) => setMaterial({ ...material, maps: { ...material.maps, specular: v } })} />
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <button className="px-2 py-1 rounded border border-[#2a2a2a]">Save Material</button>
            <button className="px-2 py-1 rounded border border-[#2a2a2a]">Add to Library</button>
          </div>
        </section>

        <section>
          <h3 className="font-medium flex items-center gap-2 mb-2"><Sliders size={16} /> Mesh & Performance</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Slider label="Mesh Resolution" value={meshSettings.resolution} min={0} max={2} step={0.01} onChange={(v) => setMeshSettings({ ...meshSettings, resolution: v })} />
            <Slider label="Subdivision" value={meshSettings.subdivision} min={0} max={5} step={1} onChange={(v) => setMeshSettings({ ...meshSettings, subdivision: v })} />
          </div>
          <div className="flex items-center gap-4 text-sm mt-2">
            <label className="flex items-center gap-2"><input type="checkbox" className="accent-teal-400" checked={meshSettings.lod} onChange={(e) => setMeshSettings({ ...meshSettings, lod: e.target.checked })} /> LOD</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="accent-teal-400" checked={meshSettings.occlusionCulling} onChange={(e) => setMeshSettings({ ...meshSettings, occlusionCulling: e.target.checked })} /> Occlusion Culling</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="accent-teal-400" checked={meshSettings.autoRetopo} onChange={(e) => setMeshSettings({ ...meshSettings, autoRetopo: e.target.checked })} /> Auto Retopo</label>
          </div>
        </section>

        <section>
          <h3 className="font-medium mb-2">AI Generation Parameters</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="flex flex-col gap-1">
              <span className="text-gray-300">Style</span>
              <select className="bg-[#111] border border-[#2a2a2a] rounded px-2 py-1" value={aiParams.style} onChange={(e) => setAiParams({ ...aiParams, style: e.target.value })}>
                <option value="photorealistic">Photorealistic</option>
                <option value="stylized">Stylized</option>
                <option value="abstract">Abstract</option>
                <option value="low-poly">Low Poly</option>
                <option value="hand-painted">Hand-Painted</option>
              </select>
            </label>
            <Slider label="Complexity" value={aiParams.complexity} onChange={(v) => setAiParams({ ...aiParams, complexity: v })} />
            <Slider label="Detail" value={aiParams.detail} onChange={(v) => setAiParams({ ...aiParams, detail: v })} />
          </div>
        </section>

        <section>
          <h3 className="font-medium mb-2">Animation Properties</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="flex flex-col gap-1">
              <span className="text-gray-300">Interpolation</span>
              <select className="bg-[#111] border border-[#2a2a2a] rounded px-2 py-1" value={animation.interpolation} onChange={(e) => setAnimation({ ...animation, interpolation: e.target.value })}>
                <option value="linear">Linear</option>
                <option value="step">Step</option>
                <option value="bezier">Bezier</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-300">Easing</span>
              <select className="bg-[#111] border border-[#2a2a2a] rounded px-2 py-1" value={animation.easing} onChange={(e) => setAnimation({ ...animation, easing: e.target.value })}>
                <option value="easeIn">easeIn</option>
                <option value="easeOut">easeOut</option>
                <option value="easeInOut">easeInOut</option>
              </select>
            </label>
          </div>
        </section>
      </div>
    </aside>
  );
}

function Slider({ label, value, onChange, min = 0, max = 1, step = 0.01 }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-gray-300 text-sm">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
      <span className="text-xs text-gray-500">{typeof value === 'number' ? value.toFixed(2) : value}</span>
    </label>
  );
}

function MapInput({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-gray-300">{label} Map</span>
      <div className="flex items-center gap-2">
        <input className="bg-[#111] border border-[#2a2a2a] rounded px-2 py-1 text-xs w-full" placeholder="URL or path" value={value} onChange={(e) => onChange(e.target.value)} />
        <button className="px-2 py-1 rounded border border-[#2a2a2a] text-xs">Browse</button>
      </div>
    </label>
  );
}
