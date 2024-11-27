"use client";

import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Label } from '@/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { cn } from '@/lib/utils';

interface SettingsSectionProps {
  style: string;
  setStyle: (value: string) => void;
  aspectRatio: string;
  setAspectRatio: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
}

const styles = [
  { id: 'auto', label: 'Авто' },
  { id: 'general', label: 'Общий' },
  { id: 'realistic', label: 'Реалистичный' },
  { id: 'design', label: 'Дизайн' },
  { id: '3d', label: '3D' },
  { id: 'anime', label: 'Аниме' }
];

const ratios = [
  { id: '9:16', label: '9:16', icon: '📱' },
  { id: '1:1', label: '1:1', icon: '⬛' },
  { id: '16:9', label: '16:9', icon: '🖥️' }
];

const models = [
  { id: '1.0', label: 'Версия 1.0' },
  { id: '2.0', label: 'Версия 2.0' },
  { id: '3.0', label: 'Версия 3.0 (beta)' }
];

export function SettingsSection({
  style,
  setStyle,
  aspectRatio,
  setAspectRatio,
  model,
  setModel
}: SettingsSectionProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Стиль</Label>
          <div className="flex flex-wrap gap-2">
            {styles.map((s) => (
              <Button
                key={s.id}
                variant={style === s.id ? 'default' : 'outline'}
                onClick={() => setStyle(s.id)}
                className={cn(
                  'flex-1',
                  style === s.id && 'bg-primary text-primary-foreground'
                )}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Соотношение сторон</Label>
          <div className="flex gap-2">
            {ratios.map((ratio) => (
              <Button
                key={ratio.id}
                variant={aspectRatio === ratio.id ? 'default' : 'outline'}
                onClick={() => setAspectRatio(ratio.id)}
                className={cn(
                  'flex-1',
                  aspectRatio === ratio.id && 'bg-primary text-primary-foreground'
                )}
              >
                <span className="mr-2">{ratio.icon}</span>
                {ratio.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Модель</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}