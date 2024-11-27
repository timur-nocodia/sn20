"use client";

import { User, CreditCard, Timer, Monitor, Bell, Link, HelpCircle, AlertTriangle, BarChart } from 'lucide-react';
import { Button } from '@/ui/button';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const tabs = [
  { id: 'account', label: 'Аккаунт', icon: User },
  { id: 'subscription', label: 'Подписка', icon: CreditCard },
  { id: 'usage', label: 'Использование', icon: BarChart },
  { id: 'time', label: 'Время', icon: Timer },
  { id: 'display', label: 'Отображение', icon: Monitor },
  { id: 'notifications', label: 'Уведомления', icon: Bell },
  { id: 'integrations', label: 'Интеграции', icon: Link },
  { id: 'support', label: 'Поддержка', icon: HelpCircle },
  { id: 'danger', label: 'Опасная зона', icon: AlertTriangle }
];

export default function SettingsTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'account';

  const handleTabChange = (tabId: string) => {
    router.push(`${pathname}?tab=${tabId}`);
  };

  return (
    <div className="w-64 space-y-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            variant={currentTab === tab.id ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start',
              tab.id === 'danger' && 'text-destructive'
            )}
            onClick={() => handleTabChange(tab.id)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}