"use client";

import { Bell, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userName: string;
  isCreatingPost: boolean;
}

export default function Header({ userName, isCreatingPost }: HeaderProps) {
  const router = useRouter();
  const initials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {!isCreatingPost && (
              <>
                <h1 className="text-2xl font-semibold">Доброе утро, {userName}</h1>
                <p className="text-sm text-muted-foreground">Добро пожаловать в Skillnetwork, !!!взгляните на вашу активность!!! 🚀</p>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Найти"
                className="pl-10 w-64 bg-background/60 border-border/40 hover:bg-background/80 transition-colors"
              />
            </div>
            
            {!isCreatingPost && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Notifications"
                  className="hover:bg-primary/5"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                
                <Button onClick={handleCreatePost}>
                  Создать пост +
                </Button>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer select-none">
                  <Avatar>
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-inherit focus:bg-primary/5 focus:text-inherit">
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-inherit focus:bg-primary/5 focus:text-inherit">
                  Настройки
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-inherit focus:bg-primary/5 focus:text-inherit">
                  Подписка
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-inherit focus:bg-primary/5 focus:text-inherit">
                  Моя сеть
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive hover:bg-primary/5 hover:text-destructive focus:bg-primary/5 focus:text-destructive">
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}