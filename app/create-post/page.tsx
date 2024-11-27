"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/layout-components/sidebar';
import CreatePost from '@/components/features/content';

export default function CreatePostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const type = searchParams.get('type');

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <CreatePost 
          initialDate={date ? new Date(date) : undefined}
          initialTime={time || undefined}
          initialType={type as 'text' | 'video' | 'audio' | undefined}
          onClose={handleClose}
        />
      </main>
    </div>
  );
}