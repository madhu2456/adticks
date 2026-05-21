export type AuditStatus =
  | "queued"
  | "discovering"
  | "crawling"
  | "rendering"
  | "analyzing"
  | "completed"
  | "completed_with_errors";

export type Severity = "critical" | "high" | "medium" | "low";

export type AuditStage = {
  id: string;
  label: string;
  status: "queued" | "running" | "completed" | "blocked";
  progress: number;
};

export type AuditFinding = {
  id: string;
  title: string;
  severity: Severity;
  affectedUrls: number;
  evidence: string;
  recommendation: string;
};

export type AuditMetric = {
  label: string;
  value: string;
  detail: string;
};

export type LinkNode = {
  label: string;
  x: string;
  y: string;
  size: string;
  kind: "home" | "hub" | "leaf";
};

export type CrawledPage = {
  path: string;
  statusCode: number;
  depth: number;
  indexable: boolean;
  renderMode: "raw" | "rendered" | "queued";
  score: number;
};

export type AuditRun = {
  id: string;
  projectName: string;
  targetUrl: string;
  status: AuditStatus;
  crawlBudget: number;
  discoveredUrls: number;
  fetchedUrls: number;
  renderedUrls: number;
  blockedUrls: number;
  startedAt: string;
  metrics: AuditMetric[];
  stages: AuditStage[];
  findings: AuditFinding[];
  graphNodes: LinkNode[];
  pages: CrawledPage[];
};
