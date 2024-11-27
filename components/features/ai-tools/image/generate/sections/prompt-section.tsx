"use client";

import { Wand2, ImageIcon } from 'lucide-react';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';

interface PromptSectionProps {
  prompt: string;
  setPrompt: (value: string) => void;
  negativePrompt: string;
  setNegativePrompt: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function PromptSection({
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
  onGenerate,
  isGenerating
}: PromptSectionProps) {
  const handlePromptEnhance = () => {
    setPrompt("Профессиональная фотография в высоком разрешении, мягкое естественное освещение, детализированная композиция с глубиной резкости");
  };

  const handleNegativePromptEnhance = () => {
    setNegativePrompt("Размытость, шум, артефакты, искажения, низкое качество, пиксели");
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Промпт</Label>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Опишите, что вы хотите увидеть на изображении..."
              className="min-h-[100px] resize-y pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
              onClick={handlePromptEnhance}
            >
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Негативный промпт</Label>
          <div className="relative">
            <Textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="Опишите, что вы НЕ хотите видеть на изображении..."
              className="min-h-[100px] resize-y pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
              onClick={handleNegativePromptEnhance}
            >
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating}
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          {isGenerating ? 'Генерация...' : 'Сгенерировать'}
        </Button>
      </div>
    </Card>
  );
}