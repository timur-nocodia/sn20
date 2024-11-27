"use client";

import { Switch } from '@/ui/switch';
import { Card } from '@/ui/card';
import { Label } from '@/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

export default function TimeSettings() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Настройки времени</h2>
          <p className="text-sm text-muted-foreground">
            Настройте временные параметры
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>24-часовой формат</Label>
              <p className="text-sm text-muted-foreground">
                Использовать 24-часовой формат времени
              </p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label>Часовой пояс</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите часовой пояс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc+3">UTC+3 Москва</SelectItem>
                <SelectItem value="utc+6">UTC+6 Алматы</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Начало недели</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите день" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Понедельник</SelectItem>
                <SelectItem value="sunday">Воскресенье</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}