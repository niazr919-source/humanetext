import { NextRequest, NextResponse } from "next/server";
import { humanizePhoto } from "@/lib/photoHumanize";
import { checkAndConsumeUsage, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  const clientId = req.headers.get("x-client-id");
  if (!clientId) {
    return NextResponse.json({ error: "Missing client id." }, { status: 400 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please choose an image to upload." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Please upload a JPEG, PNG, or WEBP image." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "That image is too large — please use a file under 12MB." },
      { status: 400 }
    );
  }

  const ip = getClientIp(req.headers);

  let remaining: number | null = null;
  try {
    const usage = await checkAndConsumeUsage(clientId, ip, "photo");
    if (!usage.allowed) {
      return NextResponse.json(
        {
          error:
            "You've used today's free photo processes. Come back tomorrow, or sign up for a higher daily limit.",
        },
        { status: 429 }
      );
    }
    remaining = usage.remaining;
  } catch (err) {
    console.error("Usage tracking unavailable:", err);
  }

  try {
    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const outputBuffer = await humanizePhoto(inputBuffer);

    return new NextResponse(new Uint8Array(outputBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "X-Remaining-Uses": remaining === null ? "" : String(remaining),
      },
    });
  } catch (err) {
    console.error("Humanize photo failed:", err);
    return NextResponse.json(
      { error: "Something went wrong while processing your photo. Please try again." },
      { status: 502 }
    );
  }
}
