"use client";

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Users, FileText } from 'lucide-react';

interface UsageMetric {
  title: string;
  description: string;
  current: number;
  total: number | 'Unlimited';
  icon: React.ElementType;
}

const usageCategories = [
  {
    title: 'AI & Автоматизация',
    description: 'Общее использование из всех рабочих пространств.',
    metrics: [
      {
        title: 'Автоматизация',
        description: 'Количество запусков автоматизации',
        current: 0,
        total: 10000,
        icon: Sparkles
      },
      {
        title: 'AI Credits',
        description: 'Использование AI генерации',
        current: 238,
        total: 50000,
        icon: Sparkles
      }
    ]
  },
  {
    title: 'Социальные сети & Рабочие пространства',
    description: 'Общее использование из всех рабочих пространств.',
    metrics: [
      {
        title: 'Социальные сети',
        description: 'Подключенные аккаунты',
        current: 1,
        total: 100,
        icon: Users
      },
      {
        title: 'Рабочие пространства',
        description: 'Активные рабочие пространства',
        current: 1,
        total: 50,
        icon: Users
      }
    ]
  },
  {
    title: 'Посты',
    description: 'Общее использование из всех рабочих пространств.',
    metrics: [
      {
        title: 'Запланированные посты',
        description: 'Количество запланированных постов',
        current: 0,
        total: 'Unlimited' as const,
        icon: FileText
      },
      {
        title: 'Черновики',
        description: 'Количество черновиков',
        current: 3,
        total: 'Unlimited' as const,
        icon: FileText
      }
    ]
  }
];

function UsageMetricCard({ metric }: { metric: UsageMetric }) {
  const Icon = metric.icon;
  const percentage = metric.total !== 'Unlimited' 
    ? (metric.current / (metric.total as number)) * 100
    : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span>{metric.title}</span>
        </div>
        <span className="text-muted-foreground">
          {metric.current} / {metric.total}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 ${percentage > 80 ? 'bg-destructive' : ''}`}
      />
      <p className="text-xs text-muted-foreground">
        {metric.description}
      </p>
    </div>
  );
}

export default function UsageSettings() {
  return (
    <div className="space-y-6">
      {usageCategories.map((category) => (
        <Card key={category.title} className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">{category.title}</h2>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>

            <div className="space-y-6">
              {category.metrics.map((metric) => (
                <UsageMetricCard key={metric.title} metric={metric} />
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}