export interface StoryStyle {
  font?: string;
  textColor?: string;
  backgroundColor?: string;
  fontSize?: 'small' | 'medium' | 'large';
  position?: 'top' | 'center' | 'bottom';
  effects?: string[];
}

export interface StorySchedule {
  date?: Date;
  time?: string;
  networks?: string[];
}

export interface Story {
  id: string;
  stage: string;
  content: string;
  hasInteraction: boolean;
  order: number;
  background?: string;
  style?: StoryStyle;
  schedule?: StorySchedule;
}