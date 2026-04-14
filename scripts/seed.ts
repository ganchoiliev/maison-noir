import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding Maison Noir database...\n");

  // Clear existing
  await supabase.from("courses").delete().neq("id", "");
  await supabase.from("seasons").delete().neq("id", "");

  // Seed Spring 2026 season
  const { data: season, error: seasonErr } = await supabase
    .from("seasons")
    .insert({
      slug: "spring-2026",
      name: "Spring 2026",
      starts_on: "2026-03-01",
      ends_on: "2026-05-31",
      is_active: true,
    })
    .select()
    .single();

  if (seasonErr || !season) {
    console.error("Error seeding season:", seasonErr);
    return;
  }
  console.log("Seeded season:", season.name);

  // Seed 12-course tasting menu
  const courses = [
    {
      position: 1,
      name: "Amuse-Bouche",
      description: "Pea velouté, mint oil, crème fraîche snow",
      allergens: ["dairy"],
      wine_pairing: "NV Champagne, Pierre Gimonnet",
    },
    {
      position: 2,
      name: "Bread & Butter",
      description: "Sourdough, cultured butter, smoked salt, Marmite caramel",
      allergens: ["gluten", "dairy"],
      wine_pairing: null,
    },
    {
      position: 3,
      name: "The Garden",
      description: "Heritage beetroot, goat curd, walnut praline, elderflower",
      allergens: ["dairy", "nuts"],
      wine_pairing: "2024 Sancerre, Domaine Vacheron",
    },
    {
      position: 4,
      name: "Tartare",
      description: "Aged Hereford beef, confit egg yolk, black garlic, caper berries",
      allergens: ["egg", "mustard"],
      wine_pairing: "2023 Côtes du Rhône, E. Guigal",
    },
    {
      position: 5,
      name: "From the Coast",
      description: "Cornish crab, avocado, yuzu, shiso, nori crisp",
      allergens: ["crustacean"],
      wine_pairing: "2024 Albariño, Pazo de Señorans",
    },
    {
      position: 6,
      name: "The Egg",
      description: "Slow-cooked hen egg, morel velouté, asparagus, truffle",
      allergens: ["egg", "dairy"],
      wine_pairing: "2023 Meursault, Roulot",
    },
    {
      position: 7,
      name: "Interval",
      description: "Lemon verbena granita, green apple, celery",
      allergens: [],
      wine_pairing: null,
    },
    {
      position: 8,
      name: "From the Sea",
      description: "Wild turbot, brown butter, capers, samphire, new potatoes",
      allergens: ["fish", "dairy"],
      wine_pairing: "2022 Puligny-Montrachet, Leflaive",
    },
    {
      position: 9,
      name: "The Bird",
      description: "Anjou pigeon, beetroot, blackcurrant, radicchio, jus gras",
      allergens: [],
      wine_pairing: "2020 Chambolle-Musigny, Roumier",
    },
    {
      position: 10,
      name: "Pre-Dessert",
      description: "Rhubarb, ginger, yoghurt, oat crumble",
      allergens: ["dairy", "gluten"],
      wine_pairing: null,
    },
    {
      position: 11,
      name: "Dessert",
      description: "Valrhona chocolate, salted caramel, hazelnut, milk ice cream",
      allergens: ["dairy", "nuts", "gluten"],
      wine_pairing: "2018 Banyuls, Domaine du Mas Blanc",
    },
    {
      position: 12,
      name: "Mignardises",
      description: "Petit fours, seasonal confections, served with coffee or tea",
      allergens: ["dairy", "nuts", "gluten"],
      wine_pairing: null,
    },
  ];

  const { data: insertedCourses, error: courseErr } = await supabase
    .from("courses")
    .insert(
      courses.map((c) => ({
        ...c,
        season_id: season.id,
        is_published: true,
      })),
    )
    .select();

  if (courseErr) {
    console.error("Error seeding courses:", courseErr);
    return;
  }
  console.log(`Seeded ${insertedCourses?.length ?? 0} courses\n`);
  console.log("Seeding complete!");
}

seed().catch(console.error);
