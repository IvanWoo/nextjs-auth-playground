import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.url;
  console.log("middleware =>", { url });
  if (request.nextUrl.pathname.startsWith("/api/hello")) {
    console.log("middleware => you are in /api/hello");
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
