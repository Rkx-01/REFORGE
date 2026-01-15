import logging
import google.generativeai as genai
from app.core.config import settings

logger = logging.getLogger(__name__)
_model = None


def get_model():
    global _model
    if _model is None:
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY missing from .env")
        genai.configure(api_key=settings.GEMINI_API_KEY)
        _model = genai.GenerativeModel(settings.GEMINI_MODEL)
        logger.info("gemini model ready")
    return _model
