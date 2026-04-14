import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { ExperienceSection } from "@/components/home/experience-section";
import { SeasonalAnnouncement } from "@/components/home/seasonal-announcement";
import { ImageDivider } from "@/components/home/image-divider";
import { VideoDivider } from "@/components/home/video-divider";
import { Manifesto } from "@/components/home/manifesto";
import { MenuPreview } from "@/components/home/menu-preview";
import { SourcingSection } from "@/components/home/sourcing-section";
import { BehindThePass } from "@/components/home/behind-the-pass";
import { TheSpace } from "@/components/home/the-space";
import { ChefPortrait } from "@/components/home/chef-portrait";
import { TeamSection } from "@/components/home/team-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { EventsSection } from "@/components/home/events-section";
import { PrivateDiningSection } from "@/components/home/private-dining-section";
import { GiftVoucherTeaser } from "@/components/home/gift-voucher-teaser";
import { ReservationStrip } from "@/components/home/reservation-strip";
import { InstagramSection } from "@/components/home/instagram-section";
import { PressMarquee } from "@/components/home/press-marquee";

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic hero — video background, awards, typewriter */}
      <Hero />

      {/* 2. The Experience — pricing, format, duration at a glance */}
      <ExperienceSection />

      {/* 3. Seasonal announcement — Spring 2026 menu launch */}
      <SeasonalAnnouncement />

      {/* — Parallax image break — */}
      <ImageDivider
        src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=70&auto=format"
        alt="Fresh seasonal ingredients on dark surface"
      />

      {/* 4. Philosophy — brand ethos in 4 pillars */}
      <Manifesto />

      {/* 5. Tonight's Menu — 6-course preview from CMS */}
      <Suspense fallback={<MenuPreviewSkeleton />}>
        <MenuPreview />
      </Suspense>

      {/* 6. Sourcing — named suppliers and provenance */}
      <SourcingSection />

      {/* 7. BEHIND THE PASS — cinematic video of plating + daily timeline */}
      <BehindThePass />

      {/* 8. Chef portrait — duotone photo + pull quote */}
      <ChefPortrait />

      {/* 9. The Brigade — 4 team profiles with photos */}
      <TeamSection />

      {/* — Kitchen video break — */}
      <VideoDivider src="/video/kitchen.mp4" />

      {/* 10. THE SPACE — restaurant interior video + design story */}
      <TheSpace />

      {/* 11. Guest testimonials — rotating carousel */}
      <TestimonialsSection />

      {/* 12. Upcoming events — winemaker dinners, supper clubs */}
      <EventsSection />

      {/* — Flames video break — */}
      <VideoDivider src="/video/flames.mp4" height="h-[25vh] md:h-[35vh]" />

      {/* 13. Private Dining — exclusive hire teaser */}
      <PrivateDiningSection />

      {/* 14. Gift Vouchers — purchase teaser with pricing */}
      <GiftVoucherTeaser />

      {/* 15. Reservation CTA strip */}
      <ReservationStrip />

      {/* 16. Instagram — social photo gallery */}
      <InstagramSection />

      {/* 17. Press marquee — publication names */}
      <PressMarquee />
    </>
  );
}

function MenuPreviewSkeleton() {
  return (
    <section className="bg-fog px-6 py-section">
      <div className="mx-auto max-w-7xl">
        <div className="h-8 w-48 animate-pulse rounded bg-border" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded bg-border" />
          ))}
        </div>
      </div>
    </section>
  );
}
