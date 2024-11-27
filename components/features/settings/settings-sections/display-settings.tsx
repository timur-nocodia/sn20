"use client";

import { Switch } from '@/ui/switch';
import { Card } from '@/ui/card';
import { Label } from '@/ui/label';

export default function DisplaySettings() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Настройки отображения</h2>
          <p className="text-sm text-muted-foreground">
            Настройте внешний вид приложения
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Темная тема</Label>
              <p className="text-sm text-muted-foreground">
                Включить темную тему
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Расширенный календарь</Label>
              <p className="text-sm text-muted-foreground">
                Показывать расширенные события в календаре
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Черновики</Label>
              <p className="text-sm text-muted-foreground">
                Показывать запланированные черновики
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </Card>
  );
}