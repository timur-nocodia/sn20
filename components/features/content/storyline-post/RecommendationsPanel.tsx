"use client";

import { Card } from '@/ui/card';
import { ScrollArea } from '@/ui/scroll-area';
import type { Story } from './types';

interface RecommendationsPanelProps {
  stories: Story[];
}

export default function RecommendationsPanel({ stories }: RecommendationsPanelProps) {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-medium mb-2">Логика связки</h3>
        <p className="text-sm text-muted-foreground">
          Для достижения вашей цели мы предлагаем использовать последовательность из этапов &quot;Интро&quot;, &quot;Проблема&quot;, &quot;Решение&quot;, &quot;Призыв к действию&quot;. Эта связка поможет постепенно вовлечь аудиторию и мотивировать её к нужному действию.
        </p>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium mb-2">Рекомендации по публикации</h3>
        <p className="text-sm text-muted-foreground">
          Чтобы достичь максимальной вовлеченности, рекомендуем публиковать первую историю утром, а остальные с интервалом в 3-4 часа. Повторите цикл на протяжении недели, чтобы усилить эффект.
        </p>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium mb-2">Советы по контенту</h3>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Интро</h4>
              <p className="text-sm text-muted-foreground">
                Начните с яркого заявления или вопроса, который сразу привлечет внимание аудитории.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Проблема</h4>
              <p className="text-sm text-muted-foreground">
                Опишите проблему или потребность, с которой сталкивается ваша аудитория. Используйте реальные примеры.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Решение</h4>
              <p className="text-sm text-muted-foreground">
                Представьте ваше решение как ответ на проблему. Подчеркните основные преимущества.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Призыв к действию</h4>
              <p className="text-sm text-muted-foreground">
                Завершите четким призывом к действию. Используйте интерактивные элементы для повышения вовлеченности.
              </p>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}