"use client";

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';

interface AnalyticsCardsProps {
  period: '90days' | '30days' | '7days' | 'custom';
  dateRange: { start: Date; end: Date };
}

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const hours = Array.from({ length: 24 }, (_, i) => i);

// Generate random activity data for the heatmap
const generateHeatmapData = () => {
  const data: Record<string, number[]> = {};
  weekDays.forEach(day => {
    data[day] = Array.from({ length: 24 }, () => Math.random());
  });
  return data;
};

// Example engagement data
const engagementData = [
  { date: 'Oct 14', followers: 1139, engagement: 245 },
  { date: 'Oct 16', followers: 1142, engagement: 256 },
  { date: 'Oct 18', followers: 1145, engagement: 278 },
  { date: 'Oct 20', followers: 1148, engagement: 289 },
  { date: 'Oct 22', followers: 1152, engagement: 312 },
  { date: 'Oct 24', followers: 1156, engagement: 334 },
  { date: 'Oct 26', followers: 1160, engagement: 356 },
  { date: 'Oct 28', followers: 1163, engagement: 378 },
  { date: 'Oct 30', followers: 1167, engagement: 389 },
  { date: 'Nov 1', followers: 1170, engagement: 401 },
  { date: 'Nov 3', followers: 1173, engagement: 423 },
  { date: 'Nov 5', followers: 1176, engagement: 445 },
  { date: 'Nov 7', followers: 1179, engagement: 467 }
];

// Example daily engagement data
const dailyEngagementData = [
  { time: '00:00', engagement: 45 },
  { time: '02:00', engagement: 35 },
  { time: '04:00', engagement: 25 },
  { time: '06:00', engagement: 30 },
  { time: '08:00', engagement: 80 },
  { time: '10:00', engagement: 120 },
  { time: '12:00', engagement: 150 },
  { time: '14:00', engagement: 135 },
  { time: '16:00', engagement: 145 },
  { time: '18:00', engagement: 160 },
  { time: '20:00', engagement: 110 },
  { time: '22:00', engagement: 65 }
];

const activityData = generateHeatmapData();

export default function AnalyticsCards({
  period,
  dateRange
}: AnalyticsCardsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Активность подписчиков</h3>
            <p className="text-sm text-muted-foreground">
              Когда ваши подписчики наиболее активны
            </p>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-12 rounded bg-gradient-to-r from-[#E2E8F0] via-[#86EFAC] to-[#22C55E]"></div>
              <span className="text-sm text-muted-foreground">Активность</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-12 rounded bg-gradient-to-r from-[#E2E8F0] via-[#93C5FD] to-[#3B82F6]"></div>
              <span className="text-sm text-muted-foreground">Вовлеченность</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-12 rounded bg-gradient-to-r from-[#E2E8F0] via-[#F9A8D4] to-[#EC4899]"></div>
              <span className="text-sm text-muted-foreground">Активность + вовлеченность</span>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-16"></th>
                  {hours.map(hour => (
                    <th key={hour} className="p-0 text-center">
                      <span className="text-xs text-muted-foreground">{hour}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekDays.map(day => (
                  <tr key={day}>
                    <td className="py-1 pr-4">
                      <span className="text-sm text-muted-foreground">{day}</span>
                    </td>
                    {hours.map(hour => {
                      const value = activityData[day][hour];
                      return (
                        <td key={hour} className="p-0">
                          <div 
                            className="w-full h-8 transition-colors"
                            style={{
                              backgroundColor: `rgba(34, 197, 94, ${value})`,
                              borderRadius: '2px',
                              margin: '1px'
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Вовлеченность</h3>
            <p className="text-sm text-muted-foreground">
              Динамика вовлеченности в течение дня
            </p>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyEngagementData}>
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
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
                <Bar
                  dataKey="engagement"
                  fill="url(#colorEngagement)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
        <div className="space-y-6">
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

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="followers"
                  stroke="#FF6B00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFollowers)"
                  dot={{ r: 2, fill: "#FF6B00" }}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={0.1}
                  fill="#3B82F6"
                  dot={{ r: 2, fill: "#3B82F6" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}