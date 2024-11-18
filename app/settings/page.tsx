"use client";

import Sidebar from '@/components/sidebar';
import SettingsTabs from '@/components/settings/settings-tabs';
import SettingsContent from '@/components/settings/settings-content';

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Настройки</h1>
            <p className="text-sm text-muted-foreground">
              Настройте приложение под себя
            </p>
          </div>

          <div className="flex gap-6">
            <SettingsTabs />
            <SettingsContent />
          </div>
        </div>
      </main>
    </div>
  );
}