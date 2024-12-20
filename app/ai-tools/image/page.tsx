"use client";

import Sidebar from '@/components/layout-components/sidebar';
import { ImageToolGrid } from '@/components/features/ai-tools/image/tool-grid';

export default function Page() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <ImageToolGrid />
      </main>
    </div>
  );
}