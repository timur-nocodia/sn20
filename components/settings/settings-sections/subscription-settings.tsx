"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SubscriptionSettings() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Подписка</h2>
          <p className="text-sm text-muted-foreground">
            Управляйте своей подпиской
          </p>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">Business Plan</h3>
              <Badge>Активна</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Следующее списание 15 февраля 2024
            </p>
          </div>
          <Button variant="outline">Управление</Button>
        </div>
      </div>
    </Card>
  );
}