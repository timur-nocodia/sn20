"use client";

import { PostSlotsCard } from './post-slots-card';
import { ScheduledPostsCard } from './scheduled-posts-card';
import { InspirationCard } from './inspiration-card';

export function Cards() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <ScheduledPostsCard />
      <PostSlotsCard />
      <InspirationCard />
    </div>
  );
}