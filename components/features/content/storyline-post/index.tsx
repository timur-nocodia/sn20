"use client";

import { useState } from 'react';
import Step1Setup from './Step1Setup';
import Step2Structure from './Step2Structure';
import Step3Visuals from './Step3Visuals';
import Step4Scheduling from './Step4Scheduling';
import type { Story } from './types';

interface StorylinePostProps {
  onBack: () => void;
  initialDate?: Date;
  initialTime?: string;
}

export default function StorylinePost({ 
  onBack,
  initialDate,
  initialTime 
}: StorylinePostProps) {
  const [step, setStep] = useState(1);
  const [stories, setStories] = useState<Story[]>([]);
  const [topic, setTopic] = useState('');
  const [kpi, setKpi] = useState('');
  const [storiesPerDay, setStoriesPerDay] = useState(5);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div>
      {step === 1 && (
        <Step1Setup
          onBack={handleBack}
          onNext={handleNext}
          topic={topic}
          setTopic={setTopic}
          kpi={kpi}
          setKpi={setKpi}
          storiesPerDay={storiesPerDay}
          setStoriesPerDay={setStoriesPerDay}
        />
      )}
      {step === 2 && (
        <Step2Structure
          onBack={handleBack}
          onNext={handleNext}
          stories={stories}
          setStories={setStories}
        />
      )}
      {step === 3 && (
        <Step3Visuals
          onBack={handleBack}
          onNext={handleNext}
          stories={stories}
          setStories={setStories}
        />
      )}
      {step === 4 && (
        <Step4Scheduling
          onBack={handleBack}
          onNext={handleNext}
          stories={stories}
          setStories={setStories}
          initialDate={initialDate}
          initialTime={initialTime}
        />
      )}
    </div>
  );
}