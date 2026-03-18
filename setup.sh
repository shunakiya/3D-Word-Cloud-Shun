#!/bin/bash

# Install backend dependencies
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn requests beautifulsoup4
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

# Start both servers concurrently
cd backend && source venv/bin/activate && uvicorn main:app --reload &
cd frontend && npm run dev
