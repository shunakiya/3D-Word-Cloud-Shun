import re
from collections import Counter

import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow requests from Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

stop_words = {
    "the", "and", "that", "this", "with", "from", "have", "has", "had",
    "were", "been", "they", "their", "there", "what", "when", "which",
    "will", "would", "could", "should", "about", "after", "also", "more",
    "than", "into", "some", "said", "told", "just", "like", "over",
    "them", "then", "your", "been", "its", "but", "not", "for",
    # photo credit noise
    "photo", "photos", "file", "credit", "caption", "associated", "press", "img",
}

class AnalyzeRequest(BaseModel):
    url: str

def get_article_text(url: str) -> str:
    response = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})

    if response.status_code != 200:
        raise Exception(f"Request failed with status {response.status_code}")

    soup = BeautifulSoup(response.text, "html.parser")

    # Remove html tags that are irrelevant
    for tag in soup(["script", "style", "nav", "header", "footer", "aside", "title", "img"]):
        tag.decompose()

    paragraphs = soup.find_all("p")

    # Get text from each paragraph
    parts = []
    for p in paragraphs:
        parts.append(p.get_text())

    text = " ".join(parts)
    text = " ".join(text.split())  # remove extra whitespace

    return text


def get_keywords(text: str, top_n: int = 50) -> list[dict]:
    # Letters only and min 4 chars 
    all_words = re.findall(r"[a-zA-Z]{4,}", text.lower())

    # Filter out stop_words
    filtered_words = []
    for word in all_words:
        if word not in stop_words:
            filtered_words.append(word)

    # Count word apperance and grab top N
    counts = Counter(filtered_words)
    top_words = counts.most_common(top_n)

    if not top_words:
        return []

    # Normalize to 0–1 so frontend can scale proportionally
    max_count = top_words[0][1]
    min_count = top_words[-1][1]
    score_range = max_count - min_count or 1  # avoid division by zero

    # Final result list with weights
    results = []
    for word, count in top_words:
        weight = round((count - min_count) / score_range, 4)
        results.append({"word": word, "weight": weight})

    return results


@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    try:
        text = get_article_text(request.url)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch article: {e}")

    keywords = get_keywords(text)
    return {"words": keywords}
