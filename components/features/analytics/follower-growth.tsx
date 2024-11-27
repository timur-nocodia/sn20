"use client";

import { Card } from '@/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface FollowerGrowthProps {
  period: '90days' | '30days' | '7days' | 'custom';
  dateRange: { start: Date; end: Date };
}

// Example data
const data = [
  { date: 'Oct 14', followers: 1139 },
  { date: 'Oct 16', followers: 1142 },
  { date: 'Oct 18', followers: 1145 },
  { date: 'Oct 20', followers: 1148 },
  { date: 'Oct 22', followers: 1152 },
  { date: 'Oct 24', followers: 1156 },
  { date: 'Oct 26', followers: 1160 },
  { date: 'Oct 28', followers: 1163 },
  { date: 'Oct 30', followers: 1167 },
  { date: 'Nov 1', followers: 1170 },
  { date: 'Nov 3', followers: 1173 },
  { date: 'Nov 5', followers: 1176 },
  { date: 'Nov 7', followers: 1179 }
];

export default function FollowerGrowth({
  period,
  dateRange
}: FollowerGrowthProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">1,163 подписчиков</h3>
            <p className="text-sm text-muted-foreground">
              Вы растете со скоростью 1 подписчик в день!
            </p>
          </div>
          <div className="text-sm font-medium text-green-500">
            +0.09%
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="date" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="followers"
              stroke="#FF6B00"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}