import { NextRequest, NextResponse } from "next/server";
import { getRemainingUsage, getClientIp, HumanizeAction } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action") as HumanizeAction | null;
  const clientId = req.headers.get("x-client-id");

  if (!action || (action !== "text" && action !== "photo")) {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }
  if (!clientId) {
    return NextResponse.json({ error: "Missing client id." }, { status: 400 });
  }

  try {
    const ip = getClientIp(req.headers);
    const usage = await getRemainingUsage(clientId, ip, action);
    return NextResponse.json(usage);
  } catch {
    return NextResponse.json(
      { allowed: true, remaining: null, limit: null },
      { status: 200 }
    );
  }
}
