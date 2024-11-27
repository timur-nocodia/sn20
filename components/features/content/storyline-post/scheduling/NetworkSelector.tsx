"use client";

import { Instagram, Facebook, Youtube } from 'lucide-react';
import { Switch } from '@/ui/switch';
import { Card } from '@/ui/card';

interface NetworkSelectorProps {
  selectedNetworks: string[];
  setSelectedNetworks: React.Dispatch<React.SetStateAction<string[]>>;
}

export const networks = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: Instagram,
    color: '#DD2A7B',
    gradient: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: Facebook,
    color: '#1877F2',
    gradient: 'bg-[#1877F2]'
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: Youtube,
    color: '#FF0000',
    gradient: 'bg-[#FF0000]'
  }
];

export default function NetworkSelector({
  selectedNetworks,
  setSelectedNetworks
}: NetworkSelectorProps) {
  const handleNetworkToggle = (networkId: string) => {
    setSelectedNetworks(prev => 
      prev.includes(networkId)
        ? prev.filter(id => id !== networkId)
        : [...prev, networkId]
    );
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Социальные сети</h3>
        <div className="flex items-center space-x-6">
          {networks.map(network => {
            const Icon = network.icon;
            const isSelected = selectedNetworks.includes(network.id);
            
            return (
              <div
                key={network.id}
                className="flex items-center space-x-3"
              >
                <div className={`w-10 h-10 rounded-lg ${network.gradient} flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{network.name}</span>
                  <Switch
                    checked={isSelected}
                    onCheckedChange={() => handleNetworkToggle(network.id)}
                    className="data-[state=checked]:bg-[var(--network-color)]"
                    style={{
                      '--network-color': network.color
                    } as any}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}