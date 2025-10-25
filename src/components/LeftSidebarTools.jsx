import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, Wand2, Brush, Layers, Bone, Film, Settings } from 'lucide-react';
import useEditorStore from '../store/useEditorStore.js';

const Section = ({ title, children, right }) => (
  <div className="border-b border-white/10">
    <div className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-wider text-gray-400">
      <span>{title}</span>
      {right}
    </div>
    <div className="p-4 pt-0">{children}</div>
  </div>
);

export default function LeftSidebarTools() {
  const {
    aiParams,
    setAITextPrompt,
    setAIStyle,
    setAIComplexity,
    setAIDetail,
    generating,
    generationProgress,
    startAIGeneration,
    cancelAIGeneration,
    setSelectedTool,
    selectedTool,
    setImageReconstruction,
    imageParams,
  } = useEditorStore();

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles?.length) return;
    // In a real app, upload and process
    setSelectedTool('image-to-3d');
  }, [setSelectedTool]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.tif', '.tiff'] },
  });

  return (
    <div className="text-sm">
      <Section title="Text to 3D" right={<Wand2 size={14} className="text-[#26A69A]" />}>
        <div className="space-y-2">
          <textarea
            className="w-full h-24 bg-white/5 border border-white/10 rounded p-2 outline-none focus:border-[#26A69A]"
            placeholder="Describe your model: 'A stylized low-poly tree with mossy bark'"
            value={aiParams.prompt}
            onChange={(e) => setAITextPrompt(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Style</label>
              <select
                className="bg-white/5 border border-white/10 rounded px-2 py-1.5"
                value={aiParams.style}
                onChange={(e) => setAIStyle(e.target.value)}
              >
                <option>photorealistic</option>
                <option>stylized</option>
                <option>abstract</option>
                <option>low-poly</option>
                <option>hand-painted</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Complexity</label>
              <input
                type="range" min={0} max={100}
                value={aiParams.complexity}
                onChange={(e) => setAIComplexity(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Detail</label>
              <input
                type="range" min={0} max={100}
                value={aiParams.detail}
                onChange={(e) => setAIDetail(Number(e.target.value))}
              />
            </div>
          </div>
          {!generating ? (
            <button
              onClick={startAIGeneration}
              className="w-full py-2 rounded bg-[#26A69A] text-black font-semibold hover:opacity-90"
            >Generate</button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/10 rounded overflow-hidden">
                <div className="h-full bg-[#26A69A]" style={{ width: `${generationProgress}%` }} />
              </div>
              <button onClick={cancelAIGeneration} className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs">Cancel</button>
            </div>
          )}
        </div>
      </Section>

      <Section title="Image to 3D" right={<ImageIcon size={14} className="text-[#26A69A]" />}>
        <div {...getRootProps()} className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition ${isDragActive ? 'border-[#26A69A] bg-[#26A69A]/10' : 'border-white/15 bg-white/5 hover:bg-white/10'}`}>
          <input {...getInputProps()} />
          <p className="text-gray-300">Drop JPG, PNG, or TIFF here, or click to upload.</p>
          <p className="text-[11px] text-gray-500 mt-1">Up to 50 MB</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Depth</label>
            <input type="range" min={0} max={100} value={imageParams.depth} onChange={(e)=>setImageReconstruction({ depth: Number(e.target.value)})} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Mesh Density</label>
            <input type="range" min={0} max={100} value={imageParams.density} onChange={(e)=>setImageReconstruction({ density: Number(e.target.value)})} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Texture Detail</label>
            <input type="range" min={0} max={100} value={imageParams.textureDetail} onChange={(e)=>setImageReconstruction({ textureDetail: Number(e.target.value)})} />
          </div>
        </div>
      </Section>

      <Section title="Editing Tools" right={<Settings size={14} className="text-[#26A69A]" />}>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'sculpt', label: 'Sculpt', icon: Brush },
            { key: 'texture', label: 'Texture', icon: Layers },
            { key: 'rig', label: 'Rig', icon: Bone },
            { key: 'animate', label: 'Animate', icon: Film },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedTool(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded border text-sm ${selectedTool===key ? 'bg-[#26A69A] text-black border-transparent' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
        {selectedTool === 'animate' && (
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs flex items-center gap-2">
                <Play size={14}/> Play
              </button>
              <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs">Add Keyframe</button>
              <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs">IK Solve</button>
            </div>
            <div className="mt-2 h-16 rounded bg-white/5 border border-white/10 text-[11px] text-gray-400 flex items-center justify-center">
              Timeline / Keyframes
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}
