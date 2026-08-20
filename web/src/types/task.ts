import type { Database } from "@/supabase";

export type Task = Database["public"]["Tables"]["task"]["Row"]
