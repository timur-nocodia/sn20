"use client";

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from 'lucide-react';

interface Partner {
  id: string;
  email: string;
  telegram: string;
  registrationDate: string;
  status: string;
  subscriptionEnd?: string;
  personalTurnover: number;
  structureTurnover: number;
  structureSize: number;
  level: number;
  hasChildren?: boolean;
}

const partners: Partner[] = [
  {
    id: "6",
    email: "aleksandrbekk@bk.ru",
    telegram: "aleksandrbekk",
    registrationDate: "29.04.2024 16:05",
    status: "Партнер +",
    subscriptionEnd: "09.01.2025 01:31 UTC",
    personalTurnover: 0,
    structureTurnover: 16260,
    structureSize: 6737,
    level: 5,
    hasChildren: true
  },
  {
    id: "14",
    email: "atomy.rok@gmail.com",
    telegram: "",
    registrationDate: "15.03.2024 21:11",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 19,
    level: 1,
    hasChildren: true
  },
  {
    id: "639",
    email: "tatjana-20-88@mail.ru",
    telegram: "",
    registrationDate: "10.07.2024 18:59",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 2,
    level: 1,
    hasChildren: true
  },
  {
    id: "3373",
    email: "10031992agent@mail.ru",
    telegram: "",
    registrationDate: "04.09.2024 04:14",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "738",
    email: "ko.oksana1978@mail.ru",
    telegram: "",
    registrationDate: "11.07.2024 21:17",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "739",
    email: "tikky.95@internet.ru",
    telegram: "",
    registrationDate: "11.07.2024 21:20",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "767",
    email: "stulen1989@gmail.com",
    telegram: "",
    registrationDate: "12.07.2024 17:29",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "801",
    email: "annaatomy23@yandex.ru",
    telegram: "",
    registrationDate: "13.07.2024 19:11",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "868",
    email: "pomoshnitssax@gmail.com",
    telegram: "",
    registrationDate: "15.07.2024 21:04",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "869",
    email: "olka.gera@mail.ru",
    telegram: "",
    registrationDate: "15.07.2024 21:17",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "970",
    email: "missis.samaya2013@gmail.com",
    telegram: "",
    registrationDate: "18.07.2024 19:47",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "1010",
    email: "vodovat@gmail.com",
    telegram: "",
    registrationDate: "20.07.2024 00:56",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 2,
    level: 1,
    hasChildren: true
  },
  {
    id: "1025",
    email: "olgakabla@gmail.com",
    telegram: "",
    registrationDate: "20.07.2024 18:41",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "1297",
    email: "bastrmsch@mail.ru",
    telegram: "",
    registrationDate: "21.07.2024 16:55",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  },
  {
    id: "1411",
    email: "zhuzhik17@gmail.com",
    telegram: "",
    registrationDate: "23.07.2024 12:29",
    status: "Зарегистрированный",
    personalTurnover: 0,
    structureTurnover: 0,
    structureSize: 1,
    level: 1
  }
];

export default function NetworkLevels() {
  return (
    <Card className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telegram</TableHead>
            <TableHead>Дата регистрации</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Окончание подписки</TableHead>
            <TableHead>Личный оборот</TableHead>
            <TableHead>Оборот структуры</TableHead>
            <TableHead>Размер структуры</TableHead>
            <TableHead>Уровень</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.id} className="group cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-1">
                  {partner.hasChildren && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{partner.id}</span>
                </div>
              </TableCell>
              <TableCell>{partner.email}</TableCell>
              <TableCell>{partner.telegram}</TableCell>
              <TableCell>{partner.registrationDate}</TableCell>
              <TableCell>{partner.status}</TableCell>
              <TableCell>{partner.subscriptionEnd || '-'}</TableCell>
              <TableCell>{partner.personalTurnover}</TableCell>
              <TableCell>{partner.structureTurnover}</TableCell>
              <TableCell>{partner.structureSize}</TableCell>
              <TableCell>Level {partner.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}