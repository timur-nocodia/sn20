"use client";

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/ui/button';
import { Textarea } from '@/ui/textarea';
import { Card } from '@/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/ui/dialog';
import { Label } from '@/ui/label';

interface Step1CreateScriptProps {
  onBack: () => void;
  onNext: () => void;
  script: string;
  setScript: (script: string) => void;
}

const scriptTypes = [
  {
    title: "Обучающее видео",
    description: "Пошаговое объяснение процесса или концепции с визуальными примерами"
  },
  {
    title: "Продуктовая демонстрация",
    description: "Презентация продукта или услуги с акцентом на преимущества и особенности"
  },
  {
    title: "Экспертное интервью",
    description: "Диалог с экспертом в формате вопрос-ответ по актуальной теме"
  },
  {
    title: "История успеха",
    description: "Рассказ о достижениях и результатах с реальными примерами"
  },
  {
    title: "Развлекательный контент",
    description: "Креативный и engaging контент для привлечения внимания аудитории"
  }
];

const questions = [
  {
    id: 'topic',
    label: 'Основная тема видео',
    placeholder: 'О чем будет ваше видео?',
    aiSuggestion: 'Например: 5 эффективных способов управления временем для предпринимателей'
  },
  {
    id: 'target',
    label: 'Целевая аудитория',
    placeholder: 'Для кого предназначено видео?',
    aiSuggestion: 'Например: Начинающие предприниматели 25-35 лет, которые хотят улучшить свою продуктивность'
  },
  {
    id: 'keyPoints',
    label: 'Ключевые моменты',
    placeholder: 'Какие основные пункты нужно осветить?',
    aiSuggestion: 'Например: 1. Планирование дня 2. Приоритизация задач 3. Делегирование 4. Техники фокусировки'
  },
  {
    id: 'style',
    label: 'Стиль повествования',
    placeholder: 'Какой тон и стиль видео?',
    aiSuggestion: 'Например: Профессиональный, но дружелюбный, с практическими примерами из жизни'
  }
];

export default function Step1CreateScript({
  onBack,
  onNext,
  script,
  setScript
}: Step1CreateScriptProps) {
  const [showAiModal, setShowAiModal] = useState(false);
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

  const handleGenerate = () => {
    // Here you would typically make an API call to generate the script
    // For now, we'll simulate it with a template
    const generatedScript = `
# ${answers.topic || 'Название видео'}

## Целевая аудитория
${answers.target || 'Описание аудитории'}

## Ключевые моменты
${answers.keyPoints || 'Основные пункты'}

## Стиль
${answers.style || 'Стиль повествования'}

## Сценарий
[Вступление]
- Приветствие и представление
- Обозначение проблемы
- Что зритель узнает из видео

[Основная часть]
- Пункт 1: Описание и примеры
- Пункт 2: Описание и примеры
- Пункт 3: Описание и примеры

[Заключение]
- Подведение итогов
- Призыв к действию
    `;

    setScript(generatedScript);
    setShowAiModal(false);
    setStep('type');
    setSelectedType(null);
    setAnswers({});
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
              <h2 className="text-lg font-semibold">Создайте сценарий</h2>
              <p className="text-sm text-muted-foreground">
                Напишите сценарий для вашего видео
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAiModal(true)}
              className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary hover:text-primary"
              disabled={!!script}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Сгенерировать с AI
            </Button>
            <Button 
              onClick={onNext}
              disabled={!script.trim()}
            >
              Далее →
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Textarea 
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Начните писать сценарий для вашего видео..."
          className="min-h-[400px] resize-none bg-background border border-input"
        />
      </div>

      <Dialog open={showAiModal} onOpenChange={setShowAiModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {step === 'type' ? 'Выберите тип видео' : selectedType}
            </DialogTitle>
          </DialogHeader>

          {step === 'type' ? (
            <div className="grid gap-4">
              {scriptTypes.map((type, index) => (
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
                        onChange={(e) => setAnswers(prev => ({
                          ...prev,
                          [question.id]: e.target.value
                        }))}
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
                  onClick={() => setStep('type')}
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
    </Card>
  );
}