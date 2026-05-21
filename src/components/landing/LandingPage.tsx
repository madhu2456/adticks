import Image from "next/image";
import Link from "next/link";
import { authUrls } from "@/lib/config";
import { AuditEngineVisual } from "./AuditEngineVisual";
import { HeroMeasurement } from "./HeroMeasurement";
import { VisibilityLab } from "./VisibilityLab";

const proofSignals = [
  ["AI visibility ledger", "Mentions, citations, AI share of voice, prompt coverage, and competitor presence in one timeline."],
  ["Crawler access map", "GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Googlebot, and blocked asset paths checked together."],
  ["Render truth", "Raw HTML, rendered DOM, hydration errors, delayed content, and JavaScript SEO risks compared side by side."],
  ["Authority graph", "Internal PageRank flow, orphan pockets, hub strength, anchor context, and crawl-depth drag."],
];

const comparisonRows = [
  ["Traditional audit", "One-time issue list", "Adticks", "Continuous visibility instrumentation"],
  ["Rank tracker", "Keyword movement only", "Adticks", "SEO keywords, AI prompts, citations, crawl, render, and authority movement"],
  ["Crawler export", "Rows of defects", "Adticks", "Evidence mapped to growth risk and owner-ready actions"],
  ["AI visibility tool", "Mentions without root cause", "Adticks", "AI presence tied to content, entities, crawlers, rendering, and technical access"],
];

const demandClusters = [
  {
    title: "AI Search Visibility",
    terms: ["AI visibility tracking", "AI search visibility", "LLM visibility tracking", "AI share of voice"],
    prompt: "Which brands are cited when buyers ask ChatGPT or Perplexity for the best solution?",
  },
  {
    title: "GEO / AEO",
    terms: ["generative engine optimization", "answer engine optimization", "AI citation tracking", "AI Overview tracking"],
    prompt: "Why does Google AI Overview cite a competitor but not our page?",
  },
  {
    title: "Technical SEO Audit",
    terms: ["technical SEO audit", "JavaScript SEO audit", "indexability audit", "Core Web Vitals audit"],
    prompt: "Which technical barriers stop search engines and AI crawlers from understanding the site?",
  },
  {
    title: "Content Intelligence",
    terms: ["semantic content analysis", "content gap analysis", "topical authority mapping", "keyword cannibalization"],
    prompt: "Which pages are missing the entities, answer blocks, and evidence needed to be cited?",
  },
];

const aiCoverageRows = [
  ["ChatGPT", "31%", "bar-31"],
  ["AI Overviews", "44%", "bar-44"],
  ["Perplexity", "18%", "bar-18"],
  ["Gemini", "27%", "bar-27"],
];

const navItems = [
  ["AI Visibility", "Prompts + citations", "#measure"],
  ["Audit Engine", "Crawl + render", "#engine"],
  ["Keyword Map", "Demand clusters", "#demand"],
  ["Teams", "Operator views", "#teams"],
];

const visibilitySurfaces = [
  ["Rankings", "SERP movement, snippets, CTR gaps"],
  ["Answers", "AI Overviews, citations, summaries"],
  ["Agents", "LLM research flows and tool comparisons"],
  ["Crawlers", "Googlebot, GPTBot, PerplexityBot access"],
];

const teamViews = [
  {
    label: "SEO",
    badge: "SEO",
    view: "Debug crawl, render, canonical, indexability, and CWV risks with evidence.",
  },
  {
    label: "Content",
    badge: "CON",
    view: "Measure topical authority, answer quality, semantic gaps, AI readability, and citation readiness.",
  },
  {
    label: "Agency",
    badge: "AGY",
    view: "Show clients what moved, what caused it, and which fixes deserve budget first.",
  },
  {
    label: "Growth",
    badge: "GRW",
    view: "Monitor programmatic SEO templates, docs, comparison pages, and editorial portfolios.",
  },
];

