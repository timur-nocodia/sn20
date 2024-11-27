"use client";

import { NetworkIcon, NetworkColor } from './constants';
import { cn } from '@/lib/utils';
import type { Story } from './types';

interface StoryIndicatorsProps {
  stories: Story[];
}

export default function StoryIndicators({ stories }: StoryIndicatorsProps) {
  if (stories.length === 0) return null;

  return (
    <div className="absolute top-1 left-1/2 -translate-x-1/2 flex -space-x-1.5">
      {stories.map((story, index) => {
        const Icon = NetworkIcon[story.network];
        return (
          <div
            key={story.id}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center",
              story.status === 'created' 
                ? NetworkColor[story.network]
                : 'border-2 border-dashed',
              story.status === 'created' 
                ? 'text-white'
                : `border-${story.network === 'instagram' ? '[#DD2A7B]' : '[#1877F2]'} text-muted-foreground`
            )}
            style={{ zIndex: stories.length - index }}
          >
            <Icon className="h-3 w-3" />
          </div>
        );
      })}
    </div>
  );
}