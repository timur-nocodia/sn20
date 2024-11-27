"use client";

import { Card } from '@/ui/card';
import { Calendar } from '@/ui/calendar';
import { Button } from '@/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { networks } from './NetworkSelector';
import Image from 'next/image';
import type { Story } from '../types';

interface StoryScheduleRowProps {
  story: Story;
  index: number;
  onUpdate: (storyId: string, updates: Partial<Story>) => void;
}

export default function StoryScheduleRow({
  story,
  index,
  onUpdate
}: StoryScheduleRowProps) {
  const handleTimeChange = (time: string) => {
    onUpdate(story.id, {
      schedule: {
        ...story.schedule,
        time
      }
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      onUpdate(story.id, {
        schedule: {
          ...story.schedule,
          date
        }
      });
    }
  };

  const handleNetworkToggle = (networkId: string) => {
    const currentNetworks = story.schedule?.networks || [];
    const newNetworks = currentNetworks.includes(networkId)
      ? currentNetworks.filter(id => id !== networkId)
      : [...currentNetworks, networkId];
    
    onUpdate(story.id, {
      schedule: {
        ...story.schedule,
        networks: newNetworks
      }
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        {/* Preview */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          {story.background ? (
            <div className="relative w-full h-full">
              <Image 
                src={story.background} 
                alt={`Story ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              #{index + 1}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">История {index + 1}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{story.stage}</span>
          </div>
          {story.content && (
            <p className="text-sm text-muted-foreground truncate mt-1">
              {story.content}
            </p>
          )}
        </div>

        {/* Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {story.schedule?.date 
                ? format(story.schedule.date, 'dd MMM yyyy', { locale: ru })
                : 'Выберите дату'
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={story.schedule?.date}
              onSelect={handleDateChange}
              locale={ru}
            />
          </PopoverContent>
        </Popover>

        {/* Time */}
        <input
          type="time"
          value={story.schedule?.time || '12:00'}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="flex h-10 w-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />

        {/* Networks */}
        <div className="flex items-center space-x-2">
          {networks.map(network => {
            const Icon = network.icon;
            const isSelected = story.schedule?.networks?.includes(network.id);
            
            return (
              <Button
                key={network.id}
                variant={isSelected ? "default" : "outline"}
                size="icon"
                className="h-10 w-10"
                style={{
                  backgroundColor: isSelected ? network.color : undefined,
                  borderColor: !isSelected ? network.color : undefined,
                  color: isSelected ? 'white' : network.color
                }}
                onClick={() => handleNetworkToggle(network.id)}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}