import { 
  LayoutDashboard, 
  BarChart, 
  PenSquare, 
  Calendar, 
  Grid, 
  FolderOpen,
  Share2,
  Settings,
  HelpCircle,
  GraduationCap,
  Network,
  Sparkles,
  MessageSquareMore
} from 'lucide-react';

export const menuItems = [
  { section: 'ОБЗОР', items: [
    { icon: LayoutDashboard, label: 'Дашборд', href: '/' },
    { icon: BarChart, label: 'Аналитика', href: '/analytics' },
  ]},
  { section: 'КОНТЕНТ', items: [
    { icon: PenSquare, label: 'Создать', href: '/create-post' },
    { icon: MessageSquareMore, label: 'Чат с ИИ', href: '/ai-chat' },
    { icon: Sparkles, label: 'Инструменты ИИ', hasSubmenu: true },
    { icon: Calendar, label: 'Контент план', href: '/content-plan' },
    { icon: Grid, label: 'Посты', href: '/posts' },
    { icon: FolderOpen, label: 'Медиа библиотека', href: '/media' },
  ]},
  { section: 'НАСТРОЙКИ', items: [
    { icon: Share2, label: 'Социальные сети', href: '/socials' },
    { icon: Network, label: 'Моя сеть', href: '/network' },
    { icon: Settings, label: 'Настройки', href: '/settings' },
  ]},
  { section: 'ПОМОЩЬ', items: [
    { icon: HelpCircle, label: 'Поддержка', href: '/support' },
    { icon: GraduationCap, label: 'SN Академия', href: '/academy' },
  ]},
];