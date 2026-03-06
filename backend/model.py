"""
SafeHer AI - Harassment Detection Model
Uses Hugging Face's toxic-bert model for detecting toxic/abusive language
"""

from transformers import pipeline

# Initialize the toxic text classifier
classifier = pipeline("text-classification", model="unitary/toxic-bert")


def detect_harassment(text: str) -> bool:
    """
    Analyze text for harassment/toxic content.
    
    Args:
        text: The message text to analyze
        
    Returns:
        True if harassment/toxic content detected with high confidence,
        False otherwise
    """
    if not text or not text.strip():
        return False
    
    try:
        result = classifier(text)[0]
        
        # Flag as harassment if toxic with confidence > 70%
        if result["label"] == "toxic" and result["score"] > 0.7:
            return True
        return False
    
    except Exception as e:
        print(f"Error analyzing text: {e}")
        return False


def get_threat_score(text: str) -> dict:
    """
    Get detailed threat analysis with score.
    
    Args:
        text: The message text to analyze
        
    Returns:
        Dictionary with threat label and confidence score
    """
    if not text or not text.strip():
        return {"label": "safe", "score": 0.0, "is_threat": False}
    
    try:
        result = classifier(text)[0]
        is_threat = result["label"] == "toxic" and result["score"] > 0.7
        
        return {
            "label": result["label"],
            "score": round(result["score"], 4),
            "is_threat": is_threat
        }
    
    except Exception as e:
        print(f"Error analyzing text: {e}")
        return {"label": "error", "score": 0.0, "is_threat": False}
