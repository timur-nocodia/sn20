"use client";

import { useState } from 'react';
import { format, addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CalendarGrid from './calendar-grid';

export default function ContentPlanCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'weekly' | 'monthly'>('monthly');

  const handlePrevious = () => {
    if (view === 'monthly') {
      setCurrentDate(prev => subMonths(prev, 1));
    } else {
      setCurrentDate(prev => subWeeks(prev, 1));
    }
  };

  const handleNext = () => {
    if (view === 'monthly') {
      setCurrentDate(prev => addMonths(prev, 1));
    } else {
      setCurrentDate(prev => addWeeks(prev, 1));
    }
  };

  const getDateRangeText = () => {
    if (view === 'monthly') {
      return format(currentDate, 'LLLL yyyy', { locale: ru });
    }
    const start = format(currentDate, 'd MMMM', { locale: ru });
    const end = format(addWeeks(currentDate, 1), 'd MMMM', { locale: ru });
    return `${start} - ${end}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Контент план</h1>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-[200px] text-center font-medium">
              {getDateRangeText()}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant={view === 'weekly' ? 'default' : 'outline'}
              onClick={() => setView('weekly')}
            >
              Неделя
            </Button>
            <Button 
              variant={view === 'monthly' ? 'default' : 'outline'}
              onClick={() => setView('monthly')}
            >
              Месяц
            </Button>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <CalendarGrid 
          currentDate={currentDate}
          view={view}
        />
      </Card>
    </div>
  );
}