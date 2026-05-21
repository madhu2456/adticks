import Image from "next/image";
import Link from "next/link";
import { authUrls } from "@/lib/config";

export function LoginPage() {
  return (
    <main className="login-screen">
      <section className="login-panel">
        <Image src="/adticks_logo.png" alt="Adticks" width={190} height={52} priority />
        <div>
          <span className="eyebrow">Secure workspace</span>
          <h1>Sign in to Adticks</h1>
          <p className="subtle">
            Google OAuth is handled by the backend using a server-side authorization
            code flow and an HttpOnly session cookie.
          </p>
        </div>
        <a className="button primary large" href={authUrls.googleLogin}>
          Continue with Google
        </a>
        <Link className="button secondary large" href="/">
          Back to landing page
        </Link>
      </section>
    </main>
  );
}
