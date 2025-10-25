import React, { useState } from 'react';
import { Save, FolderOpen, Share2, Cloud, CloudUpload, Download, Undo, Redo, BookOpen, Settings } from 'lucide-react';

export default function TopBar({ accent = '#26A69A', onUndo, onRedo, onExport, exportProgress }) {
  const [exportOpen, setExportOpen] = useState(false);
  const [format, setFormat] = useState('glTF');
  const [polyCount, setPolyCount] = useState(100);
  const [texRes, setTexRes] = useState(2048);

  const exportDisabled = exportProgress?.active;

  return (
    <div className="w-full h-14 flex items-center justify-between px-3" style={{ backgroundColor: '#0f0f0f', borderBottom: '1px solid #1f1f1f' }}>
      <div className="flex items-center gap-3">
        <div className="font-semibold tracking-wide" style={{ color: accent }}>Aether Studio</div>
        <div className="text-xs text-gray-400">AI-powered 3D Suite</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e]" title="Open"><FolderOpen size={18} /></button>
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e]" title="Save Project"><Save size={18} /></button>
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e]" title="Undo" onClick={onUndo}><Undo size={18} /></button>
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e]" title="Redo" onClick={onRedo}><Redo size={18} /></button>
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e]" title="Share"><Share2 size={18} /></button>
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e]" title="Cloud"><Cloud size={18} /></button>
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e] flex items-center gap-1" title="Export" onClick={() => setExportOpen(true)}>
          <Download size={18} />
          <span className="text-sm">Export</span>
        </button>
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e]" title="Docs"><BookOpen size={18} /></button>
        <button className="px-2 py-1 rounded hover:bg-[#1e1e1e]" title="Settings"><Settings size={18} /></button>
      </div>

      {exportOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => !exportProgress?.active && setExportOpen(false)}>
          <div className="w-[520px] rounded-lg p-4" style={{ backgroundColor: '#181818', border: '1px solid #262626' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">Export Settings</div>
              <button className="text-sm text-gray-400 hover:text-gray-200" onClick={() => !exportProgress?.active && setExportOpen(false)}>Close</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-gray-300">Format</span>
                <select className="bg-[#111] border border-[#2a2a2a] rounded px-2 py-1" value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option>glTF</option>
                  <option>FBX</option>
                  <option>OBJ</option>
                  <option>STL</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-gray-300">Texture Resolution</span>
                <select className="bg-[#111] border border-[#2a2a2a] rounded px-2 py-1" value={texRes} onChange={(e) => setTexRes(Number(e.target.value))}>
                  <option value={512}>512</option>
                  <option value={1024}>1024</option>
                  <option value={2048}>2048</option>
                  <option value={4096}>4096</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-gray-300">Target Polygon Count (k)</span>
                <input type="range" min="5" max="1000" step="5" value={polyCount} onChange={(e) => setPolyCount(Number(e.target.value))} />
                <span className="text-xs text-gray-400">{polyCount}k</span>
              </label>
              <label className="flex items-center gap-2 text-sm mt-5">
                <input type="checkbox" defaultChecked className="accent-teal-400" />
                <span>Embed textures</span>
              </label>
            </div>
            {exportProgress?.active && (
              <div className="mt-4">
                <div className="text-xs text-gray-400 mb-1">Exporting {exportProgress?.format}...</div>
                <div className="w-full h-2 rounded bg-[#222] overflow-hidden">
                  <div className="h-full" style={{ width: `${Math.floor(exportProgress.percent)}%`, backgroundColor: accent }} />
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center justify-end gap-2">
              <button disabled={exportDisabled} className="px-3 py-1 rounded border border-[#2a2a2a] hover:bg-[#222] disabled:opacity-40" onClick={() => setExportOpen(false)}>Cancel</button>
              <button disabled={exportDisabled} onClick={() => onExport(format, { polyCount, texRes })} className="px-3 py-1 rounded text-black" style={{ backgroundColor: accent }}>
                <div className="flex items-center gap-2"><CloudUpload size={16} /> Export</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
