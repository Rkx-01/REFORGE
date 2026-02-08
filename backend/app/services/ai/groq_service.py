import httpx
import logging
import asyncio
from typing import Optional
from app.core.config import settings
from .base import AIBase, AIResponse

logger = logging.getLogger(__name__)

class GroqService(AIBase):
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.model = settings.GROQ_MODEL
        self.url = "https://api.groq.com/openai/v1/chat/completions"
        if self.api_key:
            logger.info(f"GroqService initialized with model {self.model}")

    async def generate(self, prompt: str, system_instruction: Optional[str] = None) -> AIResponse:
        if not self.api_key:
            return AIResponse(status="error", message="Groq API Key missing", provider="groq")

        messages = []
        if system_instruction:
            messages.append({"role": "system", "content": system_instruction})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.7
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        max_retries = 2
        backoff = 1

        async with httpx.AsyncClient(timeout=30.0) as client:
            for attempt in range(max_retries):
                try:
                    response = await client.post(self.url, json=payload, headers=headers)
                    
                    if response.status_code == 429:
                        if attempt < max_retries - 1:
                            logger.info(f"Groq 429 detected. Retrying in {backoff}s...")
                            await asyncio.sleep(backoff)
                            backoff *= 2
                            continue
                    
                    response.raise_for_status()
                    data = response.json()
                    content = data["choices"][0]["message"]["content"]

                    return AIResponse(
                        content=content,
                        provider="groq",
                        status="success"
                    )

                except Exception as e:
                    logger.warning(f"Groq attempt {attempt + 1} failed: {str(e)}")
                    if attempt == max_retries - 1:
                        return AIResponse(
                            status="error",
                            message=str(e),
                            provider="groq"
                        )
        
        return AIResponse(status="error", message="Unreachable state in GroqService", provider="groq")
