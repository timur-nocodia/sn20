"use client";

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import AiGenerationModal from './AiGenerationModal';
import Step2CreateImage from './Step2CreateImage';
import Step3HashtagGeneration from './Step3HashtagGeneration';
import Step4Review from './Step4Review';
import Step5Scheduling from './Step5Scheduling';

interface TextPostProps {
  onBack: () => void;
  initialDate?: Date;
  initialTime?: string;
}

export default function TextPost({ 
  onBack,
  initialDate,
  initialTime
}: TextPostProps) {
  const [step, setStep] = useState(1);
  const [showAiModal, setShowAiModal] = useState(false);
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

  const handleImageSelect = (images: string[]) => {
    setSelectedImages(images);
    handleNext();
  };

  if (step === 2) {
    return (
      <Step2CreateImage
        onBack={handleBack}
        onNext={handleImageSelect}
      />
    );
  }

  if (step === 3) {
    return (
      <Step3HashtagGeneration
        onBack={handleBack}
        onNext={handleNext}
        content={content}
        hashtags={hashtags}
        setHashtags={setHashtags}
      />
    );
  }

  if (step === 4) {
    return (
      <Step4Review
        onBack={handleBack}
        onNext={handleNext}
        content={content}
        images={selectedImages}
        hashtags={hashtags}
      />
    );
  }

  if (step === 5) {
    return (
      <Step5Scheduling
        onBack={handleBack}
        onNext={handleNext}
      />
    );
  }

  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={handleBack}
            >
              ← Назад
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Создайте текст для поста</h2>
              <p className="text-sm text-muted-foreground">
                Напишите текст для вашего поста
              </p>
            </div>
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
              onClick={handleNext}
              disabled={!content.trim()}
            >
              Далее →
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="О чем вы хотите рассказать?"
          className="min-h-[400px] resize-none bg-background border border-input"
        />
      </div>

      <AiGenerationModal 
        open={showAiModal} 
        onOpenChange={setShowAiModal}
        onSelect={setContent}
      />
    </Card>
  );
}