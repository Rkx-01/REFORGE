import logging
import base64
import uuid
import time
import os
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse, Response, FileResponse, RedirectResponse
from app.services import pdf_service, resume_service
from pydantic import BaseModel
from typing import Any

logger = logging.getLogger(__name__)
router = APIRouter()


def _pdf_bytes(upload: UploadFile) -> bytes:
    if upload.content_type != "application/pdf":
        raise HTTPException(400, "pdf files only")
    return upload.file.read()


@router.post("/generate-resume")
async def generate_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
):
    try:
        text = pdf_service.extract_text(_pdf_bytes(resume))
        if not text:
            raise HTTPException(422, "could not extract text from pdf")
        result = await resume_service.generate_resume(text, job_description)
        return JSONResponse(result)
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception(exc)
        raise HTTPException(500, str(exc))


@router.post("/cover-letter")
async def cover_letter(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    applicant_name: str = Form(default=""),
):
    try:
        text = pdf_service.extract_text(_pdf_bytes(resume))
        result = await resume_service.generate_cover_letter(text, job_description, applicant_name)
        return JSONResponse({"cover_letter": result})
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception(exc)
        raise HTTPException(500, str(exc))
