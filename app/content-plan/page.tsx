"use client";

import Sidebar from '@/components/sidebar';
import ContentPlanCalendar from '@/components/content-plan/content-plan-calendar';

export default function ContentPlanPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <ContentPlanCalendar />
      </main>
    </div>
  );
}