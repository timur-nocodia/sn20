"use client";

import { useState, KeyboardEvent } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Badge } from '@/ui/badge';
import { Card } from '@/ui/card';
import { Wand2 } from 'lucide-react';

interface Step3HashtagGenerationProps {
  onBack: () => void;
  onNext: () => void;
  content: string;
  hashtags: string[];
  setHashtags: (hashtags: string[]) => void;
}

export default function Step3HashtagGeneration({
  onBack,
  onNext,
  content,
  hashtags,
  setHashtags
}: Step3HashtagGenerationProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newHashtag = inputValue.trim().startsWith('#') 
        ? inputValue.trim() 
        : `#${inputValue.trim()}`;
      if (!hashtags.includes(newHashtag)) {
        setHashtags([...hashtags, newHashtag]);
      }
      setInputValue('');
    }
  };

  const removeHashtag = (hashtagToRemove: string) => {
    setHashtags(hashtags.filter(tag => tag !== hashtagToRemove));
  };

  const handleAiSuggestion = () => {
    // Example AI-generated hashtags based on content
    const suggestedHashtags = [
      "#skillnetwork",
      "#socialmedia",
      "#contentcreation",
      "#marketing",
      "#smm"
    ];
    const uniqueHashtags = Array.from(new Set([...hashtags, ...suggestedHashtags]));
    setHashtags(uniqueHashtags);
  };

  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={onBack}
            >
              ← Назад
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Добавьте хэштеги</h2>
              <p className="text-sm text-muted-foreground">
                Нажмите Enter, чтобы добавить хэштег
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleAiSuggestion}
              className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary hover:text-primary"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Сгенерировать хэштеги
            </Button>
            <Button onClick={onNext}>
              Далее →
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите хэштег и нажмите Enter"
              className="w-full"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/10"
                onClick={() => removeHashtag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}