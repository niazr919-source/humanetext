import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const clientId = req.headers.get("x-client-id") ?? null;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("subscribers")
      .upsert([{ email, client_key: clientId }], { onConflict: "email" });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist signup failed:", err);
    return NextResponse.json(
      { error: "Couldn't save your email right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
