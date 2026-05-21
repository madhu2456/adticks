export const crawlPipeline = [
  "audit.created",
  "seed.normalized",
  "robots.discovered",
  "sitemaps.expanded",
  "frontier.enqueued",
  "page.fetched",
  "page.extracted",
  "render.decided",
  "page.rendered",
  "links.discovered",
  "findings.generated",
  "graph.scored",
  "recommendations.generated",
] as const;

export type CrawlPipelineEvent = (typeof crawlPipeline)[number];

export const crawlGuards = {
  maxUrlsPerAudit: 10000,
  maxRedirectHops: 10,
  maxUrlLength: 2000,
  defaultHostConcurrency: 2,
  defaultRenderConcurrency: 1,
} as const;
