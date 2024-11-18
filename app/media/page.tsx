"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from '@/components/sidebar';
import MediaContent from '@/components/media/media-content';

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'uploaded' | 'generated'>('overview');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Медиа библиотека</h1>
              <p className="text-sm text-muted-foreground">
                Управляйте всеми медиафайлами в одном месте
              </p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList>
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="uploaded">Загруженный</TabsTrigger>
              <TabsTrigger value="generated">Сгенерированный</TabsTrigger>
            </TabsList>
          </Tabs>

          <MediaContent tab={activeTab} />
        </div>
      </main>
    </div>
  );
}