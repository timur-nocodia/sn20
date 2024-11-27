"use client";

import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { ExternalLink } from 'lucide-react';

export default function SupportSettings() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Поддержка</h2>
          <p className="text-sm text-muted-foreground">
            Получите помощь по использованию приложения
          </p>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            Руководство пользователя
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            Связаться с поддержкой
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}