"use client";

import { useRouter } from 'next/navigation';
import { 
  ImageIcon, 
  Paintbrush, 
  Eraser, 
  Wand2, 
  Layers, 
  Palette, 
  Frame, 
  ScanLine 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tools = [
  {
    id: 'generate',
    name: 'Генерация изображений',
    description: 'Создавайте уникальные изображения с помощью AI',
    icon: ImageIcon,
    href: '/ai-tools/image/generate',
    isNew: true
  },
  {
    id: 'enhance',
    name: 'Улучшение качества',
    description: 'Повысьте качество и разрешение изображений',
    icon: Wand2,
    href: '/ai-tools/image/enhance'
  },
  {
    id: 'edit',
    name: 'Редактирование',
    description: 'Редактируйте изображения с помощью AI',
    icon: Paintbrush,
    href: '/ai-tools/image/edit'
  },
  {
    id: 'remove',
    name: 'Удаление объектов',
    description: 'Удаляйте нежелательные объекты с фотографий',
    icon: Eraser,
    href: '/ai-tools/image/remove'
  },
  {
    id: 'background',
    name: 'Замена фона',
    description: 'Автоматически заменяйте фон на изображениях',
    icon: Layers,
    href: '/ai-tools/image/background',
    isNew: true
  },
  {
    id: 'style',
    name: 'Перенос стиля',
    description: 'Применяйте художественные стили к фотографиям',
    icon: Palette,
    href: '/ai-tools/image/style'
  },
  {
    id: 'crop',
    name: 'Умная обрезка',
    description: 'AI автоматически определит лучшую композицию',
    icon: Frame,
    href: '/ai-tools/image/crop'
  },
  {
    id: 'restore',
    name: 'Реставрация фото',
    description: 'Восстанавливайте старые и поврежденные фотографии',
    icon: ScanLine,
    href: '/ai-tools/image/restore'
  }
];

export function ImageToolGrid() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Инструменты для работы с изображениями</h1>
        <p className="text-sm text-muted-foreground">
          Используйте AI для создания и редактирования изображений
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          
          return (
            <Card
              key={tool.id}
              className="p-6 cursor-pointer shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
              onClick={() => router.push(tool.href)}
            >
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-[#FFF3ED] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{tool.name}</h3>
                    {tool.isNew && (
                      <Badge variant="secondary" className="bg-[#FFF3ED] text-[#FF6B00] hover:bg-[#FFE4D6]">
                        Новое
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}