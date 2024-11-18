"use client";

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TopLabelsProps {
  period: '90days' | '30days' | '7days' | 'custom';
  dateRange: { start: Date; end: Date };
  metric: 'engagement' | 'impressions' | 'rate';
}

const labels = [
  {
    id: '1',
    name: '#marketing',
    engagement: 1245,
    impressions: 5200,
    rate: 24.2
  },
  // Add more labels
];

export default function TopLabels({
  period,
  dateRange,
  metric
}: TopLabelsProps) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-4">Лучшие метки</h4>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {labels.map((label) => (
            <Card
              key={label.id}
              className="p-4 cursor-pointer shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
            >
              <div className="text-sm font-medium mb-2">
                {label.name}
              </div>
              <div className="text-2xl font-semibold">
                {metric === 'engagement' && label.engagement}
                {metric === 'impressions' && label.impressions}
                {metric === 'rate' && `${label.rate}%`}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric === 'engagement' && 'вовлечений'}
                {metric === 'impressions' && 'показов'}
                {metric === 'rate' && 'коэффициент вовлеченности'}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}