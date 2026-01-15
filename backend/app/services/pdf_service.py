import io
import logging
import pdfplumber

logger = logging.getLogger(__name__)


def extract_text(file_bytes: bytes) -> str:
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = "\n".join(p.extract_text() or "" for p in pdf.pages).strip()
            logger.info(f"extracted {len(text)} chars from {len(pdf.pages)} pages")
            return text
    except Exception as exc:
        logger.error(exc)
        raise ValueError(f"could not read pdf: {exc}")


def extract_text(file_bytes: bytes) -> str:
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = "\n".join(p.extract_text() or "" for p in pdf.pages).strip()
            logger.info(f"extracted {len(text)} chars from {len(pdf.pages)} pages")
            return text
    except Exception as exc:
        logger.error(exc)
        raise ValueError(f"could not read pdf: {exc}")
