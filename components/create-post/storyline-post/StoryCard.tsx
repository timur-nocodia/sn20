"use client";

import { useState } from 'react';
import { GripVertical, Trash2, Wand2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import type { Story } from './types';

interface StoryCardProps {
  story: Story;
  index: number;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDelete: () => void;
  isDragging?: boolean;
  isDragTarget?: boolean;
}

const stages = [
  { value: 'intro', label: 'Интро' },
  { value: 'problem', label: 'Проблема' },
  { value: 'solution', label: 'Решение' },
  { value: 'cta', label: 'Призыв к действию' },
  { value: 'custom', label: 'Свой этап' }
];

const interactionTypes = [
  { value: 'poll', label: 'Опрос' },
  { value: 'qa', label: 'Вопрос и ответ' },
  { value: 'reaction', label: 'Стикер с реакцией' },
  { value: 'quiz', label: 'Тест/Викторина' },
  { value: 'vote', label: 'Голосование' },
  { value: 'countdown', label: 'Обратный отсчет' },
  { value: 'link', label: 'Ссылка' },
  { value: 'location', label: 'Геолокация' }
];

const aiSuggestions = {
  intro: 'Привет! 👋 Сегодня поговорим о важной теме...',
  problem: 'Знакомая ситуация? Многие сталкиваются с...',
  solution: 'Но есть отличное решение! Давайте разберем...',
  cta: 'Хотите узнать больше? Переходите по ссылке...',
  custom: 'Ваш текст здесь...'
};

export default function StoryCard({
  story,
  index,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDelete,
  isDragging,
  isDragTarget
}: StoryCardProps) {
  const [content, setContent] = useState(aiSuggestions[story.stage as keyof typeof aiSuggestions] || '');
  const [hasInteraction, setHasInteraction] = useState(story.hasInteraction);
  const [interactionType, setInteractionType] = useState<string | null>(
    story.stage === 'cta' ? 'link' : 
    story.stage === 'custom' ? 'poll' : null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleAiSuggestion = () => {
    setContent(aiSuggestions[story.stage as keyof typeof aiSuggestions] || '');
  };

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete();
  };

  return (
    <>
      <Card
        className={cn(
          "p-4 cursor-move transition-all duration-200 border-b border-border/40",
          isDragging && "opacity-50 border-2 border-dashed border-primary/50 bg-primary/5 scale-[1.02]",
          isDragTarget && "border-2 border-primary animate-pulse",
          !isDragging && !isDragTarget && "hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.01]"
        )}
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-2">
            <GripVertical className={cn(
              "h-5 w-5 transition-colors duration-200",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-muted-foreground">
                  История #{index + 1}
                </div>
                <Select defaultValue={story.stage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Выберите этап" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map(stage => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите текст истории..."
                className="min-h-[100px] resize-none pr-10"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                onClick={handleAiSuggestion}
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id={`interaction-${story.id}`} 
                  checked={hasInteraction}
                  onCheckedChange={setHasInteraction}
                />
                <Label htmlFor={`interaction-${story.id}`}>Добавить интерактив</Label>
              </div>

              {hasInteraction && (
                <RadioGroup 
                  value={interactionType || ''} 
                  onValueChange={setInteractionType}
                  className="grid grid-cols-2 gap-2"
                >
                  {interactionTypes.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.value} id={`${story.id}-${type.value}`} />
                      <Label 
                        htmlFor={`${story.id}-${type.value}`}
                        className="text-sm"
                      >
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </div>
        </div>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить историю?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. История будет удалена из сторилайна.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}