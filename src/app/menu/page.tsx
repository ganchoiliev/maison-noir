import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MenuClient } from "@/components/menu/menu-client";
import { MenuVideoScrub } from "@/components/menu/menu-video-scrub";
import { WineList } from "@/components/menu/wine-list";
import type { Season } from "@/types";

export const metadata: Metadata = {
  title: "Menu",
  description: "Our seasonal twelve-course tasting menu, composed daily.",
};

export default async function MenuPage() {
  const supabase = await createClient();

  const { data: seasons } = await supabase
    .from("seasons")
    .select("*, courses(*)")
    .order("starts_on", { ascending: false })
    .order("position", { referencedTable: "courses" });

  const activeSeason = (seasons as Season[] | null)?.find((s) => s.is_active);
  const allSeasons = (seasons as Season[] | null) ?? [];

  return (
    <div className="min-h-screen">
      {/* ── Cinematic hero ── */}
      <div className="relative flex h-[60vh] items-end overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(50%) contrast(1.15) brightness(0.35) sepia(10%)" }}
        >
          <source src="/video/menu-plating.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="vignette" />
        <div className="bg-noise absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-12 lg:px-8">
          <p className="small-caps text-sm text-brass">Tasting Menu</p>
          <h1 className="mt-2 font-display text-5xl text-bone md:text-6xl">
            {activeSeason?.name ?? "Current Season"}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-bone/60">
            <span>Twelve courses</span>
            <span className="h-1 w-1 rounded-full bg-brass/50" />
            <span>&pound;185 per guest</span>
            <span className="h-1 w-1 rounded-full bg-brass/50" />
            <span>Wine pairing +&pound;95</span>
            <span className="h-1 w-1 rounded-full bg-brass/50" />
            <span>~3 hours</span>
          </div>
        </div>
      </div>

      {/* ── Tasting Menu ── */}
      <div className="mx-auto max-w-4xl px-6 py-section lg:px-8">
        <MenuClient seasons={allSeasons} activeSlug={activeSeason?.slug ?? null} />
      </div>

      {/* ── Vegetarian Menu ── */}
      <div className="border-y border-border bg-fog">
        <div className="bg-noise relative">
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-section lg:px-8">
            <header className="mb-10 text-center">
              <p className="small-caps text-sm text-brass">Plant-Forward</p>
              <h2 className="mt-2 font-display text-3xl text-bone md:text-4xl">
                Vegetarian Tasting Menu
              </h2>
              <p className="mt-3 text-sm text-bone/50">
                A dedicated twelve-course menu celebrating seasonal produce. Available on request at
                time of booking. &pound;185 per guest.
              </p>
            </header>

            <div className="space-y-0">
              {vegetarianCourses.map((course) => (
                <div
                  key={course.position}
                  className="group border-b border-border/50 py-6 transition-colors duration-300 first:pt-0 last:border-0"
                >
                  <div className="flex items-baseline gap-6 pl-6">
                    <span className="w-8 shrink-0 text-right font-display text-lg text-brass/25 transition-colors duration-300 group-hover:text-brass">
                      {toRoman(course.position)}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-bone md:text-xl">{course.name}</h3>
                      <p className="mt-1 text-sm text-bone/45">{course.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll-scrub video between menus ── */}
      <MenuVideoScrub />

      {/* ── Wine & Drinks ── */}
      <div className="mx-auto max-w-5xl px-6 py-section lg:px-8">
        <WineList />
      </div>

      {/* ── Notes & CTA ── */}
      <div className="border-t border-border bg-fog/50">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-8">
          <h3 className="font-display text-2xl text-bone">A Note on Dining</h3>
          <p className="mt-4 text-sm leading-relaxed text-bone/50">
            Our menu changes frequently to reflect what is best in season. The dishes listed here
            represent the current edition and may differ on the evening of your visit. Please inform
            us of any dietary requirements at time of booking — we are happy to adapt any course.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/reserve"
              className="border border-ember bg-ember px-8 py-3 text-sm font-medium text-bone transition-all hover:bg-ember-hover hover:shadow-[0_0_20px_rgba(138,106,59,0.15)]"
            >
              Reserve a Seat
            </Link>
            <Link
              href="/gift-vouchers"
              className="border border-border px-8 py-3 text-sm text-bone/60 transition-all hover:border-bone/30 hover:text-bone"
            >
              Gift Vouchers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Static data ── */

function toRoman(n: number): string {
  const numerals: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let result = "";
  let remaining = n;
  for (const [value, symbol] of numerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

const vegetarianCourses = [
  { position: 1, name: "Amuse-Bouche", description: "Chilled pea velouté, mint oil, crème fraîche snow" },
  { position: 2, name: "Bread & Butter", description: "Sourdough, house-cultured butter, roasted garlic, herb oil" },
  { position: 3, name: "The Garden", description: "Heritage beetroot, goat curd, walnut praline, elderflower" },
  { position: 4, name: "The Allotment", description: "Heirloom tomato, burrata, basil, aged balsamic, olive oil crumble" },
  { position: 5, name: "Spring Greens", description: "English asparagus, wild garlic pesto, crispy shallot, lemon" },
  { position: 6, name: "The Egg", description: "Slow-cooked hen egg, morel velouté, asparagus, truffle" },
  { position: 7, name: "Interval", description: "Cucumber granita, elderflower, dill" },
  { position: 8, name: "Forest Floor", description: "Wild mushroom tart, parsley root, black truffle, hazelnut" },
  { position: 9, name: "The Risotto", description: "Carnaroli rice, roasted celeriac, Berkswell cheese, brown butter" },
  { position: 10, name: "Pre-Dessert", description: "Rhubarb, ginger, yoghurt, oat crumble" },
  { position: 11, name: "Dessert", description: "Valrhona chocolate, salted caramel, hazelnut, milk ice cream" },
  { position: 12, name: "Mignardises", description: "Seasonal petit fours, served with coffee or tea" },
];
