"use client";

import { useEffect, useRef } from 'react';
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Example messages
const messages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Привет! Помоги мне написать пост о важности правильного питания.',
    timestamp: new Date(2024, 0, 15, 14, 30)
  },
  {
    id: '2',
    role: 'assistant',
    content: `Конечно! Вот структурированный пост о правильном питании:

🍎 Правильное питание - ключ к здоровью и энергии!

Знаете ли вы, что наше здоровье на 70% зависит от того, что мы едим? Давайте разберем основные принципы здорового питания:

1️⃣ Разнообразие в рационе
- Включайте продукты всех групп
- Не забывайте о сезонных овощах и фруктах
- Экспериментируйте с новыми продуктами

2️⃣ Режим питания
- Ешьте 4-5 раз в день
- Не пропускайте завтрак
- Последний прием пищи за 2-3 часа до сна

3️⃣ Правильный баланс
- 50% углеводы
- 30% белки
- 20% жиры

💡 Помните: правильное питание - это не диета, а образ жизни!

#здоровье #правильноепитание #зож`,
    timestamp: new Date(2024, 0, 15, 14, 31)
  }
];

export default function ChatMessages() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <ScrollArea ref={scrollRef} className="flex-1 p-6">
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'assistant' ? 'items-start' : 'items-start justify-end'
            } space-x-4`}
          >
            {message.role === 'assistant' && (
              <Avatar>
                <AvatarImage src="/ai-avatar.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            
            <div className={`group relative max-w-[80%] rounded-lg p-4 ${
              message.role === 'assistant' 
                ? 'bg-muted' 
                : 'bg-primary text-primary-foreground'
            }`}>
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className={`text-xs ${
                  message.role === 'assistant' ? 'text-muted-foreground' : 'text-primary-foreground/80'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
                {message.role === 'assistant' && (
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-muted-foreground"
                            onClick={() => handleCopy(message.content)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Скопировать</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-muted-foreground"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-muted-foreground"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {message.role === 'user' && (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}