from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.audit import AuditRun
from app.models.project import Project
from app.models.user import User
from app.schemas.audit import AuditCreate, AuditRead
from app.tasks.audit_tasks import run_deep_audit

router = APIRouter(prefix="/audits", tags=["audits"])


@router.get("", response_model=list[AuditRead])
def list_audits(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = (
        select(AuditRun)
        .join(Project)
        .where(Project.owner_id == current_user.id)
        .order_by(AuditRun.created_at.desc())
        .limit(25)
    )
    return list(db.scalars(query).all())


@router.post("", response_model=AuditRead, status_code=202)
def create_audit(
    payload: AuditCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    root_url = str(payload.target_url)
    project = Project(owner_id=current_user.id, name=root_url, root_url=root_url)
    db.add(project)
    db.flush()

    audit = AuditRun(
        project_id=project.id,
        target_url=root_url,
        crawl_budget=min(max(payload.crawl_budget, 100), 10000),
        status="queued",
        findings={"summary": "Audit accepted by API and waiting for Celery worker."},
    )
    db.add(audit)
    db.commit()
    db.refresh(audit)

    try:
        run_deep_audit.delay(audit.id)
    except Exception as exc:
        audit.status = "queued_without_worker"
        audit.findings = {"summary": "Audit saved, but Celery broker was unavailable.", "error": str(exc)}
        db.commit()
        db.refresh(audit)

    return audit


@router.get("/{audit_id}", response_model=AuditRead)
def get_audit(
    audit_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(AuditRun).join(Project).where(AuditRun.id == audit_id, Project.owner_id == current_user.id)
    audit = db.scalar(query)
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")
    return audit
