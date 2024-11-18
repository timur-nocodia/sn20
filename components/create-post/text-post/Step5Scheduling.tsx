"use client";

import { useState } from 'react';
import { Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import PublishSuccess from './PublishSuccess';

interface Step5SchedulingProps {
  onBack: () => void;
  onNext: () => void;
}

interface NetworkSchedule {
  date?: Date;
  time: string;
}

interface Network {
  id: string;
  name: string;
  icon: typeof Instagram;
  enabled: boolean;
  schedule: NetworkSchedule;
  color?: string;
  gradient?: string;
  bestHours?: number[];
}

const socialNetworks: Network[] = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: Instagram, 
    color: '#DD2A7B',
    gradient: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    enabled: true,
    schedule: { time: '12:00' },
    bestHours: [9, 12, 15, 18]
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: Facebook, 
    color: '#1877F2',
    gradient: 'bg-[#1877F2]',
    enabled: false,
    schedule: { time: '12:00' },
    bestHours: [8, 11, 14, 17]
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: Youtube, 
    color: '#FF0000',
    gradient: 'bg-[#FF0000]',
    enabled: false,
    schedule: { time: '12:00' },
    bestHours: [11, 14, 17, 20]
  }
];

export default function Step5Scheduling({ onBack, onNext }: Step5SchedulingProps) {
  const [networks, setNetworks] = useState<Network[]>(socialNetworks);
  const [activeNetwork, setActiveNetwork] = useState<string>('instagram');
  const [isScheduled, setIsScheduled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleNetwork = (networkId: string) => {
    setNetworks(prev => 
      prev.map(network => 
        network.id === networkId 
          ? { ...network, enabled: !network.enabled }
          : network
      )
    );
    if (!networks.find(n => n.id === networkId)?.enabled) {
      setActiveNetwork(networkId);
    }
  };

  const updateNetworkSchedule = (networkId: string, update: Partial<{ date: Date | undefined; time: string }>) => {
    setNetworks(prev =>
      prev.map(network =>
        network.id === networkId
          ? {
              ...network,
              schedule: {
                ...network.schedule,
                ...update
              }
            }
          : network
      )
    );
  };

  const getBestHoursData = () => {
    const data = Array(24).fill(0);
    const activeNet = networks.find(n => n.id === activeNetwork);
    
    if (activeNet?.enabled && activeNet?.bestHours) {
      activeNet.bestHours.forEach(hour => {
        data[hour] = 1;
      });
    }
    
    return data;
  };

  const handlePublish = () => {
    if (!isScheduled) {
      setShowSuccess(true);
    } else {
      onNext();
    }
  };

  const isValidSchedule = () => {
    if (!isScheduled) return networks.some(n => n.enabled);
    return networks.every(network => 
      !network.enabled || (network.schedule?.date && network.schedule?.time)
    );
  };

  if (showSuccess) {
    return <PublishSuccess onBackToDashboard={onNext} />;
  }

  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={onBack}
            >
              ← Назад
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Планирование публикации</h2>
              <p className="text-sm text-muted-foreground">
                Выберите время и социальные сети для публикации
              </p>
            </div>
          </div>
          <Button 
            onClick={handlePublish}
            disabled={!isValidSchedule()}
          >
            {isScheduled ? 'Запланировать' : 'Опубликовать'}
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex space-x-4">
          <Button
            variant={!isScheduled ? "default" : "outline"}
            onClick={() => setIsScheduled(false)}
            className="flex-1"
          >
            Опубликовать сейчас
          </Button>
          <Button
            variant={isScheduled ? "default" : "outline"}
            onClick={() => setIsScheduled(true)}
            className="flex-1"
          >
            Запланировать
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Социальные сети</h3>
            <div className="space-y-4">
              {networks.map((network) => {
                const Icon = network.icon;
                const isActive = activeNetwork === network.id;
                
                return (
                  <div 
                    key={network.id} 
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      isActive ? 'bg-primary/5 ring-2 ring-primary' : 'hover:bg-primary/5'
                    }`}
                    onClick={() => network.enabled && setActiveNetwork(network.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${network.gradient} flex items-center justify-center`}>
                          <Icon className="text-white" />
                        </div>
                        <div>
                          <Label>{network.name}</Label>
                          {network.enabled && network.schedule && isScheduled && (
                            <div className="text-sm text-muted-foreground">
                              {network.schedule.date 
                                ? format(network.schedule.date, 'dd.MM.yyyy', { locale: ru })
                                : 'Выберите дату'
                              } в {network.schedule.time}
                            </div>
                          )}
                        </div>
                      </div>
                      <Switch
                        checked={network.enabled}
                        onCheckedChange={() => toggleNetwork(network.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {isScheduled && activeNetwork && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Время публикации</h3>
              <div className="space-y-6">
                <Calendar
                  mode="single"
                  selected={networks.find(n => n.id === activeNetwork)?.schedule?.date}
                  onSelect={(date) => updateNetworkSchedule(activeNetwork, { date })}
                  className="rounded-md border"
                  locale={ru}
                />

                <div className="space-y-2">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="time"
                      value={networks.find(n => n.id === activeNetwork)?.schedule?.time || '12:00'}
                      onChange={(e) => updateNetworkSchedule(activeNetwork, { time: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {isScheduled && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Лучшее время для публикации</h3>
            <div className="h-40 flex items-end space-x-1">
              {getBestHoursData().map((value, hour) => {
                const network = networks.find(n => n.id === activeNetwork);
                const selectedTime = network?.schedule?.time;
                const isSelectedHour = selectedTime && parseInt(selectedTime) === hour;
                
                return (
                  <div
                    key={hour}
                    className="flex-1 flex flex-col items-center"
                    onClick={() => updateNetworkSchedule(activeNetwork, { 
                      time: `${hour.toString().padStart(2, '0')}:00` 
                    })}
                  >
                    <div 
                      className="w-full transition-all duration-200 rounded-t cursor-pointer"
                      style={{
                        height: `${value * 100}%`,
                        backgroundColor: network?.color || '#FF6B00',
                        opacity: isSelectedHour ? 1 : value ? 0.6 : 0.1
                      }}
                    />
                    <span className="text-xs mt-2 text-muted-foreground">
                      {hour}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}