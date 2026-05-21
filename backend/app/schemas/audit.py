from datetime import datetime

from pydantic import BaseModel, HttpUrl


class AuditCreate(BaseModel):
    target_url: HttpUrl
    crawl_budget: int = 10000


class AuditRead(BaseModel):
    id: str
    target_url: str
    status: str
    crawl_budget: int
    discovered_urls: int
    fetched_urls: int
    rendered_urls: int
    findings: dict
    created_at: datetime

    model_config = {"from_attributes": True}
