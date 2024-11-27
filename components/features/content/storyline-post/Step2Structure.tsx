"use client";

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui-components/button';
import { Card } from '@/components/ui-components/card';
import { ScrollArea } from '@/components/ui-components/scroll-area';
import StoryCard from './StoryCard';
import RecommendationsPanel from './RecommendationsPanel';
import type { Story } from './types';

interface Step2StructureProps {
  onBack: () => void;
  onNext: () => void;
  stories: Story[];
  setStories: (stories: Story[]) => void;
}

// Dummy stories data - only 2 stories
const dummyStories: Story[] = [
  {
    id: 'story-1',
    stage: 'intro',
    content: 'Привет! 👋 Сегодня поговорим о важной теме...',
    hasInteraction: false,
    order: 0
  },
  {
    id: 'story-2',
    stage: 'cta',
    content: 'Хотите узнать больше? Переходите по ссылке...',
    hasInteraction: true,
    order: 1
  }
];

export default function Step2Structure({
  onBack,
  onNext,
  stories,
  setStories
}: Step2StructureProps) {
  const [draggedStory, setDraggedStory] = useState<Story | null>(null);
  const [dragTarget, setDragTarget] = useState<string | null>(null);

  // Initialize with dummy stories if no stories exist
  useEffect(() => {
    if (stories.length === 0) {
      setStories(dummyStories);
    }
  }, [stories.length, setStories]); // Added missing dependencies

  const handleDragStart = (story: Story) => {
    setDraggedStory(story);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (draggedStory && draggedStory.id !== targetId) {
      setDragTarget(targetId);
    }
  };

  const handleDragEnd = () => {
    if (draggedStory && dragTarget) {
      const newStories = [...stories];
      const draggedIndex = stories.findIndex(s => s.id === draggedStory.id);
      const targetIndex = stories.findIndex(s => s.id === dragTarget);
      
      newStories.splice(draggedIndex, 1);
      newStories.splice(targetIndex, 0, draggedStory);
      
      // Update order
      newStories.forEach((story, index) => {
        story.order = index;
      });
      
      setStories(newStories);
    }
    setDraggedStory(null);
    setDragTarget(null);
  };

  const handleAddStory = () => {
    const newStory: Story = {
      id: `story-${stories.length + 1}`,
      stage: 'intro',
      content: '',
      hasInteraction: false,
      order: stories.length
    };
    setStories([...stories, newStory]);
  };

  const handleDeleteStory = (storyId: string) => {
    const newStories = stories.filter(s => s.id !== storyId);
    // Update order
    newStories.forEach((story, index) => {
      story.order = index;
    });
    setStories(newStories);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={onBack}
            >
              ← Назад
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Структура историй</h2>
              <p className="text-sm text-muted-foreground">
                Создайте структуру ваших историй
              </p>
            </div>
          </div>
          <Button 
            onClick={onNext}
            disabled={stories.length === 0}
          >
            Далее →
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="p-6">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-4 pr-4">
                  {stories.map((story, index) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      index={index}
                      onDragStart={() => handleDragStart(story)}
                      onDragOver={(e) => handleDragOver(e, story.id)}
                      onDragEnd={handleDragEnd}
                      onDelete={() => handleDeleteStory(story.id)}
                      isDragging={draggedStory?.id === story.id}
                      isDragTarget={dragTarget === story.id}
                    />
                  ))}

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAddStory}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Добавить историю
                  </Button>
                </div>
              </ScrollArea>
            </Card>
          </div>

          <div className="col-span-1">
            <RecommendationsPanel stories={stories} />
          </div>
        </div>
      </div>
    </div>
  );
}