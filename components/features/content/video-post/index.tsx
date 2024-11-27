"use client";

import { useState } from 'react';
import Step0VideoType from './Step0VideoType';
import Step1CreateScript from './Step1CreateScript';
import Step2CreateVideo from './Step2CreateVideo';
import Step3CreateAudio from './Step3CreateAudio';
import Step4CreateCaption from './Step4CreateCaption';
import Step5CreateSubtitles from './Step5CreateSubtitles';
import Step6HashtagGeneration from './Step6HashtagGeneration';
import Step7Review from './Step7Review';
import Step8Scheduling from './Step8Scheduling';
import { Card } from '@/ui/card';

interface VideoPostProps {
  onBack: () => void;
  initialDate?: Date;
  initialTime?: string;
}

export type VideoType = 'short' | 'long' | null;

export default function VideoPost({ 
  onBack, 
  initialDate, 
  initialTime 
}: VideoPostProps) {
  const [step, setStep] = useState(0);
  const [videoType, setVideoType] = useState<VideoType>(null);
  const [script, setScript] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [selectedSubtitleStyle, setSelectedSubtitleStyle] = useState<number | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 0) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
      {step === 0 && (
        <Step0VideoType
          onBack={handleBack}
          onNext={handleNext}
          videoType={videoType}
          setVideoType={setVideoType}
        />
      )}
      {step === 1 && (
        <Step1CreateScript
          onBack={handleBack}
          onNext={handleNext}
          script={script}
          setScript={setScript}
        />
      )}
      {step === 2 && (
        <Step2CreateVideo
          onBack={handleBack}
          onNext={handleNext}
          script={script}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
        />
      )}
      {step === 3 && (
        <Step3CreateAudio
          onBack={handleBack}
          onNext={handleNext}
          script={script}
          audioUrl={audioUrl}
          setAudioUrl={setAudioUrl}
        />
      )}
      {step === 4 && (
        <Step4CreateCaption
          onBack={handleBack}
          onNext={handleNext}
          script={script}
          caption={caption}
          setCaption={setCaption}
        />
      )}
      {step === 5 && (
        <Step5CreateSubtitles
          onBack={handleBack}
          onNext={handleNext}
          selectedStyle={selectedSubtitleStyle}
          setSelectedStyle={setSelectedSubtitleStyle}
        />
      )}
      {step === 6 && (
        <Step6HashtagGeneration
          onBack={handleBack}
          onNext={handleNext}
          content={script}
          hashtags={hashtags}
          setHashtags={setHashtags}
        />
      )}
      {step === 7 && (
        <Step7Review
          onBack={handleBack}
          onNext={handleNext}
          script={script}
          videoUrl={videoUrl}
          audioUrl={audioUrl}
          caption={caption}
          hashtags={hashtags}
          selectedSubtitleStyle={selectedSubtitleStyle}
        />
      )}
      {step === 8 && (
        <Step8Scheduling
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
    </Card>
  );
}