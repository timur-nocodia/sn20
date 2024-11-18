"use client";

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PostItem } from './post-item';

export function ScheduledPosts() {
  const router = useRouter();

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  return (
    <Card className="shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Запланированные посты</h2>
          <Button onClick={handleCreatePost}>
            Создать пост +
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Эти посты запланированы и ожидают публикации</p>
      </div>
      
      <div className="p-6 pt-0">
        <PostItem 
          time="20:45"
          date="Завтра"
          content="Задавать вопросы - отличный способ узнать больше об окружающем нас мире! Но знаете ли вы, что есть..."
        />
      </div>
    </Card>
  );
}