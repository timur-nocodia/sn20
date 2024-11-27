"use client";

import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { ScrollArea } from '@/ui/scroll-area';

interface TimeSelectorProps {
  value: string;
  onChange: (time: string) => void;
}

export default function TimeSelector({ value, onChange }: TimeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSelector, setActiveSelector] = useState<'hour' | 'minute' | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const [hour, minute] = value.split(':').map(Number);

  const handleHourClick = (selectedHour: number) => {
    onChange(`${selectedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    setActiveSelector('minute');
  };

  const handleMinuteClick = (selectedMinute: number) => {
    onChange(`${hour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`);
    setIsOpen(false);
    setActiveSelector(null);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between"
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveSelector('hour');
        }}
      >
        <Clock className="mr-2 h-4 w-4" />
        {value}
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 z-50">
          <div className="flex space-x-2">
            <div className="flex-1">
              <div 
                className={`text-sm font-medium mb-2 text-center ${
                  activeSelector === 'hour' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Часы
              </div>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-1">
                  {hours.map((h) => (
                    <Button
                      key={h}
                      variant={hour === h ? "default" : "ghost"}
                      className="w-full"
                      onClick={() => handleHourClick(h)}
                    >
                      {h.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex-1">
              <div 
                className={`text-sm font-medium mb-2 text-center ${
                  activeSelector === 'minute' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Минуты
              </div>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-1">
                  {minutes.map((m) => (
                    <Button
                      key={m}
                      variant={minute === m ? "default" : "ghost"}
                      className="w-full"
                      onClick={() => handleMinuteClick(m)}
                    >
                      {m.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}