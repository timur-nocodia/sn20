"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import StoryScheduleRow from './StoryScheduleRow';
import type { Story } from '../types';

interface StoryScheduleListProps {
  stories: Story[];
  onStoryUpdate: (storyId: string, updates: Partial<Story>) => void;
}

export default function StoryScheduleList({
  stories,
  onStoryUpdate
}: StoryScheduleListProps) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4 pr-4">
        {stories.map((story, index) => (
          <StoryScheduleRow
            key={story.id}
            story={story}
            index={index}
            onUpdate={onStoryUpdate}
          />
        ))}
      </div>
    </ScrollArea>
  );
}