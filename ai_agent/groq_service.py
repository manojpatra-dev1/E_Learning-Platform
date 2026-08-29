import requests
import json
from django.conf import settings


def _call_groq(prompt, json_mode=True):
    """
    Shared low-level caller for the Groq API.
    json_mode=True  -> forces the model to return valid JSON (used for extraction/classification)
    json_mode=False -> returns raw text (used for code generation)
    """
    payload = {
        "model": settings.GROQ_MODEL,
        "messages": [{"role": "user", "content": prompt}],
    }
    if json_mode:
        payload["response_format"] = {"type": "json_object"}

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=60,
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]


def ask_groq(prompt):
    """
    Sends a prompt to the Groq API and returns a parsed JSON dict.
    The prompt should instruct the model to return valid JSON.
    """
    raw_text = _call_groq(prompt, json_mode=True)
    return json.loads(raw_text)


def ask_groq_text(prompt):
    """
    Same as ask_groq but returns raw text, not JSON (used for code generation).
    """
    return _call_groq(prompt, json_mode=False)