import React from 'react';
import { Cloud, FolderPlus, Undo2, Redo2, Share2, Download, Play, Pause } from 'lucide-react';
import useEditorStore from '../store/useEditorStore.js';

export default function TopBar() {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    exporting,
    exportProgress,
    startExport,
    cancelExport,
  } = useEditorStore();

  return (
    <header className="h-14 border-b border-white/10 px-3 flex items-center justify-between bg-black/40 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[#26A69A]" />
        <div className="flex flex-col leading-tight">
          <span className="font-semibold">Aether Modeler</span>
          <span className="text-xs text-gray-400">AI text-to-3D and image-to-3D</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-sm flex items-center gap-2">
          <FolderPlus size={16} /> New
        </button>
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`px-3 py-1.5 rounded border text-sm flex items-center gap-2 ${canUndo ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed'}`}
        >
          <Undo2 size={16} /> Undo
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`px-3 py-1.5 rounded border text-sm flex items-center gap-2 ${canRedo ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed'}`}
        >
          <Redo2 size={16} /> Redo
        </button>
        <button className="px-3 py-1.5 rounded bg-[#26A69A] hover:opacity-90 text-black font-medium text-sm flex items-center gap-2">
          <Cloud size={16} /> Cloud
        </button>
        <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-sm flex items-center gap-2">
          <Share2 size={16} /> Collaborate
        </button>
        {!exporting ? (
          <button onClick={startExport} className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-sm flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-40 h-2 bg-white/10 rounded overflow-hidden">
              <div className="h-full bg-[#26A69A]" style={{ width: `${exportProgress}%` }} />
            </div>
            <button onClick={cancelExport} className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs flex items-center gap-1">
              <Pause size={14} /> Cancel
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
