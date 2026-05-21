"use client";

import { useEffect, useState } from "react";
import { APP_BASE_URL, authUrls, getGoogleLoginUrl } from "@/lib/config";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthAwareGoogleCtaProps = {
  className: string;
  signedOutLabel?: string;
  signedInLabel?: string;
};

export function AuthAwareGoogleCta({
  className,
  signedOutLabel = "Continue with Google",
  signedInLabel = "Open console",
}: AuthAwareGoogleCtaProps) {
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const response = await fetch(authUrls.me, { credentials: "include" });
        if (isMounted) {
          setStatus(response.ok ? "authenticated" : "anonymous");
        }
      } catch {
        if (isMounted) {
          setStatus("anonymous");
        }
      }
    }

    void checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const isAuthenticated = status === "authenticated";

  return (
    <a className={className} href={isAuthenticated ? APP_BASE_URL : getGoogleLoginUrl()}>
      {isAuthenticated ? signedInLabel : signedOutLabel}
    </a>
  );
}
