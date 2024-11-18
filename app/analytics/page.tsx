"use client";

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import AnalyticsPeriodSelector from '@/components/analytics/analytics-period-selector';
import AnalyticsOverview from '@/components/analytics/analytics-overview';
import AnalyticsCards from '@/components/analytics/analytics-cards';
import TopContent from '@/components/analytics/top-content';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'90days' | '30days' | '7days' | 'custom'>('30days');
  const [dateRange, setDateRange] = useState({
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 31)
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Аналитика</h1>
              <p className="text-sm text-muted-foreground">
                Анализируйте эффективность вашего контента
              </p>
            </div>
          </div>

          <AnalyticsPeriodSelector
            period={period}
            setPeriod={setPeriod}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <AnalyticsOverview period={period} dateRange={dateRange} />
          
          <AnalyticsCards period={period} dateRange={dateRange} />

          <TopContent period={period} dateRange={dateRange} />
        </div>
      </main>
    </div>
  );
}