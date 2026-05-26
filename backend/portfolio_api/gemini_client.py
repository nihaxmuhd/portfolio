import json
from urllib import error, request

from django.conf import settings


SYSTEM_PROMPT = """You are the AI assistant for Nihad's portfolio website.

Nihad is a full-stack developer focused on:

* Django
* Django REST Framework
* React
* Modern responsive UI design

He builds scalable backend systems and modern frontend applications.

Projects include:

* Portfolio website
* E-commerce platform
* Authentication systems
* Admin dashboards

Reply professionally, clearly, and concisely.
Encourage visitors to explore projects and contact information when relevant."""


class GeminiChatError(Exception):
    pass


def _format_history(history):
    formatted = []
    for item in history or []:
        role = 'model' if item.get('role') == 'assistant' else 'user'
        text = str(item.get('text', '')).strip()
        if text:
            formatted.append({
                'role': role,
                'parts': [{'text': text}],
            })
    return formatted


def generate_chat_reply(message, history=None):
    api_key = settings.GEMINI_API_KEY
    model = settings.GEMINI_MODEL

    if not api_key:
        raise GeminiChatError('The AI assistant is not configured yet. Please add GEMINI_API_KEY in the backend .env file.')

    payload = {
        'systemInstruction': {
            'parts': [{'text': SYSTEM_PROMPT}],
        },
        'contents': [
            *_format_history(history),
            {
                'role': 'user',
                'parts': [{'text': message}],
            },
        ],
        'generationConfig': {
            'temperature': 0.7,
            'topP': 0.9,
            'maxOutputTokens': 512,
        },
    }

    gemini_request = request.Request(
        url=f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'x-goog-api-key': api_key,
        },
        method='POST',
    )

    try:
        with request.urlopen(gemini_request, timeout=25) as response:
            body = json.loads(response.read().decode('utf-8'))
    except error.HTTPError as exc:
        try:
            details = json.loads(exc.read().decode('utf-8'))
            api_message = details.get('error', {}).get('message')
        except Exception:
            api_message = None
        raise GeminiChatError(api_message or 'The AI assistant is unavailable right now. Please try again in a moment.') from exc
    except error.URLError as exc:
        raise GeminiChatError('Unable to reach the AI service right now. Please try again shortly.') from exc
    except Exception as exc:
        raise GeminiChatError('The AI assistant hit an unexpected issue. Please try again later.') from exc

    try:
        candidates = body.get('candidates') or []
        parts = candidates[0]['content']['parts']
        reply = ''.join(part.get('text', '') for part in parts).strip()
    except Exception as exc:
        raise GeminiChatError('The AI assistant returned an unreadable response. Please try again.') from exc

    if not reply:
        raise GeminiChatError('The AI assistant did not return a message. Please try again.')

    return reply
