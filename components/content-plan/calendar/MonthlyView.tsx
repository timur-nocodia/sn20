"use client";

import { isSameMonth, isSameDay, format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { NetworkIcon, ContentTypeIcon, NetworkColor, weekDays } from './constants';
import type { ContentItem, Story } from './types';
import StoryIndicators from './StoryIndicators';

interface MonthlyViewProps {
  days: Date[];
  currentDate: Date;
  contentItems: ContentItem[];
  stories: Story[];
  onTimeSlotClick: (date: Date, time: string) => void;
}

export default function MonthlyView({
  days,
  currentDate,
  contentItems,
  stories,
  onTimeSlotClick
}: MonthlyViewProps) {
  const getStoriesForDay = (date: Date) => {
    return stories.filter(story => isSameDay(new Date(story.date), date));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-px mb-px">
        {weekDays.map(day => (
          <div 
            key={day}
            className="h-12 flex items-center justify-center font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-muted">
        {days.map((day) => {
          const dayContent = contentItems.filter(item => 
            isSameDay(new Date(item.date), day)
          );
          const dayStories = getStoriesForDay(day);
          const hasContent = dayContent.length > 0;
          
          return (
            <div
              key={day.toString()}
              className={cn(
                "relative bg-background p-2 min-h-[120px] cursor-pointer transition-all duration-200",
                !isSameMonth(day, currentDate) && "bg-muted/50",
                hasContent && "bg-primary/5",
                "hover:ring-2 hover:ring-primary hover:ring-inset"
              )}
              onClick={() => onTimeSlotClick(day, '09:00')}
            >
              <StoryIndicators stories={dayStories} />
              
              <div className={cn(
                "flex items-center justify-center h-7 w-7 rounded-full mx-auto mb-1",
                isToday(day) && "bg-primary text-primary-foreground",
                !isToday(day) && "text-muted-foreground"
              )}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayContent.map(item => {
                  const NetworkIconComponent = NetworkIcon[item.network];
                  const ContentIconComponent = ContentTypeIcon[item.type];
                  
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "group relative rounded-md p-2 text-xs transition-all duration-200",
                        item.status === 'created'
                          ? "hover:bg-accent cursor-pointer hover:shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)]"
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
                      <div className="mt-1 text-muted-foreground line-clamp-2">
                        {item.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}