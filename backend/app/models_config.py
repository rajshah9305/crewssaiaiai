"""Groq model configurations"""

GROQ_MODELS = {
    "openai/gpt-oss-120b": {
        "name": "GPT OSS 120B",
        "description": "Most powerful model with reasoning and tools support",
        "max_tokens": 65536,
        "supports_reasoning": True,
        "supports_tools": True,
        "default_temperature": 1.0,
    },
    "meta-llama/llama-4-maverick-17b-128e-instruct": {
        "name": "Llama 4 Maverick 17B",
        "description": "Fast and efficient for general tasks",
        "max_tokens": 8192,
        "supports_reasoning": False,
        "supports_tools": False,
        "default_temperature": 1.0,
    },
    "meta-llama/llama-4-scout-17b-16e-instruct": {
        "name": "Llama 4 Scout 17B",
        "description": "Optimized for quick responses",
        "max_tokens": 8192,
        "supports_reasoning": False,
        "supports_tools": False,
        "default_temperature": 1.0,
    },
    "moonshotai/kimi-k2-instruct-0905": {
        "name": "Kimi K2 Instruct",
        "description": "Balanced performance and quality",
        "max_tokens": 16384,
        "supports_reasoning": False,
        "supports_tools": False,
        "default_temperature": 0.7,
    },
    "llama-3.3-70b-versatile": {
        "name": "Llama 3.3 70B Versatile",
        "description": "Versatile model for various tasks",
        "max_tokens": 32768,
        "supports_reasoning": False,
        "supports_tools": False,
        "default_temperature": 1.0,
    },
}

DEFAULT_MODEL = "openai/gpt-oss-120b"


def get_model_config(model_name: str):
    """Get configuration for a specific model"""
    return GROQ_MODELS.get(model_name, GROQ_MODELS[DEFAULT_MODEL])


def is_valid_model(model_name: str) -> bool:
    """Check if model is supported"""
    return model_name in GROQ_MODELS
