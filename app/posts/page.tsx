"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui-components/tabs';
import Sidebar from '@/components/layout-components/sidebar';
import PostsContent from '@/components/features/posts/posts-content';

const tabs = [
  { id: 'draft', label: 'Черновики' },
  { id: 'scheduled', label: 'Запланированные' },
  { id: 'published', label: 'История' }
] as const;

type TabType = typeof tabs[number]['id'];

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('draft');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Посты</h1>
              <p className="text-sm text-muted-foreground">
                Управляйте всем вашим контентом в одном месте
              </p>
            </div>
          </div>

          <Tabs defaultValue="drafts" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList>
              <TabsTrigger value="drafts">Черновики</TabsTrigger>
              <TabsTrigger value="scheduled">Запланированные</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>
          </Tabs>

          <PostsContent status={activeTab} />
        </div>
      </main>
    </div>
  );
}