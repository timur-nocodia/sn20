"use client";

import { Switch } from '@/ui/switch';
import { Card } from '@/ui/card';
import { Label } from '@/ui/label';

export default function NotificationSettings() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Уведомления</h2>
          <p className="text-sm text-muted-foreground">
            Настройте параметры уведомлений
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push-уведомления</Label>
              <p className="text-sm text-muted-foreground">
                Получать push-уведомления о публикациях
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email-уведомления</Label>
              <p className="text-sm text-muted-foreground">
                Получать уведомления на email при ошибках публикации
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </Card>
  );
}