export function LandingPage() {
  return (
    <div className="site research-grade v3-site">
      <header className="market-nav v3-nav">
        <Link className="market-logo" href="/" aria-label="Adticks home">
          <Image src="/adticks_logo.png" alt="Adticks" width={188} height={52} priority />
        </Link>
        <nav className="v3-nav-links" aria-label="Adticks">
          {navItems.map(([label, detail, href]) => (
            <a href={href} key={label}>
              <span>{label}</span>
              <small>{detail}</small>
            </a>
          ))}
        </nav>
        <div className="market-actions">
          <span className="v3-nav-status">Visibility OS</span>
          <Link className="nav-link" href="/login">
            Log in
          </Link>
          <a className="button primary v3-nav-cta" href={authUrls.googleLogin}>
            <span className="v3-nav-cta-desktop">Start measuring</span>
            <span className="v3-nav-cta-mobile">Start</span>
          </a>
        </div>
      </header>

      <main>
        <HeroMeasurement />

        <section className="v3-proof-band" aria-label="Adticks product proof points">
          {proofSignals.map(([title, copy]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </section>

        <section className="v3-narrative">
          <div>
            <span className="v3-kicker">Why the old SEO stack is not enough</span>
            <h2>Search is now a distributed visibility system across rankings, answers, agents, and crawlers.</h2>
          </div>
          <div className="v3-surface-map">
            <p>
              Buyers no longer discover brands through one blue-link journey. They compare options
              in AI Overviews, ChatGPT, Perplexity, Gemini, Reddit, YouTube, search results, and
              agentic research flows.
            </p>
            <div>
              {visibilitySurfaces.map(([label, detail]) => (
                <article key={label}>
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </article>
              ))}
            </div>
            <p>
              Adticks measures that whole surface and connects every gap to the technical,
              semantic, and authority signals that caused it.
            </p>
          </div>
        </section>

        <section className="v3-section v3-demand" id="demand">
          <div className="v3-section-head">
            <span className="v3-kicker">Keyword and AI prompt map</span>
            <h2>Built around the searches modern SEO buyers are already making.</h2>
            <p>
              Adticks targets the new demand layer: AI visibility tracking, GEO, AEO,
              LLM visibility, technical SEO audits, AI crawler optimization, and content
              intelligence. These are not separate reports. They are connected measurements.
            </p>
          </div>

          <div className="v3-ai-coverage">
            <div className="v3-ai-prompt-card">
              <span>Tracked prompt</span>
              <strong>“best technical SEO audit platform for AI search visibility”</strong>
              <p>Adticks maps citations, missing entities, blocked AI crawlers, and competitor mentions for each buyer-intent prompt.</p>
            </div>
            <div className="v3-ai-coverage-bars" aria-label="AI visibility coverage sample">
              {aiCoverageRows.map(([source, value, barClass]) => (
                <div className="v3-ai-bar-row" key={source}>
                  <span>{source}</span>
                  <i className={barClass} />
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="v3-demand-grid">
            {demandClusters.map((cluster) => (
              <article className="v3-demand-card" key={cluster.title}>
                <div>
                  <h3>{cluster.title}</h3>
                  <p>{cluster.prompt}</p>
                </div>
                <ul>
                  {cluster.terms.map((term) => (
                    <li key={term}>{term}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="v3-section" id="measure">
          <div className="v3-section-head">
            <span className="v3-kicker">Search + AI measurement layers</span>
            <h2>Every score explains what changed, why it changed, and how to win the next citation.</h2>
            <p>
              The product is designed around evidence. Every card links a measurable signal to
              affected pages, root cause, confidence, priority, and owner-ready recommendations.
            </p>
          </div>

          <VisibilityLab />
        </section>

        <section className="v3-engine" id="engine">
          <div className="v3-section-head left">
            <span className="v3-kicker">Deep dive audit engine</span>
            <h2>Watch crawl, render, extraction, and prioritization become one evidence loop.</h2>
            <p>
              Move through the engine stages to see how Adticks turns messy websites into
              owner-ready visibility evidence.
            </p>
          </div>

          <AuditEngineVisual />
        </section>

        <section className="v3-advantage" id="advantage">
          <div className="v3-section-head">
            <span className="v3-kicker">Platform advantage</span>
            <h2>Not another report. A visibility measurement layer.</h2>
          </div>
          <div className="v3-comparison">
            {comparisonRows.map(([oldLabel, oldCopy, newLabel, newCopy]) => (
              <div className="v3-comparison-row" key={`${oldLabel}-${newCopy}`}>
                <div>
                  <span>{oldLabel}</span>
                  <p>{oldCopy}</p>
                </div>
                <strong>vs</strong>
                <div>
                  <span>{newLabel}</span>
                  <p>{newCopy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="v3-section" id="teams">
          <div className="v3-section-head">
            <span className="v3-kicker">Designed for operators</span>
            <h2>The same crawl becomes different evidence for every team.</h2>
          </div>
          <div className="v3-team-grid">
            {teamViews.map(({ badge, label, view }) => (
              <article key={label}>
                <div className="v3-team-head">
                  <strong aria-hidden="true">{badge}</strong>
                  <h3>{label}</h3>
                </div>
                <p>{view}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v3-final">
          <div>
            <span className="v3-kicker">Start measuring</span>
            <h2>Find the visibility leaks your competitors are not instrumenting yet.</h2>
            <p>
              Start with a domain-level measurement, then expand into AI visibility tracking,
              crawl intelligence, content quality scoring, internal authority, and competitive movement.
            </p>
          </div>
          <a className="button primary large" href={authUrls.googleLogin}>
            Build my visibility map
          </a>
        </section>
      </main>
    </div>
  );
}
