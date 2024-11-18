"use client";

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AiGenerationModal from './AiGenerationModal';

interface Step1CreateTextProps {
  onBack: () => void;
  onNext: () => void;
  content: string;
  setContent: (content: string) => void;
}

export default function Step1CreateText({ 
  onBack, 
  onNext,
  content,
  setContent 
}: Step1CreateTextProps) {
  const [showAiModal, setShowAiModal] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={onBack}
            >
              ← Назад
            </Button>
            <h2 className="text-lg font-semibold">Создайте текст для поста</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAiModal(true)}
              className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary hover:text-primary"
              disabled={!!content}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Сгенерировать с AI
            </Button>
            <Button 
              onClick={onNext}
              disabled={!content.trim()}
            >
              Далее →
            </Button>
          </div>
        </div>

        <Textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="О чем вы хотите рассказать?"
          className="min-h-[200px] resize-none border-none text-lg focus-visible:ring-0"
        />
      </div>

      <AiGenerationModal 
        open={showAiModal} 
        onOpenChange={setShowAiModal}
        onSelect={setContent}
      />
    </>
  );
}