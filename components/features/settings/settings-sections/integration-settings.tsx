"use client";

import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

export default function IntegrationSettings() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Интеграции</h2>
          <p className="text-sm text-muted-foreground">
            Подключите внешние сервисы
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>API ключ</Label>
            <div className="flex space-x-2">
              <Input placeholder="Введите API ключ" />
              <Button>Подключить</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}