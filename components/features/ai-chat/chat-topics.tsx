"use client";

import { useState } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { ScrollArea } from '@/ui/scroll-area';
import { cn } from '@/lib/utils';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

interface ChatTopicsProps {
  selectedTopic: string | null;
  onSelectTopic: (topicId: string | null) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface ChatTopic {
  date: string;
  chats: { id: string; title: string }[];
}

const topics: ChatTopic[] = [
  {
    "date": "Сегодня",
    "chats": [
      { "id": "1", "title": "Обновление маркетинговой стратегии" },
      { "id": "2", "title": "Разработка плана на Q4" },
      { "id": "3", "title": "Подготовка отчета по продажам" }
    ]
  },
  {
    "date": "Вчера",
    "chats": [
      { "id": "4", "title": "Генерация идей для контента" },
      { "id": "5", "title": "Оптимизация воронки продаж" }
    ]
  },
  {
    "date": "На прошлой неделе",
    "chats": [
      { "id": "6", "title": "Продвижение через таргетинг в Instagram" },
      { "id": "7", "title": "Запуск рекламной кампании в Facebook" },
      { "id": "8", "title": "Анализ конверсий по регионам" },
      { "id": "9", "title": "Разработка визуалов для Stories" }
    ]
  },
  {
    "date": "30 дней назад",
    "chats": [
      { "id": "10", "title": "Презентация нового продукта" },
      { "id": "11", "title": "Оценка успешности скидок" },
      { "id": "12", "title": "Введение автоматизации задач" }
    ]
  },
  {
    "date": "Октябрь",
    "chats": [
      { "id": "13", "title": "Отчет по росту продаж в октябре" },
      { "id": "14", "title": "Подготовка конференции" },
      { "id": "15", "title": "Обсуждение новых партнерств" },
      { "id": "16", "title": "Тестирование стратегии CPA" }
    ]
  },
  {
    "date": "Сентябрь",
    "chats": [
      { "id": "17", "title": "Анализ метрик за Q3" },
      { "id": "18", "title": "Запуск нового вебинара" },
      { "id": "19", "title": "Работа над дизайном лендинга" }
    ]
  },
  {
    "date": "Август",
    "chats": [
      { "id": "20", "title": "Тестирование нового CRM" },
      { "id": "21", "title": "Обучение команды продаж" }
    ]
  },
  {
    "date": "Июль",
    "chats": [
      { "id": "22", "title": "Реорганизация отдела маркетинга" },
      { "id": "23", "title": "Обзор рынка конкурентов" },
      { "id": "24", "title": "Запуск email-рассылки" }
    ]
  },
  {
    "date": "Июнь",
    "chats": [
      { "id": "25", "title": "Подготовка отчета для инвесторов" },
      { "id": "26", "title": "Анализ пользовательской базы" },
      { "id": "27", "title": "Итоги квартальных продаж" }
    ]
  }
];

export default function ChatTopics({ selectedTopic, onSelectTopic, isCollapsed, onToggleCollapse }: ChatTopicsProps) {
  const [search, setSearch] = useState('');

  const filteredTopics = topics.map((topic) => ({
    ...topic,
    chats: topic.chats.filter((chat) =>
      chat.title.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(topic => topic.chats.length > 0);

  if (isCollapsed) {
    return null;
  }

  return (
    <div className="border-r flex flex-col w-80 transition-all duration-300">
      <div className="p-4">
        <div className="relative">
          <Input
            placeholder="Поиск чатов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {filteredTopics.map((topic) => (
            <div key={topic.date} className="mb-3">
              {/* Date (Category Header) */}
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {topic.date}
              </h3>
              {/* Chats */}
              <div className="space-y-1">
                {topic.chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={cn(
                      "w-full flex items-center justify-between text-sm hover:bg-primary/5 rounded transition-colors font-medium px-2 py-1 group",
                      selectedTopic === chat.id && "bg-primary/10 text-primary"
                    )}
                  >
                    <button
                      className="text-left flex-1 truncate"
                      title={chat.title}
                      onClick={() => onSelectTopic(chat.id)}
                    >
                      {chat.title}
                    </button>
                    {/* Context Menu */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                          >
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Переименовать
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}