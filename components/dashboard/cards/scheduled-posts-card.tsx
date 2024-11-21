"use client";

import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ScheduledPostsCard() {
  const router = useRouter();

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  return (
    <Card className="p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center space-x-3 mb-4">
        <Calendar className="h-6 w-6 text-primary" />
        <h3 className="font-semibold">Запланированные посты</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        У вас есть посты, запланированные на следующие:
      </p>
      <div className="text-3xl font-bold mb-4">1 день</div>
      <Button 
        className="w-full"
        onClick={handleCreatePost}
      >
        Создать пост +
      </Button>
    </Card>
  );
}