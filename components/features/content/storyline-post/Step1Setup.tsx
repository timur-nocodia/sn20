"use client";

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Slider } from '@/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/ui/dialog";

interface Step1SetupProps {
  onBack: () => void;
  onNext: () => void;
  topic: string;
  setTopic: (topic: string) => void;
  kpi: string;
  setKpi: (kpi: string) => void;
  storiesPerDay: number;
  setStoriesPerDay: (count: number) => void;
}

const kpiOptions = [
  { value: 'engagement', label: 'Повысить вовлеченность' },
  { value: 'reach', label: 'Увеличить охват' },
  { value: 'traffic', label: 'Привести трафик на сайт' },
  { value: 'followers', label: 'Привлечь новых подписчиков' },
  { value: 'sales', label: 'Увеличить продажи' },
  { value: 'other', label: 'Другое' }
];

const toneOptions = [
  { value: 'professional', label: 'Профессиональный' },
  { value: 'casual', label: 'Разговорный' },
  { value: 'friendly', label: 'Дружелюбный' },
  { value: 'humorous', label: 'С юмором' },
  { value: 'educational', label: 'Обучающий' }
];

export default function Step1Setup({ onBack, onNext, topic, setTopic, kpi, setKpi, storiesPerDay, setStoriesPerDay }: Step1SetupProps) {
  const [showAiModal, setShowAiModal] = useState(false);
  const [customKpi, setCustomKpi] = useState('');
  const [answers, setAnswers] = useState({
    topic: '',
    audience: '',
    tone: ''
  });

  const handleTopicAiSuggestion = () => {
    setTopic("Серия историй о том, как правильное питание влияет на продуктивность и энергию в течение дня");
  };

  const handleAiSuggestion = (field: keyof typeof answers) => {
    const suggestions = {
      topic: "Серия историй о том, как правильное питание влияет на продуктивность и энергию в течение дня",
      audience: "Молодые профессионалы 25-35 лет, интересующиеся здоровым образом жизни и саморазвитием",
      tone: "friendly"
    };
    
    setAnswers(prev => ({
      ...prev,
      [field]: suggestions[field]
    }));
  };

  const handleGenerate = () => {
    setTopic(answers.topic);
    setShowAiModal(false);
  };

  const handleKpiChange = (value: string) => {
    setKpi(value);
    if (value !== 'other') {
      setCustomKpi('');
    }
  };

  const getEffectiveKpi = () => {
    return kpi === 'other' ? customKpi : kpi;
  };

  return (
    <>
      <div className="space-y-6">
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
                <h2 className="text-lg font-semibold">Создайте сторилайн</h2>
                <p className="text-sm text-muted-foreground">
                  Настройте параметры вашей серии историй
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAiModal(true)}
                className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary hover:text-primary"
                disabled={!getEffectiveKpi()}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Сгенерировать с AI
              </Button>
              <Button 
                onClick={onNext}
                disabled={!topic || !getEffectiveKpi()}
              >
                Далее →
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>О чем вы хотите рассказать в связке историй?</Label>
                <div className="relative">
                  <Textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Опишите основную тему или задачу сторилайна..."
                    className="min-h-[100px] resize-none pr-10"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                    onClick={handleTopicAiSuggestion}
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Выберите цель (KPI)</Label>
                <Select value={kpi} onValueChange={handleKpiChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите основную цель" />
                  </SelectTrigger>
                  <SelectContent>
                    {kpiOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {kpi === 'other' && (
                  <Input
                    value={customKpi}
                    onChange={(e) => setCustomKpi(e.target.value)}
                    placeholder="Введите свою цель..."
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Количество историй в день</Label>
                  <span className="text-sm font-medium">{storiesPerDay}</span>
                </div>
                <Slider
                  value={[storiesPerDay]}
                  onValueChange={(value) => setStoriesPerDay(value[0])}
                  min={3}
                  max={15}
                  step={1}
                />
                <p className="text-sm text-muted-foreground">
                  Количество историй влияет на интенсивность кампании и уровень вовлеченности аудитории
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showAiModal} onOpenChange={setShowAiModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Генерация сторилайна</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Тема сторилайна</Label>
              <div className="relative">
                <Textarea
                  value={answers.topic}
                  onChange={(e) => setAnswers({ ...answers, topic: e.target.value })}
                  placeholder="О чем будет ваша серия историй?"
                  className="min-h-[80px] resize-none pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                  onClick={() => handleAiSuggestion('topic')}
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Цель/KPI</Label>
              <Select value={kpi} onValueChange={handleKpiChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите осную цель" />
                </SelectTrigger>
                <SelectContent>
                  {kpiOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {kpi === 'other' && (
                <Input
                  value={customKpi}
                  onChange={(e) => setCustomKpi(e.target.value)}
                  placeholder="Введите свою цель..."
                  className="mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Целевая аудитория</Label>
              <div className="relative">
                <Textarea
                  value={answers.audience}
                  onChange={(e) => setAnswers({ ...answers, audience: e.target.value })}
                  placeholder="Опишите вашу целевую аудиторию..."
                  className="min-h-[80px] resize-none pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                  onClick={() => handleAiSuggestion('audience')}
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Тон повествования</Label>
              <Select 
                value={answers.tone} 
                onValueChange={(value) => setAnswers({ ...answers, tone: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите стиль коммуникации" />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowAiModal(false)}
            >
              Отмена
            </Button>
            <Button 
              onClick={handleGenerate}
              disabled={!answers.topic || !kpi || !answers.audience || !answers.tone}
            >
              Сгенерировать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}