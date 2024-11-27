"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Switch } from '@/ui/switch';
import { Calendar } from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Confetti from 'react-confetti';
import NetworkSelector, { networks } from './scheduling/NetworkSelector';
import StoryPreview from './scheduling/StoryPreview';
import PublishSuccess from '../text-post/PublishSuccess';
import type { Story } from './types';
import Image from 'next/image';

interface Step4SchedulingProps {
  onBack: () => void;
  onNext: () => void;
  stories: Story[];
  setStories: (stories: Story[]) => void;
  initialDate?: Date;
  initialTime?: string;
}

export default function Step4Scheduling({
  onBack,
  onNext,
  stories,
  setStories,
  initialDate,
  initialTime
}: Step4SchedulingProps) {
  const router = useRouter();
  const [selectedNetworks, setSelectedNetworks] = useState(['instagram']);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [previewStory, setPreviewStory] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useState(() => {
    if (initialDate && initialTime && stories.length > 0) {
      const updatedStories = stories.map((story, index) => ({
        ...story,
        schedule: {
          date: initialDate,
          time: addMinutes(parseTime(initialTime), index * 30).toString(),
          networks: selectedNetworks
        }
      }));
      setStories(updatedStories);
    }
  });

  const handleStoryUpdate = (storyId: string, updates: Partial<Story>) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, ...updates } : story
    ));
  };

  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const addMinutes = (minutes: number, add: number) => {
    const totalMinutes = minutes + add;
    const hours = Math.floor(totalMinutes / 60) % 24;
    const mins = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const isValid = stories.every(story => {
    const hasNetworks = story.schedule?.networks && story.schedule.networks.length > 0;
    const hasDate = !!story.schedule?.date;
    const hasTime = !!story.schedule?.time;
    return hasNetworks && hasDate && hasTime;
  });

  const handleSchedule = () => {
    setShowSuccess(true);
  };

  const handleBackToDashboard = () => {
    router.push('/');
  };

  const hasSchedule = (story: Story) => {
    return story.schedule?.networks && story.schedule.networks.length > 0;
  };

  if (showSuccess) {
    return <PublishSuccess onBackToDashboard={handleBackToDashboard} />;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost"
                onClick={onBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
              <div>
                <h2 className="text-lg font-semibold">Планирование публикации</h2>
                <p className="text-sm text-muted-foreground">
                  Настройте время публикации для каждой истории
                </p>
              </div>
            </div>
            <Button 
              onClick={handleSchedule}
              disabled={!isValid}
            >
              Запланировать
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <NetworkSelector
            selectedNetworks={selectedNetworks}
            setSelectedNetworks={setSelectedNetworks}
          />

          <div className="space-y-4">
            {stories.map((story, index) => (
              <Card
                key={story.id}
                className={`p-4 transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] ${
                  selectedStory === story.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedStory(story.id)}
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewStory(story.id);
                    }}
                  >
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

                  <div className="flex items-center space-x-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="min-w-[140px]">
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
                          onSelect={(date) => handleStoryUpdate(story.id, {
                            schedule: { ...story.schedule, date }
                          })}
                          locale={ru}
                        />
                      </PopoverContent>
                    </Popover>

                    <input
                      type="time"
                      value={story.schedule?.time || '12:00'}
                      onChange={(e) => handleStoryUpdate(story.id, {
                        schedule: { ...story.schedule, time: e.target.value }
                      })}
                      className="flex h-10 w-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />

                    {hasSchedule(story) && (
                      <div className="flex -space-x-1">
                        {selectedNetworks.map(networkId => {
                          const network = networks.find(n => n.id === networkId);
                          if (!network) return null;
                          const Icon = network.icon;
                          return (
                            <div
                              key={network.id}
                              className={`w-8 h-8 rounded-full ${network.gradient} flex items-center justify-center ring-2 ring-background`}
                            >
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Рекомендации</span>
              <Switch
                checked={showRecommendations}
                onCheckedChange={setShowRecommendations}
              />
            </div>
            {showRecommendations && (
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Оптимальное время публикации:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Instagram: 9:00-11:00, 13:00-15:00, 19:00-21:00</li>
                  <li>Facebook: 12:00-15:00, 18:00-20:00</li>
                  <li>YouTube: 14:00-16:00, 17:00-19:00</li>
                </ul>
              </div>
            )}
          </Card>
        </div>
      </div>

      {previewStory && (
        <StoryPreview
          story={stories.find(s => s.id === previewStory)!}
          onClose={() => setPreviewStory(null)}
        />
      )}
    </>
  );
}