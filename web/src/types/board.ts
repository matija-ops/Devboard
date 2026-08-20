import type { Database } from "@/supabase";


export type Board = Database["public"]["Tables"]["board"]["Row"] & {tasks: Database["public"]["Tables"]["task"]["Row"][]}
