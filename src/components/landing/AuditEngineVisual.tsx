"use client";

import { useState } from "react";

const stages = [
  {
    id: "crawl",
    label: "Crawl",
    metric: "18k",
    title: "URL discovery map",
    detail: "Robots, sitemaps, parameters, canonicals, hreflang, traps, and AI bot access.",
    evidence: ["robots.txt", "sitemap.xml", "GPTBot allowed", "4 crawl traps"],
    finding: "Faceted URLs create 1,420 duplicate crawl paths.",
  },
  {
    id: "render",
    label: "Render",
    metric: "72",
    title: "Rendered truth diff",
    detail: "Raw HTML vs browser DOM, hydration failures, blocked resources, lazy content, and JS cost.",
    evidence: ["raw HTML", "browser DOM", "hydration warning", "JS long tasks"],
    finding: "Pricing content appears after client-side execution only.",
  },
  {
    id: "extract",
    label: "Extract",
    metric: "64%",
    title: "Answer extraction",
    detail: "Entities, schema, headings, chunks, answer blocks, internal links, and duplicate intent.",
    evidence: ["entities", "FAQ blocks", "schema", "semantic gaps"],
    finding: "AI answer block is missing source confidence and comparison context.",
  },
  {
    id: "prioritize",
    label: "Prioritize",
    metric: "P1",
    title: "Impact queue",
    detail: "Recommendations ranked by severity, confidence, page group, owner, and growth risk.",
    evidence: ["severity", "template group", "confidence", "owner"],
    finding: "Fix two templates before expanding content production.",
  },
];

export function AuditEngineVisual() {
  const [activeId, setActiveId] = useState(stages[0].id);
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];

  return (
    <div className="v3-audit-visual" aria-label="Interactive Adticks audit engine preview">
      <div className="v3-audit-browser">
        <div className="v3-audit-browser-top">
          <span />
          <span />
          <span />
          <strong>audit://crawl-render-extract-prioritize</strong>
        </div>

        <div className="v3-audit-stage-tabs" role="tablist" aria-label="Audit engine stages">
          {stages.map((stage) => (
            <button
              aria-selected={stage.id === active.id}
              className={stage.id === active.id ? "active" : ""}
              key={stage.id}
              onClick={() => setActiveId(stage.id)}
              role="tab"
              type="button"
            >
              <span>{stage.label}</span>
              <strong>{stage.metric}</strong>
            </button>
          ))}
        </div>

        <div className="v3-audit-canvas">
          <div className="v3-scan-frame" aria-hidden="true">
            <i className="scan-line" />
            <i className="scan-node one" />
            <i className="scan-node two" />
            <i className="scan-node three" />
            <i className="scan-node four" />
            <svg viewBox="0 0 420 210" role="img" aria-label="Audit graph preview">
              <path d="M58 110 C 126 38, 168 176, 222 104 S 316 44, 365 116" />
              <path d="M58 154 C 122 116, 178 150, 236 138 S 328 166, 365 92" />
            </svg>
          </div>

          <div className="v3-audit-detail">
            <span>{active.label} stage</span>
            <h3>{active.title}</h3>
            <p>{active.detail}</p>
            <div className="v3-evidence-chips">
              {active.evidence.map((item) => (
                <b key={item}>{item}</b>
              ))}
            </div>
          </div>
        </div>

        <div className="v3-audit-finding">
          <span>Current finding</span>
          <strong>{active.finding}</strong>
        </div>
      </div>
    </div>
  );
}
