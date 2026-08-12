import { NextRequest, NextResponse } from "next/server";
import { humanizeText } from "@/lib/gemini";
import { checkAndConsumeUsage, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MAX_CHARS = 6000;

export async function POST(req: NextRequest) {
  let body: { text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const text = body.text?.trim();
  if (!text) {
    return NextResponse.json({ error: "Please paste some text first." }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `That's a bit long — please keep it under ${MAX_CHARS} characters.` },
      { status: 400 }
    );
  }

  const clientId = req.headers.get("x-client-id");
  if (!clientId) {
    return NextResponse.json({ error: "Missing client id." }, { status: 400 });
  }

  const ip = getClientIp(req.headers);

  let remaining: number | null = null;
  try {
    const usage = await checkAndConsumeUsage(clientId, ip, "text");
    if (!usage.allowed) {
      return NextResponse.json(
        {
          error:
            "You've used today's free rewrites. Come back tomorrow, or sign up for a higher daily limit.",
        },
        { status: 429 }
      );
    }
    remaining = usage.remaining;
  } catch (err) {
    console.error("Usage tracking unavailable:", err);
  }

  try {
    const result = await humanizeText(text);
    return NextResponse.json({ result, remaining });
  } catch (err) {
    console.error("Humanize text failed:", err);
    return NextResponse.json(
      { error: "Something went wrong while rewriting your text. Please try again." },
      { status: 502 }
    );
  }
}
