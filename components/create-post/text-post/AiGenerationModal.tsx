"use client";

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface AiGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (text: string) => void;
}

const postTypes = [
  {
    title: "Продающий пост",
    description: "Создайте готовый к публикации пост с продающим сценарием для ваших продуктов и услуг в один клик."
  },
  {
    title: "Экспертный пост",
    description: "Вовлекающая и прямая демонстрация вашей экспертности через продающий сторител"
  },
  {
    title: "Пост карусель",
    description: "Серия коротких текстовых постов, направленных на быстрый прогрев аудитории, демонстрации вашей экспертности и кейсов."
  },
  {
    title: "Пост о себе",
    description: "Текстовой пост от своего имени, вовлекающая и прямая демонстрация вашей экспертности через продающий сторител"
  },
  {
    title: "Пост в разговорном стиле",
    description: "Экспертный пост в разговорном стиле"
  }
];

const questions = [
  {
    id: 'topic',
    label: 'О чем будет ваш пост?',
    placeholder: 'Опишите основную тему или идею поста',
    aiSuggestion: 'Например: О важности правильного питания для здоровья и энергии'
  },
  {
    id: 'audience',
    label: 'Кто ваша целевая аудитория?',
    placeholder: 'Опишите вашу идеальную аудиторию',
    aiSuggestion: 'Например: Молодые профессионалы 25-35 лет, интересующиеся здоровым образом жизни'
  },
  {
    id: 'goal',
    label: 'Какова цель вашего поста?',
    placeholder: 'Чего вы хотите достичь этим постом',
    aiSuggestion: 'Например: Повысить осведомленность о важности здорового питания и привлечь клиентов на консультацию'
  },
  {
    id: 'tone',
    label: 'Какой тон повествования предпочитаете?',
    placeholder: 'Опишите желаемый стиль написания',
    aiSuggestion: 'Например: Дружелюбный и экспертный, с использованием простых примеров из жизни'
  }
];

export default function AiGenerationModal({ 
  open, 
  onOpenChange,
  onSelect 
}: AiGenerationModalProps) {
  const [step, setStep] = useState<'type' | 'questionnaire'>('type');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep('questionnaire');
  };

  const handleAiSuggestion = (questionId: string, suggestion: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: suggestion
    }));
  };

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleGenerate = () => {
    onSelect(`Generated content based on ${selectedType} and provided answers...`);
    onOpenChange(false);
    setStep('type');
    setSelectedType(null);
    setAnswers({});
  };

  const handleBack = () => {
    setStep('type');
    setSelectedType(null);
    setAnswers({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {step === 'type' ? 'Выберите тип поста' : selectedType}
          </DialogTitle>
        </DialogHeader>

        {step === 'type' ? (
          <div className="grid gap-4">
            {postTypes.map((type, index) => (
              <Card 
                key={index}
                className="p-4 cursor-pointer shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
                onClick={() => handleTypeSelect(type.title)}
              >
                <h3 className="font-semibold mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <Label>{question.label}</Label>
                  <div className="relative">
                    <Textarea
                      value={answers[question.id] || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      placeholder={question.placeholder}
                      className="min-h-[80px] resize-none pr-10"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                      onClick={() => handleAiSuggestion(question.id, question.aiSuggestion)}
                    >
                      <Wand2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
              >
                Назад
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={Object.keys(answers).length === 0}
              >
                Сгенерировать
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}