# BeyondChats – Full Stack Web Developer Intern Assignment

This repository contains my complete submission for the **BeyondChats Full Stack Web Developer Intern Assignment**, covering all three required phases: backend scraping & APIs, automation with competitor analysis and LLM rewriting, and a React-based frontend.

---

## 🔹 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Cheerio (Web Scraping)
- Axios
- dotenv

### Frontend
- React (Vite)
- Axios

---

## 🔹 Phase 1: Backend & Scraping

### Features
- Scrapes the **5 oldest articles** from BeyondChats blog
- Stores articles in MongoDB
- Exposes full **CRUD APIs** for articles

### APIs
- `GET /api/articles`
- `GET /api/articles/:id`
- `POST /api/articles`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`

---

## 🔹 Phase 2: Automation Script (Core Logic)

A Node.js script automates content improvement using competitor analysis.

### Workflow
1. Fetches articles from backend APIs
2. Searches article titles on Google (via SERP API)
3. Extracts top competing articles from other websites
4. Scrapes competitor article content
5. Uses an LLM to rewrite the original article:
   - Improved structure
   - Better readability
   - SEO-friendly formatting
6. Saves the updated article via API
7. Stores reference URLs for transparency

> **Note:**  
> LLM integration is handled securely via environment variables.  
> No API keys are committed to the repository.

---

## 🔹 Phase 3: Frontend (React)

A clean and responsive React UI to view articles.

### Features
- Displays list of articles
- Click to view:
  - Original article content
  - Updated article content
  - Reference links
- Simple, professional UI

---

## 🔹 Project Structure

beyondchats-fullstack-assignment/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── services/
│ │ └── server.js
│ ├── scripts/
│ │ └── updateArticles.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ └── App.jsx
│ └── package.json
│
└── README.md

yaml
Copy code

---

## 🔹 Local Setup Instructions

### Backend
```
cd backend
npm install
npm run dev
```

Create a .env file in backend/:
env
```
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_llm_api_key
SERPAPI_KEY=your_serp_api_key
```

Frontend
```
cd frontend
npm install
npm run dev
```

Frontend runs at:
`http://localhost:5173`

Backend runs at:
`http://localhost:5000`

🔹 Architecture Overview
Scraper → MongoDB

REST APIs → Automation Script

Automation Script → Google Search → Competitor Scraping → LLM Rewrite

Updated content saved back via APIs

React frontend consumes backend APIs


🔹 Notes
Environment variables are used for all secrets

Code is modular, readable, and documented

Error handling added at each critical step


Thank you for reviewing my submission.
