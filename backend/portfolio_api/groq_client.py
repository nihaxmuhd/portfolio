import requests

from django.conf import settings


SYSTEM_PROMPT = """
You are the AI assistant for Nihad's portfolio website.

Nihad is a full-stack developer focused on:
- Django
- Django REST Framework
- React
- Modern responsive UI design

He builds scalable backend systems and modern frontend applications.

Projects include:
- Portfolio website
- E-commerce platform
- Authentication systems
- Admin dashboards

Reply professionally, clearly, and concisely.
Encourage visitors to explore projects and contact information when relevant.
"""


class AIChatError(Exception):
    pass


def generate_chat_reply(message, history=None):
    api_key = settings.GROQ_API_KEY
    model = settings.GROQ_MODEL

    if not api_key:
        raise AIChatError("Missing GROQ_API_KEY in .env")

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        }
    ]

    for item in history or []:
        role = "assistant" if item.get("role") == "assistant" else "user"

        messages.append({
            "role": role,
            "content": item.get("text", "")
        })

    messages.append({
        "role": "user",
        "content": message
    })

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": model,
                "messages": messages,
                "temperature": 0.7
            },
            timeout=30
        )

        print(response.text)

        data = response.json()

        if response.status_code != 200:
            raise AIChatError(data)

        reply = data["choices"][0]["message"]["content"]

        return reply

    except Exception as exc:
        print("GROQ ERROR:", str(exc))
        raise AIChatError(
            "AI assistant unavailable right now."
        ) from exc