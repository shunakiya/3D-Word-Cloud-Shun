#!/bin/bash

# Install backend dependencies
cd backend
pip install fastapi uvicorn requests beautifulsoup4
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

# Start both servers concurrently
cd backend && uvicorn main:app --reload &
cd frontend && npm run dev
