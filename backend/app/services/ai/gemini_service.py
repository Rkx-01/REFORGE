import asyncio
import logging
import google.generativeai as genai
from typing import Optional
from app.core.config import settings
from .base import AIBase, AIResponse

logger = logging.getLogger(__name__)

class GeminiService(AIBase):
    def __init__(self):
        if not settings.GEMINI_API_KEY:
            logger.error("GEMINI_API_KEY missing from settings")
            self.client = None
        else:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
            logger.info(f"GeminiService initialized with model {settings.GEMINI_MODEL}")

    async def generate(self, prompt: str, system_instruction: Optional[str] = None) -> AIResponse:
        if not settings.GEMINI_API_KEY:
            return AIResponse(status="error", message="Gemini API Key missing", provider="gemini")

        max_retries = 3
        backoff = 1  # starting backoff in seconds

        for attempt in range(max_retries):
            try:
                # Combine system instruction and prompt for Gemini
                full_prompt = f"{system_instruction}\n\n{prompt}" if system_instruction else prompt
                
                # Gemini's generate_content is synchronous in some versions, 
                # but we'll wrap it for consistency or use async if available.
                # Assuming standard sync SDK usage for now but making it look robust.
                loop = asyncio.get_event_loop()
                response = await loop.run_in_executor(None, lambda: self.model.generate_content(full_prompt))
                
                if not response or not response.text:
                    raise ValueError("Empty response from Gemini")

                return AIResponse(
                    content=response.text,
                    provider="gemini",
                    status="success"
                )

            except Exception as e:
                error_msg = str(e)
                logger.warning(f"Gemini attempt {attempt + 1} failed: {error_msg}")
                
                # Retry specifically for rate limits or temporary service issues
                if "429" in error_msg or "Resource has been exhausted" in error_msg:
                    if attempt < max_retries - 1:
                        logger.info(f"Retrying Gemini in {backoff}s...")
                        await asyncio.sleep(backoff)
                        backoff *= 2
                        continue
                
                # Other errors or final attempt failure
                return AIResponse(
                    status="error",
                    message=error_msg,
                    provider="gemini"
                )
        
        return AIResponse(status="error", message="Max retries reached", provider="gemini")
