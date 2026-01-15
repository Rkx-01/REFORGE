from abc import ABC, abstractmethod
from typing import Dict, Optional, Any
from pydantic import BaseModel

class AIResponse(BaseModel):
    content: Optional[str] = None
    provider: str
    tokens_used: Optional[int] = None
    status: str = "success"
    message: Optional[str] = None

class AIBase(ABC):
    @abstractmethod
    async def generate(self, prompt: str, system_instruction: Optional[str] = None) -> AIResponse:
        """
        Base method to generate AI responses.
        Must be implemented by all providers.
        """
        pass
