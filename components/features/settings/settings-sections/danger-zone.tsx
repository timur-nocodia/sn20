"use client";

import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function DangerZone() {
  return (
    <Card className="p-6 border-destructive">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Опасная зона</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Действия в этой зоне необратимы
        </p>

        <div className="space-y-4">
          <Button variant="destructive" className="w-full">
            Удалить аккаунт
          </Button>
        </div>
      </div>
    </Card>
  );
}