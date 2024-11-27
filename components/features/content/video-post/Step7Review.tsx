"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Progress } from '@/ui/progress';

interface Step7ReviewProps {
  onBack: () => void;
  onNext: () => void;
  script: string;
  videoUrl: string | null;
  audioUrl: string | null;
  caption: string;
  hashtags: string[];
  selectedSubtitleStyle: number | null;
}

export default function Step7Review({
  onBack,
  onNext,
  script,
  videoUrl,
  audioUrl,
  caption,
  hashtags,
  selectedSubtitleStyle
}: Step7ReviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedVideoKey, setGeneratedVideoKey] = useState<string>('');

  // Check if we need to regenerate the video based on audio or subtitle changes
  useEffect(() => {
    const newKey = `${audioUrl}-${selectedSubtitleStyle}`;
    if (generatedVideoKey && generatedVideoKey !== newKey) {
      setIsGenerated(false);
    }
  }, [audioUrl, selectedSubtitleStyle, generatedVideoKey]);

  useEffect(() => {
    if (isGenerating) {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsGenerating(false);
            setIsGenerated(true);
            setGeneratedVideoKey(`${audioUrl}-${selectedSubtitleStyle}`);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);

      const timeInterval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 0) {
            clearInterval(timeInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(timeInterval);
      };
    }
  }, [isGenerating, audioUrl, selectedSubtitleStyle]);

  const handleGenerate = () => {
    setIsGenerating(true);
  };

  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
      {/* Header */}
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              ← Назад
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Предпросмотр</h2>
              <p className="text-sm text-muted-foreground">
                Проверьте, как будет выглядеть ваш пост
              </p>
            </div>
          </div>
          {isGenerated && (
            <Button onClick={onNext}>Далее →</Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!isGenerating && !isGenerated && (
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleGenerate}
              className="min-w-[200px]"
            >
              Сгенерировать видео
            </Button>
          </div>
        )}

        {isGenerating && (
          <Card className="p-6">
            <div className="space-y-4">
              <Progress value={progress} />
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Генерация видео... {progress}%
                </p>
                <p className="text-sm font-medium">
                  Осталось примерно {remainingTime} секунд
                </p>
              </div>
            </div>
          </Card>
        )}

        {isGenerated && (
          <div className="max-w-[468px] mx-auto">
            <Card className="overflow-hidden">
              {/* Preview Header */}
              <div className="p-4 flex items-center space-x-3 border-b">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">S</span>
                </div>
                <span className="font-medium">Skillnetwork</span>
              </div>

              {/* Video Preview */}
              <div className="relative aspect-[9/16] bg-black">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    className="w-full h-full object-contain"
                    controls
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    Предпросмотр видео
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 max-h-[200px] overflow-y-auto">
                <div className="space-y-4">
                  <p className="whitespace-pre-wrap">{caption}</p>
                  {hashtags.length > 0 && (
                    <p className="text-primary">{hashtags.join(' ')}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
}