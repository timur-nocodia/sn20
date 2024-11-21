"use client";

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import NetworkGraph from '@/components/network/network-graph';
import NetworkStats from '@/components/network/network-stats';
import NetworkLevels from '@/components/network/network-levels';
import NetworkBinary from '@/components/network/network-binary';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NetworkPage() {
  const [view, setView] = useState<'graph' | 'list' | 'binary'>('graph');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Моя сеть</h1>
              <p className="text-sm text-muted-foreground">
                Управляйте своей реферальной сетью
              </p>
            </div>
            <Tabs value={view} onValueChange={(value) => setView(value as 'graph' | 'list' | 'binary')}>
              <TabsList>
                <TabsTrigger value="graph">График</TabsTrigger>
                <TabsTrigger value="list">Список</TabsTrigger>
                <TabsTrigger value="binary">Бинарный</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <NetworkStats />

          {view === 'graph' ? (
            <Card className="relative flex-1" style={{ height: 'calc(100vh - 13rem)' }}>
              <NetworkGraph />
            </Card>
          ) : view === 'binary' ? (
            <Card className="relative flex-1" style={{ height: 'calc(100vh - 13rem)' }}>
              <NetworkBinary />
            </Card>
          ) : (
            <NetworkLevels />
          )}
        </div>
      </main>
    </div>
  );
}