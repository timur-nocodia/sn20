"use client";

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';

export default function AiToolsPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Выберите инструмент из меню слева
        </div>
      </main>
    </div>
  );
}
