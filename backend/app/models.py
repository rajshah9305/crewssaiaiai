from enum import Enum
from typing import Any, Dict, Optional

from pydantic import BaseModel, Field, validator


class IntentType(str, Enum):
    """Supported NLP task intents"""
    SUMMARIZATION = "summarization"
    TRANSLATION = "translation"
    SENTIMENT = "sentiment"
    ENTITY_EXTRACTION = "entity_extraction"
    TEXT_GENERATION = "text_generation"
    CUSTOM = "custom"


class ProcessRequest(BaseModel):
    """Request model for NLP processing"""
    text: str = Field(..., min_length=1, max_length=100000, description="Input text to process")
    api_key: str = Field(..., min_length=10, description="Groq API key")
    model: Optional[str] = Field(None, description="Groq model to use")
    options: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional options")

    @validator('text')
    def sanitize_text(cls, v):
        """Basic input sanitization"""
        if not v or not v.strip():
            raise ValueError("Text cannot be empty")
        return v.strip()

    @validator('api_key')
    def validate_api_key(cls, v):
        """Validate API key format"""
        if not v.startswith('gsk_'):
            raise ValueError("Invalid Groq API key format")
        return v


class ProcessResponse(BaseModel):
    """Response model for NLP processing"""
    intent: str = Field(..., description="Detected intent")
    result: str = Field(..., description="Processing result")
    model: str = Field(..., description="Model used")
    tokens_used: Optional[int] = Field(None, description="Tokens consumed")
    processing_time: float = Field(..., description="Processing time in seconds")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional metadata")


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")
    code: str = Field(..., description="Error code")
