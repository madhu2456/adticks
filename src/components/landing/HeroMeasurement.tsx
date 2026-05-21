"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { APP_BASE_URL } from "@/lib/config";

type BarStyle = CSSProperties & { "--bar": string };

const surfaces = [
  {
    id: "google",
    label: "Google SEO",
    value: "84",
    delta: "+8.4 pts",
    tone: "good",
    insight: "Organic visibility is growing, but buyer-intent pages are losing snippet coverage.",
  },
  {
    id: "answers",
    label: "AI Visibility",
    value: "31%",
    delta: "+11%",
    tone: "good",
    insight: "ChatGPT and Perplexity cite competitors where pages lack clear answer structure.",
  },
  {
    id: "render",
    label: "Site Health",
    value: "72",
    delta: "-9",
    tone: "warn",
    insight: "Pricing and feature proof appear after JavaScript execution, creating citation risk.",
  },
  {
    id: "crawl",
    label: "Crawl Waste",
    value: "12%",
    delta: "+4%",
    tone: "bad",
    insight: "Faceted URLs and parameter loops are wasting crawl budget on duplicate paths.",
  },
];

const queueRows = [
  ["Fix first", "AI crawlers blocked from comparison pages"],
  ["High", "Pricing answers render after client-side JavaScript"],
  ["High", "Internal authority leaking below crawl depth four"],
  ["Watch", "Two templates compete for the same AI Overview intent"],
];

const searchPills = [
  "SEO audit",
  "AI visibility",
  "Competitors",
  "Content gaps",
];

const heroSignals = [
  ["Keyword map", "Search demand and prompt clusters"],
  ["Site audit", "Crawl, indexability, rendering, CWV"],
  ["AI citations", "ChatGPT, AI Overviews, Perplexity, Gemini"],
];

export function HeroMeasurement() {
  const [domain, setDomain] = useState("");
  const [activeSurfaceId, setActiveSurfaceId] = useState(surfaces[0].id);
  const activeSurface = surfaces.find((surface) => surface.id === activeSurfaceId) ?? surfaces[0];
  const isValidDomain = useMemo(() => {
    const trimmed = domain.trim();
    if (!trimmed) {
      return false;
    }

    try {
      const parsedUrl = new URL(trimmed);
      return ["http:", "https:"].includes(parsedUrl.protocol) && Boolean(parsedUrl.hostname);
    } catch {
      return false;
    }
  }, [domain]);
  const displayDomain = useMemo(() => {
    const trimmed = domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return trimmed || "yourdomain.com";
  }, [domain]);
  const barStyle = (value: string): BarStyle => ({ "--bar": value });

  return (
    <section className="sem-hero" id="platform">
      <div className="sem-hero-copy">
        <span className="sem-kicker">SEO, AI visibility, and website measurement</span>
        <h1>Measure your search visibility everywhere buyers discover you.</h1>
        <p className="sem-hero-lede">
          Enter a domain to map SEO performance, AI answer visibility, technical health,
          content gaps, competitors, and crawler access in one evidence-backed workspace.
        </p>

        <form className="sem-domain-search" action={APP_BASE_URL}>
          <label htmlFor="domain-input">Analyze any website</label>
          <div>
            <input
              id="domain-input"
              aria-label="Website URL"
              name="target"
              onChange={(event) => setDomain(event.target.value)}
              placeholder="https://yourdomain.com"
              required
              type="url"
              value={domain}
            />
            <button disabled={!isValidDomain} type="submit">
              Analyze domain
            </button>
          </div>
        </form>

        <div className="sem-hero-actions">
          <a className="button primary large" href={APP_BASE_URL}>
            Start measuring
          </a>
          <a className="button secondary large" href="#tools">
            Explore tools
          </a>
        </div>

        <div className="sem-pill-row" aria-label="Primary Adticks capabilities">
          {searchPills.map((pill) => (
            <span key={pill}>{pill}</span>
          ))}
        </div>
      </div>

      <div className="sem-product-preview" aria-label="Adticks product preview">
        <div className="sem-preview-top">
          <span />
          <span />
          <span />
          <strong>{displayDomain} overview</strong>
        </div>

        <div className="sem-overview-grid">
          <div className="sem-overview-main">
            <div className="sem-overview-header">
              <div>
                <small>Domain visibility</small>
                <strong>{displayDomain}</strong>
              </div>
              <span>{activeSurface.label}</span>
            </div>

            <div className="sem-hero-mode-rail" aria-label="Interactive visibility surfaces">
              {surfaces.map((surface) => (
                <button
                  className={surface.id === activeSurface.id ? "active" : ""}
                  key={surface.id}
                  onClick={() => setActiveSurfaceId(surface.id)}
                  type="button"
                >
                  <span>{surface.label}</span>
                  <strong>{surface.value}</strong>
                  <small>{surface.delta}</small>
                </button>
              ))}
            </div>

            <div className="sem-chart-card" aria-hidden="true">
              <div className="sem-chart-bars">
                <i style={barStyle("74%")} />
                <i style={barStyle("52%")} />
                <i style={barStyle("84%")} />
                <i style={barStyle("38%")} />
                <i style={barStyle("67%")} />
                <i style={barStyle("46%")} />
                <i style={barStyle("79%")} />
              </div>
              <div className="sem-chart-line" />
              <b>Visibility trend</b>
            </div>
          </div>

          <div className="sem-insight-card">
            <div className="sem-card-title">
              <span>Root cause</span>
              <b>Live insight</b>
            </div>
            <p>{activeSurface.insight}</p>
            <div>
              <span>Entity coverage</span>
              <i style={barStyle("84%")} />
            </div>
            <div>
              <span>Answer clarity</span>
              <i style={barStyle("68%")} />
            </div>
          </div>

          <div className="sem-opportunity-card">
            <div className="sem-card-title">
              <span>Opportunities</span>
              <b>Priority queue</b>
            </div>
            {queueRows.map(([severity, finding]) => (
              <div className="sem-queue-row" key={finding}>
                <strong>{severity}</strong>
                <span>{finding}</span>
              </div>
            ))}
          </div>

          <div className="sem-signal-grid">
            {heroSignals.map(([title, detail]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{detail}</span>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="sem-mobile-surface" aria-label="Visibility score preview">
        <div className="sem-hero-mode-rail">
          {surfaces.map((surface) => (
            <button
              className={surface.id === activeSurface.id ? "active" : ""}
              key={surface.id}
              onClick={() => setActiveSurfaceId(surface.id)}
              type="button"
            >
              <span>{surface.label}</span>
              <strong>{surface.value}</strong>
              <small>{surface.delta}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
