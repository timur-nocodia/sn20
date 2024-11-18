"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function AccountSettings() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Профиль</h2>
          <p className="text-sm text-muted-foreground">
            Управляйте своим профилем
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button>Изменить фото</Button>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Имя</Label>
            <Input placeholder="Ваше имя" />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" placeholder="example@email.com" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Сохранить изменения</Button>
        </div>
      </div>
    </Card>
  );
}