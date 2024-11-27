"use client";

import { useState } from 'react';
import { 
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isSameDay,
  addDays
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import CreatePostSlotModal from './create-post-slot-modal';
import WeeklyView from './calendar/WeeklyView';
import MonthlyView from './calendar/MonthlyView';
import { type Story, type ContentItem } from './calendar/types';

interface CalendarGridProps {
  currentDate: Date;
  view: 'weekly' | 'monthly';
}

const contentItems: ContentItem[] = [
  // November 4, 2024
  {
    id: '1',
    date: new Date(2024, 10, 4, 10, 0),
    time: '10:00',
    type: 'text',
    network: 'instagram',
    status: 'created',
    title: 'Топ-5 трендов в SMM на 2025 год'
  },
  {
    id: '2',
    date: new Date(2024, 10, 4, 15, 30),
    time: '15:30',
    type: 'video',
    network: 'youtube',
    status: 'planned',
    title: 'Обзор новых функций платформы'
  },
  // November 5, 2024
  {
    id: '3',
    date: new Date(2024, 10, 5, 9, 0),
    time: '09:00',
    type: 'audio',
    network: 'facebook',
    status: 'created',
    title: 'Подкаст: Интервью с экспертом'
  },
  {
    id: '4',
    date: new Date(2024, 10, 5, 14, 0),
    time: '14:00',
    type: 'text',
    network: 'instagram',
    status: 'planned',
    title: 'Анонс нового курса'
  }
];

const stories: Story[] = [
  {
    id: '1',
    date: new Date(2024, 11, 14),
    network: 'instagram',
    status: 'created'
  },
  {
    id: '2',
    date: new Date(2024, 11, 14),
    network: 'facebook',
    status: 'planned'
  },
  {
    id: '3',
    date: new Date(2024, 11, 15),
    network: 'instagram',
    status: 'created'
  },
  {
    id: '4',
    date: new Date(2024, 11, 16),
    network: 'facebook',
    status: 'created'
  },
  {
    id: '5',
    date: new Date(2024, 11, 16),
    network: 'instagram',
    status: 'planned'
  }
];

export default function CalendarGrid({ currentDate, view }: CalendarGridProps) {
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);

  const getDays = () => {
    if (view === 'monthly') {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);
      const calendarStart = startOfWeek(monthStart, { locale: ru });
      const calendarEnd = endOfWeek(monthEnd, { locale: ru });
      return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    } else {
      const weekStart = startOfWeek(currentDate, { locale: ru });
      return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    }
  };

  const handleTimeSlotClick = (date: Date, time: string) => {
    setSelectedSlot({ date, time });
  };

  const days = getDays();

  return (
    <>
      {view === 'weekly' ? (
        <WeeklyView
          days={days}
          currentDate={currentDate}
          contentItems={contentItems}
          onTimeSlotClick={handleTimeSlotClick}
        />
      ) : (
        <MonthlyView
          days={days}
          currentDate={currentDate}
          contentItems={contentItems}
          stories={stories}
          onTimeSlotClick={handleTimeSlotClick}
        />
      )}

      {selectedSlot && (
        <CreatePostSlotModal
          isOpen={true}
          onClose={() => setSelectedSlot(null)}
          selectedDate={selectedSlot.date}
          selectedTime={selectedSlot.time}
        />
      )}
    </>
  );
}