from app.intent_detector import IntentDetector
from app.models import IntentType


def test_summarization_detection():
    text = "Please summarize this article for me"
    intent, confidence = IntentDetector.detect(text)
    assert intent == IntentType.SUMMARIZATION
    assert confidence > 0


def test_translation_detection():
    text = "Translate this text to Spanish"
    intent, confidence = IntentDetector.detect(text)
    assert intent == IntentType.TRANSLATION
    assert confidence > 0


def test_sentiment_detection():
    text = "Analyze the sentiment of this review"
    intent, confidence = IntentDetector.detect(text)
    assert intent == IntentType.SENTIMENT
    assert confidence > 0


def test_entity_extraction_detection():
    text = "Extract all named entities from this document"
    intent, confidence = IntentDetector.detect(text)
    assert intent == IntentType.ENTITY_EXTRACTION
    assert confidence > 0


def test_custom_intent():
    text = "What is the meaning of life?"
    intent, confidence = IntentDetector.detect(text)
    assert intent == IntentType.CUSTOM


def test_system_prompts():
    for intent in IntentType:
        prompt = IntentDetector.get_system_prompt(intent)
        assert isinstance(prompt, str)
        assert len(prompt) > 0
