"use client";

import { useEffect } from 'react';
import { PartyPopper } from 'lucide-react';
import { Button } from '@/ui/button';
import Confetti from 'react-confetti';

interface PublishSuccessProps {
  onBackToDashboard: () => void;
}

export default function PublishSuccess({ onBackToDashboard }: PublishSuccessProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onBackToDashboard();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onBackToDashboard]);

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
        <h2 className="text-2xl font-semibold">Опубликовано!</h2>
        <p className="text-muted-foreground">
          Ваш пост успешно опубликован
        </p>
        <Button 
          onClick={onBackToDashboard}
          className="mt-6"
        >
          Вернуться к дашборду
        </Button>
      </div>
    </div>
  );
}