"use client";

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout-components/sidebar';
import { ImageGenerator } from '@/components/features/ai-tools/image/generate/page';

export default function ImageGeneratorPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <ImageGenerator onBack={() => router.push('/ai-tools/image')} />
      </main>
    </div>
  );
}