"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { DashboardContent } from './content';

export function DashboardPage() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          <Header 
            userName="Тимур Есенов" 
            isCreatingPost={isCreatingPost}
          />
          <div className="p-6">
            <DashboardContent />
          </div>
        </div>
      </main>
    </div>
  );
}