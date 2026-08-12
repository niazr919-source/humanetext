import { createClient } from "@supabase/supabase-js";

export interface Database {
  public: {
    Tables: {
      usage_log: {
        Row: {
          id: string;
          client_key: string;
          ip: string;
          action: "text" | "photo";
          created_at: string;
        };
        Insert: {
          id?: string;
          client_key: string;
          ip: string;
          action: "text" | "photo";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["usage_log"]["Insert"]>;
        Relationships: [];
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          client_key: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          client_key?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["subscribers"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

let cachedClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  cachedClient = createClient<Database>(url, serviceKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
