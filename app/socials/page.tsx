"use client";

import { useState } from 'react';
import Sidebar from '@/components/layout-components/sidebar';
import SocialAccounts from '@/components/features/socials/social-accounts';
import AddSocialDialog from '@/components/features/socials/add-social-dialog';

export default function SocialsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Социальные сети</h1>
            <p className="text-sm text-muted-foreground">
              Управляйте подключенными социальными сетями
            </p>
          </div>

          <SocialAccounts onAddAccount={() => setShowAddDialog(true)} />
          <AddSocialDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
        </div>
      </main>
    </div>
  );
}