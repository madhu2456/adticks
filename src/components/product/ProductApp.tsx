"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { authUrls } from "@/lib/config";

type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
};

type AuditRun = {
  id: string;
  target_url: string;
  status: string;
  crawl_budget: number;
  discovered_urls: number;
  fetched_urls: number;
  rendered_urls: number;
  findings: Record<string, unknown>;
  created_at: string;
};

type AuthState =
  | { status: "loading"; user?: never }
  | { status: "authenticated"; user: UserProfile }
  | { status: "anonymous"; user?: never };

export function ProductApp() {
  const [authState, setAuthState] = useState<AuthState>({ status: "loading" });
  const [audits, setAudits] = useState<AuditRun[]>([]);
  const [targetUrl, setTargetUrl] = useState("https://example.com");
  const [message, setMessage] = useState("Connect Google to queue real audits.");

  const totalFetched = useMemo(
    () => audits.reduce((sum, audit) => sum + audit.fetched_urls, 0),
    [audits],
  );

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch(authUrls.me, { credentials: "include" });
        if (!response.ok) {
          setAuthState({ status: "anonymous" });
          return;
        }
        const user = (await response.json()) as UserProfile;
        setAuthState({ status: "authenticated", user });

        const auditsResponse = await fetch(authUrls.audits, { credentials: "include" });
        if (auditsResponse.ok) {
          setAudits((await auditsResponse.json()) as AuditRun[]);
        }
      } catch {
        setAuthState({ status: "anonymous" });
      }
    }

    void loadSession();
  }, []);

  async function createAudit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (authState.status !== "authenticated") {
      window.location.href = authUrls.googleLogin;
      return;
    }

    const response = await fetch(authUrls.audits, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target_url: targetUrl, crawl_budget: 10000 }),
    });

    if (!response.ok) {
      setMessage("Audit API rejected the request.");
      return;
    }

    const audit = (await response.json()) as AuditRun;
    setAudits((current) => [audit, ...current]);
    setMessage(`${audit.target_url} queued for Celery processing.`);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Image
          src="/adticks_logo.png"
          alt="Adticks"
          className="brand-mark"
          width={272}
          height={72}
          priority
        />
        <div className="brand-caption">
          Technical SEO, rendering, crawl graph, and AI visibility operations.
        </div>
        <nav className="nav-section" aria-label="Product">
          {["Command", "Audits", "Rendering", "Indexability", "GEO/AEO", "Workers"].map(
            (item, index) => (
              <a className={index === 0 ? "nav-item active" : "nav-item"} href="#" key={item}>
                <span className="nav-dot" />
                <span>{item}</span>
              </a>
            ),
          )}
        </nav>
        <div className="sidebar-footer">
          <strong>Backend stack</strong>
          <span>FastAPI, Google OAuth, Postgres, Redis, Celery</span>
        </div>
      </aside>

      <main className="main product-main">
        <div className="topbar">
          <div className="page-title">
            <span className="eyebrow">Authenticated workspace</span>
            <h1>Audit command center</h1>
            <p className="subtle">
              Queue crawl jobs, monitor worker state, and review evidence-backed SEO
              intelligence.
            </p>
          </div>
          <div className="toolbar">
            {authState.status === "authenticated" ? (
              <span className="identity-pill">{authState.user.email}</span>
            ) : (
              <a className="button primary" href={authUrls.googleLogin}>
                Sign in with Google
              </a>
            )}
          </div>
        </div>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Queue a deep audit</h2>
                <p className="subtle">Backend API creates the audit and Celery owns execution.</p>
              </div>
              <span className="score-pill">10k URL cap</span>
            </div>
            <div className="panel-body">
              <form className="scan-form" onSubmit={createAudit}>
                <div className="input-row">
                  <label className="field">
                    <span>Target URL</span>
                    <input
                      className="input"
                      onChange={(event) => setTargetUrl(event.target.value)}
                      type="url"
                      value={targetUrl}
                    />
                  </label>
                  <button className="button primary" type="submit">
                    Queue audit
                  </button>
                </div>
                <p className="submit-state queued">{message}</p>
              </form>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>System state</h2>
                <p className="subtle">Current workspace rollup.</p>
              </div>
            </div>
            <div className="panel-body">
              <div className="metric-grid compact">
                <div className="metric">
                  <span className="metric-value">{audits.length}</span>
                  <span className="metric-label">Audits</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{totalFetched}</span>
                  <span className="metric-label">Fetched</span>
                </div>
                <div className="metric">
                  <span className="metric-value">
                    {authState.status === "authenticated" ? "Live" : "Locked"}
                  </span>
                  <span className="metric-label">Session</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel" style={{ marginTop: 18 }}>
          <div className="panel-header">
            <div>
              <h2>Audit runs</h2>
              <p className="subtle">Real records returned by the FastAPI service.</p>
            </div>
          </div>
          <div className="panel-body">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Target</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Discovered</th>
                  <th>Fetched</th>
                  <th>Rendered</th>
                </tr>
              </thead>
              <tbody>
                {audits.length === 0 ? (
                  <tr>
                    <td colSpan={6}>No audits yet.</td>
                  </tr>
                ) : (
                  audits.map((audit) => (
                    <tr key={audit.id}>
                      <td>{audit.target_url}</td>
                      <td>{audit.status}</td>
                      <td>{audit.crawl_budget.toLocaleString()}</td>
                      <td>{audit.discovered_urls.toLocaleString()}</td>
                      <td>{audit.fetched_urls.toLocaleString()}</td>
                      <td>{audit.rendered_urls.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
