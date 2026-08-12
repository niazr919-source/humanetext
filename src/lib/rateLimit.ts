import { getSupabaseAdmin } from "./supabaseAdmin";

export type HumanizeAction = "text" | "photo";

const FREE_LIMIT = 3;
const SUBSCRIBER_LIMIT = 6;

export interface UsageResult {
  allowed: boolean;
  remaining: number;
  limit: number;
}

function startOfTodayUTC(): string {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  ).toISOString();
}

export async function checkAndConsumeUsage(
  clientKey: string,
  ip: string,
  action: HumanizeAction
): Promise<UsageResult> {
  const supabase = getSupabaseAdmin();
  const since = startOfTodayUTC();

  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("id")
    .or(`client_key.eq.${clientKey},email.not.is.null`)
    .eq("client_key", clientKey)
    .maybeSingle();

  const limit = subscriber ? SUBSCRIBER_LIMIT : FREE_LIMIT;

  const { count, error: countError } = await supabase
    .from("usage_log")
    .select("id", { count: "exact", head: true })
    .eq("action", action)
    .or(`client_key.eq.${clientKey},ip.eq.${ip}`)
    .gte("created_at", since);

  if (countError) {
    throw countError;
  }

  const used = count ?? 0;

  if (used >= limit) {
    return { allowed: false, remaining: 0, limit };
  }

  const { error: insertError } = await supabase.from("usage_log").insert({
    client_key: clientKey,
    ip,
    action,
  });

  if (insertError) {
    throw insertError;
  }

  return { allowed: true, remaining: limit - used - 1, limit };
}

export async function getRemainingUsage(
  clientKey: string,
  ip: string,
  action: HumanizeAction
): Promise<UsageResult> {
  const supabase = getSupabaseAdmin();
  const since = startOfTodayUTC();

  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("id")
    .eq("client_key", clientKey)
    .maybeSingle();

  const limit = subscriber ? SUBSCRIBER_LIMIT : FREE_LIMIT;

  const { count } = await supabase
    .from("usage_log")
    .select("id", { count: "exact", head: true })
    .eq("action", action)
    .or(`client_key.eq.${clientKey},ip.eq.${ip}`)
    .gte("created_at", since);

  const used = count ?? 0;
  return { allowed: used < limit, remaining: Math.max(0, limit - used), limit };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
