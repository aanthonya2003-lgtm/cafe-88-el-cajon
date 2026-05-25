import { HeroSection } from "@/components/sections/HeroSection";
import { SignatureMarquee } from "@/components/sections/SignatureMarquee";
import { MenuHighlights } from "@/components/sections/MenuHighlights";
import { StorySection } from "@/components/sections/StorySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { OrderSection } from "@/components/sections/OrderSection";
import { CateringCTA } from "@/components/sections/CateringCTA";
import { TestimonialsMarquee } from "@/components/sections/TestimonialsMarquee";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SignatureMarquee />
      <MenuHighlights />
      <StorySection />
      <StatsSection />
      <OrderSection />
      <CateringCTA />
      <TestimonialsMarquee />
    </>
  );
}
