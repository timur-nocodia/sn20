"use client";

import { MoreVertical, Plus, RefreshCw, Key, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NetworkIcon, NetworkColor } from '../content-plan/calendar/constants';

interface SocialAccountsProps {
  onAddAccount: () => void;
}

interface Account {
  id: string;
  network: 'instagram' | 'facebook' | 'youtube';
  username: string;
  fullName: string;
  avatar: string;
  addedDate: Date;
}

// Example accounts data
const accounts: Account[] = [
  {
    id: '1',
    network: 'instagram',
    username: 'timur.yessenov',
    fullName: 'Тимур Есенов',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    addedDate: new Date(2024, 0, 15)
  }
];

export default function SocialAccounts({ onAddAccount }: SocialAccountsProps) {
  const handleRefresh = (accountId: string) => {
    // Handle refresh account
  };

  const handleReauthenticate = (accountId: string) => {
    // Handle re-authenticate account
  };

  const handleRemove = (accountId: string) => {
    // Handle remove account
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {accounts.map(account => {
        const Icon = NetworkIcon[account.network];
        
        return (
          <Card
            key={account.id}
            className="aspect-square p-6 transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-10 h-10 rounded-lg ${NetworkColor[account.network]} flex items-center justify-center`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleRefresh(account.id)}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Обновить аккаунт
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleReauthenticate(account.id)}>
                    <Key className="mr-2 h-4 w-4" />
                    Переподключить
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleRemove(account.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Удалить аккаунт
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={account.avatar} alt={account.fullName} />
                <AvatarFallback className="text-xl">
                  {account.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold mb-1">{account.fullName}</h3>
              <p className="text-sm text-muted-foreground">@{account.username}</p>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-semibold">1.2K</div>
                  <div className="text-sm text-muted-foreground">Подписчики</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">156</div>
                  <div className="text-sm text-muted-foreground">Посты</div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      <Card
        className="aspect-square p-6 border-2 border-dashed cursor-pointer transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
        onClick={onAddAccount}
      >
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Добавить аккаунт</h3>
            <p className="text-sm text-muted-foreground">
              Подключите новую социальную сеть
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}