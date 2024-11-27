"use client";

import { Card } from '@/ui/card';
import { Button } from '@/ui/button';

export function PostSlotsCard() {
  return (
    <Card className="p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center">
          <div className="h-4 w-4 bg-primary rounded-full" />
        </div>
        <h3 className="font-semibold">Контент план</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Создан контент для вашего контент плана на эту неделю:
      </p>
      <div className="text-3xl font-bold mb-4">1 / 25 постов</div>
      <Button variant="outline" className="w-full">
        Посмотреть контент план
      </Button>
    </Card>
  );
}