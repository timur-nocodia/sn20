"use client";

import { useState } from 'react';
import { Upload, Wand2, Image as ImageIcon, Type, AlignCenter, Sparkles, Copy, TextQuote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Story } from './types';
import Image from 'next/image';

interface StoryVisualCardProps {
  story: Story;
  index: number;
  onClick: () => void;
  onUpdate: (updates: Partial<Story>) => void;
  onGenerate: () => void;
  onApplyToAll?: () => void;
  isSelected?: boolean;
}

const fonts = [
  { value: 'modern', label: 'Современный' },
  { value: 'classic', label: 'Классический' },
  { value: 'handwritten', label: 'Рукописный' },
  { value: 'minimal', label: 'Минималистичный' }
];

const positions = [
  { value: 'top', label: 'Сверху' },
  { value: 'center', label: 'По центру' },
  { value: 'bottom', label: 'Снизу' }
];

const effects = [
  { value: 'shadow', label: 'Тень' },
  { value: 'background', label: 'Фон' },
  { value: 'gradient', label: 'Градиент' },
  { value: 'outline', label: 'Обводка' }
];

type MouseEvent = React.MouseEvent<HTMLButtonElement>;

export default function StoryVisualCard({
  story,
  index,
  onUpdate,
  onGenerate,
  onApplyToAll
}: StoryVisualCardProps) {
  const [background, setBackground] = useState<string | null>(null);
  const [showApplyAllDialog, setShowApplyAllDialog] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackground(url);
      onUpdate({ background: url });
    }
  };

  return (
    <>
      <Card className="p-4 transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
        <div className="space-y-4">
          {/* Preview */}
          <div className="aspect-[9/16] bg-muted rounded-lg overflow-hidden relative">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                #{index + 1}
              </div>
            </div>

            {background ? (
              <div className="relative w-full h-full">
                <Image 
                  src={background} 
                  alt="Background"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            
            {/* Story content preview */}
            {story.content && (
              <div className={cn(
                "absolute inset-x-4",
                story.style?.position === 'top' && "top-4",
                story.style?.position === 'center' && "top-1/2 -translate-y-1/2",
                story.style?.position === 'bottom' && "bottom-4"
              )}>
                <p className={cn(
                  "text-center",
                  story.style?.font === 'modern' && "font-sans",
                  story.style?.font === 'classic' && "font-serif",
                  story.style?.font === 'handwritten' && "font-cursive",
                  story.style?.font === 'minimal' && "font-mono",
                  story.style?.effects?.includes('shadow') && "drop-shadow-lg"
                )}>
                  {story.content}
                </p>
              </div>
            )}
          </div>

          {/* Background controls */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                onGenerate();
              }}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Сгенерировать
            </Button>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id={`background-${story.id}`}
                onChange={handleFileUpload}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  document.getElementById(`background-${story.id}`)?.click();
                }}
              >
                <Upload className="mr-2 h-4 w-4" />
                Загрузить
              </Button>
            </div>
          </div>

          {/* Compact style controls */}
          <div className="flex items-center justify-between">
            <TooltipProvider>
              {/* Font selector */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1">
                    <Select 
                      value={story.style?.font} 
                      onValueChange={(value) => onUpdate({ style: { ...story.style, font: value } })}
                    >
                      <SelectTrigger className="w-full h-9 px-2">
                        <Type className="h-4 w-4" />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map(font => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Шрифт</TooltipContent>
              </Tooltip>

              {/* Position selector */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 mx-1">
                    <Select 
                      value={story.style?.position}
                      onValueChange={(value: "top" | "center" | "bottom") => 
                        onUpdate({ style: { ...story.style, position: value } })
                      }
                    >
                      <SelectTrigger className="w-full h-9 px-2">
                        <AlignCenter className="h-4 w-4" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map(position => (
                          <SelectItem key={position.value} value={position.value}>
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Расположение текста</TooltipContent>
              </Tooltip>

              {/* Font size selector */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 mx-1">
                    <Select 
                      value={story.style?.fontSize || 'medium'}
                      onValueChange={(value: "small" | "medium" | "large") => 
                        onUpdate({ style: { ...story.style, fontSize: value } })
                      }
                    >
                      <SelectTrigger className="w-full h-9 px-2">
                        <TextQuote className="h-4 w-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Маленький</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="large">Большой</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Размер текста</TooltipContent>
              </Tooltip>

              {/* Effects selector */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1">
                    <Select 
                      value={story.style?.effects?.[0] || ''}
                      onValueChange={(value) => onUpdate({ style: { ...story.style, effects: [value] } })}
                    >
                      <SelectTrigger className="w-full h-9 px-2">
                        <Sparkles className="h-4 w-4" />
                      </SelectTrigger>
                      <SelectContent>
                        {effects.map(effect => (
                          <SelectItem key={effect.value} value={effect.value}>
                            {effect.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Эффекты</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Apply to all button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              setShowApplyAllDialog(true);
            }}
          >
            <Copy className="mr-2 h-4 w-4" />
            Применить ко всем
          </Button>
        </div>
      </Card>

      <AlertDialog open={showApplyAllDialog} onOpenChange={setShowApplyAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Применить стиль ко всем историям?</AlertDialogTitle>
            <AlertDialogDescription>
              Текущий стиль будет применен ко всем историям в сторилайне. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (onApplyToAll) onApplyToAll();
                setShowApplyAllDialog(false);
              }}
            >
              Применить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}