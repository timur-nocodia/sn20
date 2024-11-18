"use client";

import { isSameMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
import { format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { NetworkIcon, ContentTypeIcon, NetworkColor, weekDays, timeSlots } from './constants';
import type { ContentItem } from './types';

interface WeeklyViewProps {
  days: Date[];
  currentDate: Date;
  contentItems: ContentItem[];
  onTimeSlotClick: (date: Date, time: string) => void;
}

export default function WeeklyView({
  days,
  currentDate,
  contentItems,
  onTimeSlotClick
}: WeeklyViewProps) {
  const getContentForDayAndTime = (date: Date, timeSlot: string) => {
    const [hours] = timeSlot.split(':').map(Number);
    return contentItems.filter(item => {
      const itemDate = new Date(item.date);
      const [itemHours] = item.time.split(':').map(Number);
      return isSameDay(itemDate, date) && itemHours === hours;
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-8 border-b">
        <div className="w-20" />
        {days.map((day, index) => (
          <div 
            key={day.toString()}
            className="p-4 text-center border-l"
          >
            <div className="font-medium">
              {weekDays[index]}
            </div>
            <div className={cn(
              "text-sm",
              !isSameMonth(day, currentDate) && "text-muted-foreground"
            )}>
              {format(day, 'd MMM', { locale: ru })}
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="grid grid-cols-8">
          <div className="w-20">
            {timeSlots.map((time) => (
              <div 
                key={time}
                className="h-20 border-b relative"
              >
                <span className="absolute -top-3 left-2 text-sm text-muted-foreground">
                  {time}
                </span>
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day.toString()} className="border-l">
              {timeSlots.map((timeSlot) => {
                const content = getContentForDayAndTime(day, timeSlot);
                const hasContent = content.length > 0;
                
                return (
                  <div 
                    key={`${day}-${timeSlot}`}
                    className={cn(
                      "h-20 border-b p-1 cursor-pointer transition-all duration-200",
                      hasContent && "bg-primary/5",
                      "hover:ring-2 hover:ring-primary hover:ring-inset"
                    )}
                    onClick={() => onTimeSlotClick(day, timeSlot)}
                  >
                    {content.map(item => {
                      const NetworkIconComponent = NetworkIcon[item.network];
                      const ContentIconComponent = ContentTypeIcon[item.type];
                      
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "group relative rounded-md p-2 text-xs transition-all duration-200",
                            item.status === 'created' 
                              ? "bg-white hover:shadow-lg" 
                              : "border-2 border-dashed border-primary/20"
                          )}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-white",
                              NetworkColor[item.network]
                            )}>
                              <NetworkIconComponent className="h-3 w-3" />
                            </div>
                            <ContentIconComponent className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{item.time}</span>
                          </div>
                          <div className="mt-1 text-muted-foreground line-clamp-1">
                            {item.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}