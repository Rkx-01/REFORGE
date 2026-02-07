import logging
from typing import List, Optional
from .base import AIBase, AIResponse
from .gemini_service import GeminiService
from .groq_service import GroqService
from .openai_service import OpenAIService

logger = logging.getLogger(__name__)

class AIOrchestrator:
    def __init__(self):
        # Initialize providers in order of priority
        self.providers: List[AIBase] = [
            GeminiService(),
            GroqService(),
            OpenAIService()
        ]
        logger.info(f"AIOrchestrator loaded with {len(self.providers)} providers")

    async def generate(self, prompt: str, system_instruction: Optional[str] = None) -> AIResponse:
        """
        Orchestrates the fallback chain: Gemini -> Groq -> OpenAI.
        """
        last_error = None
        
        for provider in self.providers:
            try:
                logger.info(f"Attempting generation with {provider.__class__.__name__}")
                response = await provider.generate(prompt, system_instruction)
                
                if response.status == "success":
                    logger.info(f"Successfully generated response using {response.provider}")
                    return response
                
                logger.warning(f"{response.provider} returned an error: {response.message}")
                last_error = response.message
                
            except Exception as e:
                logger.error(f"Unexpected error in {provider.__class__.__name__}: {str(e)}")
                last_error = str(e)
                continue
        
        # If all providers fail
        logger.error("All AI providers failed to generate a response.")
        return AIResponse(
            status="error",
            message=f"All providers exhausted. Last error: {last_error}",
            provider="orchestrator"
        )

# Global singleton or instance
orchestrator = AIOrchestrator()
