import React from 'react';

export default function Viewport3D({ theme, animation, setAnimation, meshSettings }) {
  return (
    <main className="h-full w-full relative">
      <div className="absolute inset-0">
        <canvas className="w-full h-full" style={{ background: 'radial-gradient(ellipse at top, #1a1a1a, #0a0a0a)' }} />
      </div>
      <div className="absolute top-3 left-3 rounded px-2 py-1 text-xs" style={{ backgroundColor: '#0e0e0e', border: '1px solid #222' }}>
        <div className="text-gray-300">Camera</div>
        <div className="text-gray-500">LMB: Orbit • MMB: Pan • Wheel: Zoom</div>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs">
        <button onClick={() => setAnimation({ ...animation, playing: !animation.playing })} className="px-2 py-1 rounded border border-[#2a2a2a] hover:bg-[#1b1b1b]">
          {animation.playing ? 'Pause' : 'Play'}
        </button>
        <div className="px-2 py-1 rounded border border-[#2a2a2a]">t: {animation.time.toFixed(2)}s</div>
      </div>
      <div className="absolute bottom-3 right-3 text-xs grid gap-1">
        <div className="px-2 py-1 rounded border border-[#2a2a2a]">LOD: {meshSettings.lod ? 'On' : 'Off'}</div>
        <div className="px-2 py-1 rounded border border-[#2a2a2a]">Occlusion: {meshSettings.occlusionCulling ? 'On' : 'Off'}</div>
      </div>
    </main>
  );
}
