"use client";

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import Image from 'next/image';

interface Step5CreateSubtitlesProps {
  onBack: () => void;
  onNext: () => void;
  selectedStyle: number | null;
  setSelectedStyle: (id: number | null) => void;
}

// Example subtitle styles
const subtitleStyles = [
  { id: 1, name: "Классический", preview: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" },
  { id: 2, name: "Минималистичный", preview: "https://images.unsplash.com/photo-1611162616305-c69b3037c7bb" },
  { id: 3, name: "Современный", preview: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb" },
  { id: 4, name: "Динамичный", preview: "https://images.unsplash.com/photo-1611162616475-46b635cb6868" },
  { id: 5, name: "Градиентный", preview: "https://images.unsplash.com/photo-1611162617263-4ec3060a058e" },
  { id: 6, name: "Неоновый", preview: "https://images.unsplash.com/photo-1611162616988-b39a2ec055fb" },
  { id: 7, name: "Ретро", preview: "https://images.unsplash.com/photo-1611162617213-7b73a4ca6f67" },
  { id: 8, name: "Футуристичный", preview: "https://images.unsplash.com/photo-1611162616988-b39a2ec055fb" },
  { id: 9, name: "Каллиграфический", preview: "https://images.unsplash.com/photo-1611162617213-7b73a4ca6f67" },
  { id: 10, name: "Рукописный", preview: "https://images.unsplash.com/photo-1611162616475-46b635cb6868" },
  { id: 11, name: "Комический", preview: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" },
  { id: 12, name: "Кинематографический", preview: "https://images.unsplash.com/photo-1611162616305-c69b3037c7bb" },
  { id: 13, name: "Анимированный", preview: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb" },
  { id: 14, name: "Креативный", preview: "https://images.unsplash.com/photo-1611162616475-46b635cb6868" },
  { id: 15, name: "Элегантный", preview: "https://images.unsplash.com/photo-1611162617263-4ec3060a058e" },
];

export default function Step5CreateSubtitles({
  onBack,
  onNext,
  selectedStyle,
  setSelectedStyle
}: Step5CreateSubtitlesProps) {
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
              <h2 className="text-lg font-semibold">Выберите стиль субтитров</h2>
              <p className="text-sm text-muted-foreground">
                Выберите подходящий стиль для субтитров вашего видео
              </p>
            </div>
          </div>
          <Button onClick={onNext} disabled={selectedStyle === null}>
            Далее →
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            {subtitleStyles.map((style) => (
              <div
                key={style.id}
                className={`relative p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                  selectedStyle === style.id
                    ? 'bg-primary/10 ring-2 ring-primary'
                    : 'hover:bg-primary/5'
                }`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className="relative aspect-[2/3] w-32 rounded-lg overflow-hidden mb-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={style.preview}
                      alt={style.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  {selectedStyle === style.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  {/* Animated subtitle preview overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-4">
                    <div
                      className={`text-white text-sm font-medium ${
                        style.id === selectedStyle ? 'opacity-100' : 'opacity-80'
                      }`}
                    >
                      Пример субтитров
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-center">{style.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Card>
  );
}