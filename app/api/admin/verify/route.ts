import { NextRequest, NextResponse } from "next/server";
import { isUserAllowed } from "@/lib/auth/adminAllowlist";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const allowed = await isUserAllowed(email);
    return NextResponse.json({ allowed });
  } catch (error) {
    return NextResponse.json({ allowed: false }, { status: 500 });
  }
}
