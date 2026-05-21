"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { authUrls } from "@/lib/config";

type BarStyle = CSSProperties & { "--bar": string };

const surfaces = [
  {
    id: "google",
    label: "Google",
    value: "84",
    delta: "+8.4",
    tone: "good",
    insight: "SERP gains are concentrated in guides, while comparison pages are under-cited.",
  },
  {
    id: "answers",
    label: "AI answers",
    value: "31%",
    delta: "+11%",
    tone: "good",
    insight: "ChatGPT and Perplexity cite competitors where pages lack extractable answer blocks.",
  },
  {
    id: "render",
    label: "Render parity",
    value: "72",
    delta: "-9",
    tone: "warn",
    insight: "Pricing and feature proof appear after JavaScript execution, creating citation risk.",
  },
  {
    id: "crawl",
    label: "Crawl loss",
    value: "12%",
    delta: "+4%",
    tone: "bad",
    insight: "Faceted URLs and parameter loops are wasting crawl budget on duplicate paths.",
  },
];

const queueRows = [
  ["Critical", "AI crawlers cannot reach comparison pages"],
  ["High", "Pricing answers render only after client-side JavaScript"],
  ["High", "Internal authority leaking below depth four"],
  ["Medium", "Two templates cannibalize the same AI Overview intent"],
];

const searchPills = [
  "AI visibility tracking",
  "GEO platform",
  "Technical SEO audit",
  "LLM citation readiness",
];

const heroSignals = [
  ["AI crawlers", "GPTBot, PerplexityBot, ClaudeBot"],
  ["Rendered truth", "Raw HTML vs browser DOM"],
  ["Growth risk", "Issue severity tied to page groups"],
];

export function HeroMeasurement() {
  const [domain, setDomain] = useState("");
  const [activeSurfaceId, setActiveSurfaceId] = useState(surfaces[0].id);
  const activeSurface = surfaces.find((surface) => surface.id === activeSurfaceId) ?? surfaces[0];
  const displayDomain = useMemo(() => {
    const trimmed = domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return trimmed || "yourdomain.com";
  }, [domain]);
  const barStyle = (value: string): BarStyle => ({ "--bar": value });

  return (
    <section className="v3-hero" id="platform">
      <div className="v3-hero-copy">
        <span className="v3-kicker">AI search visibility + technical SEO measurement</span>
        <h1>Adticks</h1>
        <p className="v3-hero-lede">
          Measure where your website is found in Google, AI Overviews, ChatGPT, Perplexity,
          Gemini, and answer engines, then trace every visibility gap back to crawl, render,
          content, entity, and authority evidence.
        </p>

        <div className="v3-hero-mode-rail" aria-label="Interactive visibility surfaces">
          {surfaces.map((surface) => (
            <button
              className={surface.id === activeSurface.id ? "active" : ""}
              key={surface.id}
              onClick={() => setActiveSurfaceId(surface.id)}
              type="button"
            >
              <span>{surface.label}</span>
              <strong>{surface.value}</strong>
            </button>
          ))}
        </div>

        <form className="v3-domain-console" action="/app">
          <label htmlFor="domain-input">Measure a domain</label>
          <div>
            <input
              id="domain-input"
              aria-label="Website URL"
              name="target"
              onChange={(event) => setDomain(event.target.value)}
              placeholder="https://yourdomain.com"
              type="url"
              value={domain}
            />
            <button type="submit">Generate visibility map</button>
          </div>
        </form>

        <div className="v3-hero-actions">
          <a className="button primary large" href={authUrls.googleLogin}>
            Continue with Google
          </a>
          <Link className="button ghost large" href="/app">
            Open console
          </Link>
        </div>

        <div className="v3-query-strip" aria-label="Primary search demand Adticks measures">
          {searchPills.map((pill) => (
            <span key={pill}>{pill}</span>
          ))}
        </div>

        <div className="v3-hero-signal-grid" aria-label="Adticks audit evidence coverage">
          {heroSignals.map(([title, detail]) => (
            <article key={title}>
              <strong>{title}</strong>
              <span>{detail}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="v3-cockpit" aria-label="Adticks measurement cockpit preview">
        <div className="v3-cockpit-top">
          <span />
          <span />
          <span />
          <strong>adticks://{displayDomain}/visibility-map</strong>
        </div>

        <div className="v3-cockpit-grid">
          <div className="v3-cockpit-main">
            <div className="v3-map-head">
              <div>
                <small>Measured domain</small>
                <strong>{displayDomain}</strong>
              </div>
              <span>{activeSurface.label}</span>
            </div>
            <div className={`v3-orbit active-${activeSurface.id}`} aria-hidden="true">
              <i className="orbit-center">Site</i>
              <i className="orbit-node search">Search</i>
              <i className="orbit-node ai">AI</i>
              <i className="orbit-node crawl">Crawl</i>
              <i className="orbit-node content">Content</i>
              <i className="orbit-node links">Links</i>
              <i className="orbit-trace one" />
              <i className="orbit-trace two" />
            </div>
          </div>

          <div className="v3-surface-stack">
            {surfaces.map((surface) => (
              <button
                className={`v3-surface-card ${surface.tone} ${surface.id === activeSurface.id ? "active" : ""}`}
                key={surface.label}
                onClick={() => setActiveSurfaceId(surface.id)}
                type="button"
              >
                <small>{surface.label}</small>
                <strong>{surface.value}</strong>
                <span>{surface.delta}</span>
              </button>
            ))}
          </div>

          <div className="v3-impact-queue">
            <div className="v3-panel-title">
              <span>Impact queue</span>
              <b>Evidence ranked</b>
            </div>
            {queueRows.map(([severity, finding]) => (
              <div className="v3-queue-row" key={finding}>
                <strong>{severity}</strong>
                <span>{finding}</span>
              </div>
            ))}
          </div>

          <div className="v3-ai-panel">
            <div className="v3-panel-title">
              <span>Selected signal</span>
              <b>Root cause view</b>
            </div>
            <div className="v3-answer-card v3-selected-signal">
              <p>{activeSurface.insight}</p>
              <div>
                <span>Entity coverage</span>
                <i style={barStyle("84%")} />
              </div>
              <div>
                <span>Answer clarity</span>
                <i style={barStyle("68%")} />
              </div>
              <div>
                <span>Source confidence</span>
                <i style={barStyle("57%")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
