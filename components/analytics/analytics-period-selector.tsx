"use client";

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { NetworkIcon, NetworkColor } from '../content-plan/calendar/constants';
import { cn } from '@/lib/utils';

interface AnalyticsPeriodSelectorProps {
  period: '90days' | '30days' | '7days' | 'custom';
  setPeriod: (period: '90days' | '30days' | '7days' | 'custom') => void;
  dateRange: { start: Date; end: Date };
  setDateRange: (range: { start: Date; end: Date }) => void;
}

// Example connected accounts
const connectedAccounts = [
  {
    id: '1',
    name: 'Тимур Есенов',
    username: 'timur.yessenov',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    network: 'instagram' as const
  }
];

export default function AnalyticsPeriodSelector({
  period,
  setPeriod,
  dateRange,
  setDateRange
}: AnalyticsPeriodSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button
          variant={period === '90days' ? 'default' : 'outline'}
          onClick={() => setPeriod('90days')}
        >
          90 дней
        </Button>
        <Button
          variant={period === '30days' ? 'default' : 'outline'}
          onClick={() => setPeriod('30days')}
        >
          30 дней
        </Button>
        <Button
          variant={period === '7days' ? 'default' : 'outline'}
          onClick={() => setPeriod('7days')}
        >
          7 дней
        </Button>
        
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={period === 'custom' ? 'default' : 'outline'}
              className="min-w-[240px]"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {period === 'custom' ? (
                <>
                  {format(dateRange.start, 'dd MMM', { locale: ru })} -{' '}
                  {format(dateRange.end, 'dd MMM', { locale: ru })}
                </>
              ) : (
                'Выбрать период'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={{
                from: dateRange.start,
                to: dateRange.end
              }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange({ start: range.from, end: range.to });
                  setPeriod('custom');
                  setIsCalendarOpen(false);
                }
              }}
              numberOfMonths={2}
              locale={ru}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center -space-x-2">
        {connectedAccounts.map((account) => {
          const Icon = NetworkIcon[account.network];
          
          return (
            <div
              key={account.id}
              className="relative group"
            >
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarImage src={account.avatar} alt={account.name} />
                <AvatarFallback>
                  {account.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {/* Small social network icon */}
              <div className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-background",
                NetworkColor[account.network]
              )}>
                <Icon className="h-2.5 w-2.5 text-white" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {account.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}