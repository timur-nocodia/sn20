"use client";

export default function RecommendationsPanel() {
  return (
    <div className="text-sm text-muted-foreground space-y-2">
      <p>
        Рекомендуем публиковать первую историю утром (9:00-11:00), когда аудитория наиболее активна.
        Следующие истории лучше публиковать с интервалом в 3-4 часа для поддержания вовлеченности.
      </p>
      <p>
        Для выбранных соцсетей оптимальное время публикации:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Instagram: 9:00-11:00, 13:00-15:00, 19:00-21:00</li>
        <li>Facebook: 12:00-15:00, 18:00-20:00</li>
        <li>YouTube: 14:00-16:00, 17:00-19:00</li>
      </ul>
    </div>
  );
}