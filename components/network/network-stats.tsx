"use client";

import { Users, TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';

const stats = [
  {
    name: 'Всего партнеров',
    value: '156',
    change: '+12.5%',
    trend: 'up',
    icon: Users
  },
  {
    name: 'Активные партнеры',
    value: '89',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp
  },
  {
    name: 'Общий доход',
    value: '$15,245',
    change: '+15.3%',
    trend: 'up',
    icon: DollarSign
  }
];

export default function NetworkStats() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card
            key={stat.name}
            className="p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </h3>
              <div className="text-2xl font-semibold mt-1">
                {stat.value}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}