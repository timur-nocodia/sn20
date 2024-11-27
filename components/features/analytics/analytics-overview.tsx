"use client";

import { Eye, Users, Heart, TrendingUp } from 'lucide-react';
import { Card } from '@/ui/card';

interface AnalyticsOverviewProps {
  period: '90days' | '30days' | '7days' | 'custom';
  dateRange: { start: Date; end: Date };
}

const metrics = [
  {
    id: 'profile_visits',
    name: 'Просмотры профиля',
    value: '272',
    icon: Eye,
    change: '+12.5%',
    trend: 'up'
  },
  {
    id: 'impressions',
    name: 'Показы',
    value: '9,752',
    icon: Users,
    change: '+8.2%',
    trend: 'up'
  },
  {
    id: 'engagements',
    name: 'Вовлечения',
    value: '1,428',
    icon: Heart,
    change: '-2.1%',
    trend: 'down'
  },
  {
    id: 'engagement_rate',
    name: 'Коэффициент вовлеченности',
    value: '3.2%',
    icon: TrendingUp,
    change: '+0.8%',
    trend: 'up'
  }
];

export default function AnalyticsOverview({
  period,
  dateRange
}: AnalyticsOverviewProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        
        return (
          <Card
            key={metric.id}
            className="p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </h3>
              <div className="text-2xl font-semibold mt-1">
                {metric.value}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}