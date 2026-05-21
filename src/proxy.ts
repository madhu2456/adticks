import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_BASE_URL } from "@/lib/config";

function getAppUrl(): URL | null {
  if (APP_BASE_URL.startsWith("http://") || APP_BASE_URL.startsWith("https://")) {
    return new URL(APP_BASE_URL);
  }
  return null;
}

export function proxy(request: NextRequest) {
  const appUrl = getAppUrl();
  if (!appUrl) {
    return NextResponse.next();
  }

  const requestUrl = request.nextUrl;
  const hostname = request.headers.get("host")?.split(":")[0];
  const isAppHost = hostname === appUrl.hostname;

  if (isAppHost && requestUrl.pathname === "/") {
    const rewriteUrl = requestUrl.clone();
    rewriteUrl.pathname = "/app";
    return NextResponse.rewrite(rewriteUrl);
  }

  if (isAppHost && requestUrl.pathname === "/app") {
    const redirectUrl = requestUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (!isAppHost && requestUrl.pathname === "/app") {
    const redirectUrl = new URL(appUrl);
    redirectUrl.search = requestUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/app"],
};
