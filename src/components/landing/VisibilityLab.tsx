"use client";

import { useState } from "react";

const layers = [
  {
    id: "ai",
    title: "AI visibility tracking",
    metric: "31%",
    delta: "+11%",
    accent: "blue",
    copy: "Track ChatGPT visibility, Perplexity visibility, Gemini presence, AI Overview citations, prompt coverage, and AI share of voice.",
    evidence: ["Prompt coverage", "Citation gaps", "Competitor mentions"],
    action: "Add entity-backed answer blocks to the top 14 commercial pages.",
  },
  {
    id: "seo",
    title: "SEO visibility measurement",
    metric: "84",
    delta: "+8.4",
    accent: "green",
    copy: "Measure rankings, search demand, topic clusters, SERP features, CTR opportunities, and competitor movement by page group.",
    evidence: ["SERP movement", "Topic clusters", "CTR loss"],
    action: "Refresh pages losing featured snippets before expanding new content.",
  },
  {
    id: "crawl",
    title: "Technical SEO audit",
    metric: "12%",
    delta: "risk",
    accent: "amber",
    copy: "Quantify crawl waste, indexability loss, canonical conflicts, redirect chains, robots.txt risks, sitemap gaps, and index bloat.",
    evidence: ["Crawl waste", "Canonical conflicts", "Blocked AI bots"],
    action: "Collapse faceted duplicate paths and expose canonical category URLs.",
  },
  {
    id: "citation",
    title: "AI citation readiness",
    metric: "42",
    delta: "+6",
    accent: "violet",
    copy: "Score extractable answers, structured data, entity coverage, evidence blocks, FAQ quality, summaries, and source confidence.",
    evidence: ["Answer clarity", "Schema depth", "Source confidence"],
    action: "Add compact answer summaries with verifiable source references.",
  },
  {
    id: "links",
    title: "Internal linking analysis",
    metric: "18",
    delta: "leaks",
    accent: "green",
    copy: "Expose weak hubs, orphan pages, buried templates, poor anchors, and internal links that leak topical authority.",
    evidence: ["PageRank flow", "Orphan pockets", "Anchor mismatch"],
    action: "Route authority from hub pages into high-intent comparison pages.",
  },
  {
    id: "gap",
    title: "Competitive gap analysis",
    metric: "7",
    delta: "wins",
    accent: "blue",
    copy: "Compare the topics, pages, snippets, AI answers, citations, content formats, and technical access competitors already own.",
    evidence: ["Topic gaps", "AI answer owners", "Snippet formats"],
    action: "Prioritize seven missing buyer-intent pages competitors already get cited for.",
  },
];

export function VisibilityLab() {
  const [activeId, setActiveId] = useState(layers[0].id);
  const active = layers.find((layer) => layer.id === activeId) ?? layers[0];

  return (
    <div className="v3-visibility-lab">
      <div className="v3-lab-selector" aria-label="Measurement layers">
        {layers.map((layer) => (
          <button
            className={layer.id === active.id ? "active" : ""}
            key={layer.id}
            onClick={() => setActiveId(layer.id)}
            type="button"
          >
            <span>{layer.title}</span>
            <strong>{layer.metric}</strong>
            <small>{layer.delta}</small>
          </button>
        ))}
      </div>

      <div className={`v3-lab-screen ${active.accent}`}>
        <div className="v3-lab-screen-top">
          <span>Live measurement layer</span>
          <strong>{active.title}</strong>
        </div>

        <div className="v3-lab-canvas" aria-hidden="true">
          <i className="lab-core">{active.metric}</i>
          <i className="lab-ring one" />
          <i className="lab-ring two" />
          <i className="lab-ray ray-a" />
          <i className="lab-ray ray-b" />
          <i className="lab-ray ray-c" />
          <b className="lab-node node-a">crawl</b>
          <b className="lab-node node-b">render</b>
          <b className="lab-node node-c">entity</b>
          <b className="lab-node node-d">answer</b>
        </div>

        <div className="v3-lab-detail">
          <p>{active.copy}</p>
          <div className="v3-lab-evidence">
            {active.evidence.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="v3-lab-action">
            <span>Next best action</span>
            <strong>{active.action}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
