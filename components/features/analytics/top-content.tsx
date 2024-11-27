"use client";

import { useState } from 'react';
import { Card } from '@/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import TopPosts from './top-content/top-posts';
import TopLabels from './top-content/top-labels';

interface TopContentProps {
  period: '90days' | '30days' | '7days' | 'custom';
  dateRange: { start: Date; end: Date };
}

export default function TopContent({
  period,
  dateRange
}: TopContentProps) {
  const [activeTab, setActiveTab] = useState<'engagement' | 'impressions' | 'rate'>('engagement');

  return (
    <Card className="p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Лучший контент</h3>
          <p className="text-sm text-muted-foreground">
            Ваши лучшие посты и метки
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList>
            <TabsTrigger value="engagement">Вовлеченность</TabsTrigger>
            <TabsTrigger value="impressions">Показы</TabsTrigger>
            <TabsTrigger value="rate">Коэффициент</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-2 gap-6 pt-2">
          <TopPosts period={period} dateRange={dateRange} metric={activeTab} />
          <TopLabels period={period} dateRange={dateRange} metric={activeTab} />
        </div>
      </div>
    </Card>
  );
}