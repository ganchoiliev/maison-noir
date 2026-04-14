import { createClient } from "@/lib/supabase/server";
import { MenuPreviewClient } from "./menu-preview-client";
import type { Course } from "@/types";

export async function MenuPreview() {
  const supabase = await createClient();

  const { data: season } = await supabase
    .from("seasons")
    .select("id, name, courses(*)")
    .eq("is_active", true)
    .order("position", { referencedTable: "courses" })
    .single();

  const courses = ((season?.courses as Course[]) ?? []).slice(0, 6);

  return <MenuPreviewClient seasonName={season?.name ?? "Current Season"} courses={courses} />;
}
