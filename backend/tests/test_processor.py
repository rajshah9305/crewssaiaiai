import pytest
from unittest.mock import MagicMock, patch
from app.processor import NLPProcessor
from app.models import IntentType

@pytest.mark.asyncio
async def test_processor_init():
    processor = NLPProcessor(api_key="gsk_test")
    assert processor.api_key == "gsk_test"
    assert processor.model == "llama-3.3-70b-versatile"

@pytest.mark.asyncio
async def test_process_with_groq_fallback():
    processor = NLPProcessor(api_key="gsk_test")

    with patch.object(processor.groq_client.chat.completions, 'create') as mock_create:
        mock_response = MagicMock()
        mock_response.choices = [MagicMock(message=MagicMock(content="Test result"))]
        mock_response.usage = MagicMock(total_tokens=10)
        mock_create.return_value = mock_response

        # We use a text that should have low confidence or CUSTOM intent
        result = await processor.process("Some random text", {})

        assert result.result == "Test result"
        assert result.tokens_used == 10
