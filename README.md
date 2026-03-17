# 3D Word Cloud

Paste a news article URL and get an interactive 3D word cloud of its most frequent topics.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Three Fiber
- Backend: Python, FastAPI, BeautifulSoup

## Setup

Run the setup script from the root directory (macOS):

```bash
chmod +x setup.sh
./setup.sh
```

This installs all dependencies and starts both servers. Then open http://localhost:5173, paste a news article URL, and hit Enter.

**Manual setup (if needed)**

Backend:
```bash
cd backend
pip install fastapi uvicorn requests beautifulsoup4
uvicorn main:app --reload
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```
