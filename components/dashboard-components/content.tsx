"use client";

import { Cards } from './cards';
import { ScheduledPosts } from './scheduled-posts';

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <Cards />
      <ScheduledPosts />
    </div>
  );
}