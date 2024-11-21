"use client";

import { Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddSocialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const socialNetworks = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: '#DD2A7B',
    gradient: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    description: 'Публикуйте фото, видео и сторис'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
    gradient: 'bg-[#1877F2]',
    description: 'Делитесь постами и видео'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
    gradient: 'bg-[#FF0000]',
    description: 'Загружайте и планируйте видео'
  }
];

export default function AddSocialDialog({ open, onOpenChange }: AddSocialDialogProps) {
  const handleConnect = (networkId: string) => {
    // Handle connection
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Подключить социальную сеть</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {socialNetworks.map((network) => {
            const Icon = network.icon;
            
            return (
              <Card
                key={network.id}
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
                onClick={() => handleConnect(network.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${network.gradient} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{network.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {network.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}