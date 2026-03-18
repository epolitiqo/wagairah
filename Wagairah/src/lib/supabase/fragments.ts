import type { Database } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/client";

export type Fragment = Database["public"]["Tables"]["fragments"]["Row"];

export async function fetchLatestFragments(limit = 10): Promise<Fragment[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("fragments")
    .select("id, content, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function insertFragment(content: string): Promise<Fragment> {
  const value = content.trim();

  if (!value) {
    throw new Error("Write a fragment first.");
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("fragments")
    .insert({ content: value })
    .select("id, content, created_at")
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Could not return the saved fragment.");
  }

  return data;
}
