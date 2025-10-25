import React from 'react';
import useEditorStore from '../store/useEditorStore.js';

const Row = ({ label, children }) => (
  <div className="flex items-center justify-between gap-3 py-2">
    <label className="text-xs text-gray-400 w-32">{label}</label>
    <div className="flex-1">{children}</div>
  </div>
);

export default function RightSidebarProperties() {
  const {
    material,
    setMaterial,
    meshProps,
    setMeshProps,
    exportSettings,
    setExportSettings,
    lodEnabled,
    setLodEnabled,
    gridVisible,
    setGridVisible,
  } = useEditorStore();

  return (
    <div className="p-4 text-sm">
      <div className="mb-4">
        <h3 className="text-[11px] tracking-wider uppercase text-gray-400 mb-2">Object</h3>
        <Row label="Type">
          <select
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5"
            value={meshProps.type}
            onChange={(e)=>setMeshProps({ type: e.target.value })}
          >
            <option value="box">Box</option>
            <option value="sphere">Sphere</option>
            <option value="cylinder">Cylinder</option>
            <option value="torus">Torus</option>
          </select>
        </Row>
        <Row label="Resolution">
          <input type="range" min={2} max={128} value={meshProps.resolution} onChange={(e)=>setMeshProps({ resolution: Number(e.target.value)})} />
        </Row>
        <Row label="Size">
          <input type="range" min={0.2} max={5} step={0.1} value={meshProps.size} onChange={(e)=>setMeshProps({ size: Number(e.target.value)})} />
        </Row>
        <div className="flex items-center gap-2 mt-2">
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={lodEnabled} onChange={(e)=>setLodEnabled(e.target.checked)} /> Enable LOD
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={gridVisible} onChange={(e)=>setGridVisible(e.target.checked)} /> Grid
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-[11px] tracking-wider uppercase text-gray-400 mb-2">Material (PBR)</h3>
        <Row label="Base Color">
          <input type="color" value={material.color} onChange={(e)=>setMaterial({ color: e.target.value })} />
        </Row>
        <Row label="Roughness">
          <input type="range" min={0} max={1} step={0.01} value={material.roughness} onChange={(e)=>setMaterial({ roughness: Number(e.target.value)})} />
        </Row>
        <Row label="Metalness">
          <input type="range" min={0} max={1} step={0.01} value={material.metalness} onChange={(e)=>setMaterial({ metalness: Number(e.target.value)})} />
        </Row>
        <Row label="Normal Map">
          <input type="text" value={material.normalMap || ''} onChange={(e)=>setMaterial({ normalMap: e.target.value })} placeholder="URL" className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5" />
        </Row>
        <Row label="Roughness Map">
          <input type="text" value={material.roughnessMap || ''} onChange={(e)=>setMaterial({ roughnessMap: e.target.value })} placeholder="URL" className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5" />
        </Row>
        <Row label="Specular Map">
          <input type="text" value={material.specularMap || ''} onChange={(e)=>setMaterial({ specularMap: e.target.value })} placeholder="URL" className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5" />
        </Row>
      </div>

      <div className="mb-4">
        <h3 className="text-[11px] tracking-wider uppercase text-gray-400 mb-2">Export</h3>
        <Row label="Format">
          <select className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5" value={exportSettings.format} onChange={(e)=>setExportSettings({ format: e.target.value })}>
            <option>OBJ</option>
            <option>FBX</option>
            <option>STL</option>
            <option>glTF</option>
          </select>
        </Row>
        <Row label="Poly Count">
          <input type="range" min={100} max={100000} step={100} value={exportSettings.polyCount} onChange={(e)=>setExportSettings({ polyCount: Number(e.target.value)})} />
        </Row>
        <Row label="Texture Res">
          <select className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5" value={exportSettings.textureRes} onChange={(e)=>setExportSettings({ textureRes: e.target.value })}>
            <option>512</option>
            <option>1024</option>
            <option>2048</option>
            <option>4096</option>
          </select>
        </Row>
        <div className="text-[11px] text-gray-500">Exports are optimized with LOD and basic culling.</div>
      </div>
    </div>
  );
}
