"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';

const inspirationItems = [
  {
    category: "Семья",
    text: "Проводить время с семьей - одно из самых приятных занятий. Мы любим играть в настольные игры и готовить вместе..."
  },
  {
    category: "Технологии",
    text: "Искусственный интеллект меняет нашу жизнь каждый день. Вот 5 способов, как ИИ может помочь в повседневных задачах..."
  },
  {
    category: "Здоровье",
    text: "Утренняя зарядка - ключ к продуктивному дню. Делюсь своими любимыми упражнениями, которые занимают всего 10 минут..."
  },
  {
    category: "Бизнес",
    text: "Малый бизнес - основа экономики. Сегодня поговорим о том, как начать свое дело с минимальными вложениями..."
  },
  {
    category: "Путешествия",
    text: "Исследовать новые места можно даже в своем городе. Делюсь секретными местами, о которых знают немногие..."
  }
];

export function InspirationCard() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % inspirationItems.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + inspirationItems.length) % inspirationItems.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  return (
    <Card className="col-span-2 p-6 shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-12 w-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
          <div className="text-2xl">💡</div>
        </div>
        <div>
          <h3 className="font-semibold">Вдохновись</h3>
          <p className="text-sm text-muted-foreground">
            Выберите готовую идею для публикации, сгенерированную Ai
          </p>
        </div>
      </div>

      <div className="relative px-8">
        <div className="overflow-hidden">
          <div 
            className="transition-transform duration-300 ease-in-out flex"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {inspirationItems.map((item, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 rounded-lg p-4 border border-border/40 transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
              >
                <div className="text-sm font-medium mb-2">{item.category}</div>
                <p className="text-sm text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={handleCreatePost}>
          Создать пост
        </Button>
      </div>
    </Card>
  );
}