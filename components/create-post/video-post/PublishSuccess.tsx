"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';

interface PublishSuccessProps {
  isScheduled: boolean;
}

export default function PublishSuccess({ isScheduled }: PublishSuccessProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        colors={['#FF6B00', '#FFB800', '#FF3D00']}
      />
      <div className="text-center space-y-4 animate-in fade-in-0 zoom-in-95">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <PartyPopper className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">
          {isScheduled ? 'Запланировано!' : 'Опубликовано!'}
        </h2>
        <p className="text-muted-foreground">
          {isScheduled 
            ? 'Ваш пост успешно запланирован'
            : 'Ваш пост успешно опубликован'
          }
        </p>
        <Button 
          onClick={() => router.push('/')}
          className="mt-6"
        >
          Вернуться к дашборду
        </Button>
      </div>
    </div>
  );
}