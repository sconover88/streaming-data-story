import { HeroSection } from '../components/sections/HeroSection';
import { BigPictureSection } from '../components/sections/BigPictureSection';
import { DivergenceSection } from '../components/sections/DivergenceSection';
import { ContentSection } from '../components/sections/ContentSection';
import { EngagementSection } from '../components/sections/EngagementSection';
import { ChurnSection } from '../components/sections/ChurnSection';
import { TakeawaySection } from '../components/sections/TakeawaySection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BigPictureSection />
      <DivergenceSection />
      <ContentSection />
      <EngagementSection />
      <ChurnSection />
      <TakeawaySection />
    </>
  );
}
