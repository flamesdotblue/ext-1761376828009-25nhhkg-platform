import React from 'react';
import TopBar from './components/TopBar.jsx';
import LeftSidebarTools from './components/LeftSidebarTools.jsx';
import Viewport3D from './components/Viewport3D.jsx';
import RightSidebarProperties from './components/RightSidebarProperties.jsx';

export default function App() {
  return (
    <div className="w-full h-screen bg-[#121212] text-gray-100 flex flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[330px] min-w-[300px] max-w-[360px] h-full border-r border-white/10 overflow-y-auto">
          <LeftSidebarTools />
        </aside>
        <main className="flex-1 h-full overflow-hidden">
          <Viewport3D />
        </main>
        <aside className="w-[360px] min-w-[320px] max-w-[420px] h-full border-l border-white/10 overflow-y-auto">
          <RightSidebarProperties />
        </aside>
      </div>
    </div>
  );
}
