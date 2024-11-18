"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import StoryVisualCard from './StoryVisualCard';
import StoryPreview from './StoryPreview';
import GenerateVisualModal from './GenerateVisualModal';
import type { Story } from './types';

interface Step3VisualsProps {
  onBack: () => void;
  onNext: () => void;
  stories: Story[];
  setStories: (stories: Story[]) => void;
}

const dummyStories: Story[] = [
  {
    id: 'story-1',
    stage: 'intro',
    content: 'Привет! 👋 Сегодня поговорим о важной теме здорового образа жизни...',
    hasInteraction: false,
    order: 0,
    background: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    style: {
      font: 'modern',
      textColor: '#FFFFFF',
      backgroundColor: 'rgba(0,0,0,0.5)',
      fontSize: 'medium',
      position: 'center',
      effects: ['shadow']
    }
  },
  {
    id: 'story-2',
    stage: 'problem',
    content: 'Многие из нас сталкиваются с проблемой нехватки энергии и мотивации...',
    hasInteraction: true,
    order: 1,
    background: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5',
    style: {
      font: 'classic',
      textColor: '#FFFFFF',
      backgroundColor: 'rgba(0,0,0,0.5)',
      fontSize: 'large',
      position: 'bottom',
      effects: ['shadow', 'gradient']
    }
  }
];

export default function Step3Visuals({
  onBack,
  onNext,
  stories,
  setStories
}: Step3VisualsProps) {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generatingStoryId, setGeneratingStoryId] = useState<string | null>(null);

  useEffect(() => {
    if (stories.length === 0) {
      setStories(dummyStories);
    }
  }, [stories.length, setStories]);

  const handleStoryUpdate = (storyId: string, updates: Partial<Story>) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, ...updates } : story
    ));
  };

  const handleGenerateStyles = () => {
    const updatedStories = stories.map(story => ({
      ...story,
      style: {
        font: 'modern',
        textColor: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0.5)',
        fontSize: 'medium' as const,
        position: 'center' as const,
        effects: ['shadow']
      }
    }));
    setStories(updatedStories);
  };

  const handleOpenGenerateModal = (storyId: string) => {
    setGeneratingStoryId(storyId);
    setShowGenerateModal(true);
  };

  const handleGenerateVisual = (imageUrl: string) => {
    if (generatingStoryId) {
      handleStoryUpdate(generatingStoryId, { background: imageUrl });
    }
    setShowGenerateModal(false);
    setGeneratingStoryId(null);
  };

  const canProceed = stories.every(story => story.style && story.background);

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
                <h2 className="text-lg font-semibold">Визуальное оформление</h2>
                <p className="text-sm text-muted-foreground">
                  Настройте внешний вид каждой истории
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handleGenerateStyles}
                className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary hover:text-primary"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Сгенерировать стили
              </Button>
              <Button onClick={() => setShowPreview(true)}>
                Предпросмотр
              </Button>
              <Button 
                onClick={onNext}
                disabled={!canProceed}
              >
                Далее →
               
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 -mx-6">
          <div className="grid grid-cols-3 gap-6 p-6">
            {stories.map((story, index) => (
              <StoryVisualCard
                key={story.id}
                story={story}
                index={index}
                onClick={() => setSelectedStory(story.id)}
                onUpdate={(updates) => handleStoryUpdate(story.id, updates)}
                onGenerate={() => handleOpenGenerateModal(story.id)}
                isSelected={selectedStory === story.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <StoryPreview
        open={showPreview}
        onOpenChange={setShowPreview}
        stories={stories}
        currentIndex={previewIndex}
        onIndexChange={setPreviewIndex}
      />

      <GenerateVisualModal
        open={showGenerateModal}
        onOpenChange={setShowGenerateModal}
        onGenerate={handleGenerateVisual}
        story={stories.find(s => s.id === generatingStoryId)}
      />
    </>
  );
}