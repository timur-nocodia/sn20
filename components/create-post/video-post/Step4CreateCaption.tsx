"use client";

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Step4CreateCaptionProps {
  onBack: () => void;
  onNext: () => void;
  script: string;
  caption: string;
  setCaption: (caption: string) => void;
}

export default function Step4CreateCaption({
  onBack,
  onNext,
  script,
  caption,
  setCaption,
}: Step4CreateCaptionProps) {
  const [showAiModal, setShowAiModal] = useState(false);
  const [mainIdea, setMainIdea] = useState('');
  const [cta, setCta] = useState('');

  const handleGenerate = () => {
    const generatedCaption = `🎥 ${mainIdea || 'Новое видео!'}\n\n${cta ? `\n${cta}` : ''}`;
    setCaption(generatedCaption);
    setShowAiModal(false);
  };

  const handleAiSuggestion = (field: 'mainIdea' | 'cta') => {
    const suggestions = {
      mainIdea: "Делюсь эффективными способами управления временем, которые помогут вам повысить продуктивность и достичь большего!",
      cta: "Ставьте лайк и подписывайтесь на канал, чтобы не пропустить новые полезные видео о продуктивности! 👍✨",
    };

    if (field === 'mainIdea') {
      setMainIdea(suggestions.mainIdea);
    } else {
      setCta(suggestions.cta);
    }
  };

  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              ← Назад
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Создайте описание</h2>
              <p className="text-sm text-muted-foreground">
                Добавьте описание к вашему видео
              </p>
            </div>
          </div>
          <Button onClick={onNext} disabled={!caption.trim()}>
            Далее →
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Script Section */}
          <Card className="flex flex-col overflow-hidden">
            <div className="p-6 pb-2">
              <h3 className="text-lg font-semibold">Сценарий</h3>
            </div>
            <div className="flex-1 p-6 pt-2">
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <div className="pr-4 whitespace-pre-wrap text-sm text-muted-foreground">
                  {script}
                </div>
              </ScrollArea>
            </div>
          </Card>

          {/* Caption Section */}
          <Card className="flex flex-col overflow-hidden">
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Описание</h3>
                <Button
                  variant="outline"
                  onClick={() => setShowAiModal(true)}
                  className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary hover:text-primary"
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Сгенерировать с AI
                </Button>
              </div>
            </div>
            <div className="flex-1 p-6 pt-2">
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Добавьте описание к вашему видео..."
                className="h-[calc(100vh-20rem)] resize-none bg-background border border-input"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* AI Generation Modal */}
      <Dialog open={showAiModal} onOpenChange={setShowAiModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Генерация описания</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Основная идея</Label>
              <div className="relative">
                <Textarea
                  value={mainIdea}
                  onChange={(e) => setMainIdea(e.target.value)}
                  placeholder="Опишите основную идею видео (необязательно)"
                  className="resize-none pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                  onClick={() => handleAiSuggestion('mainIdea')}
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Призыв к действию (CTA)</Label>
              <div className="relative">
                <Textarea
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  placeholder="Добавьте призыв к действию (необязательно)"
                  className="resize-none pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                  onClick={() => handleAiSuggestion('cta')}
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAiModal(false)}>
              Отмена
            </Button>
            <Button onClick={handleGenerate}>Сгенерировать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}