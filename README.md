# 🚀 Reforge: AI-Powered Resume & Cover Letter Generator

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-orange?style=for-the-badge&logo=vercel)](https://reforge-nine.vercel.app/)

Reforge is a professional, ATS-optimized resume builder that leverages the power of Large Language Models (LLMs) to transform your career history into a high-impact document. Built with a "Document Engineering" philosophy, it ensures pixel-perfect A4 exports and rigorous structural compliance for modern Applicant Tracking Systems.

---

## ✨ Key Features

- **🧠 AI-Driven Extraction**: Automatically parses raw resumes and job descriptions using Google Gemini and Groq (Llama 3).
- **📝 ATS Optimization**: Intelligent keyword injection and structural formatting to maximize recruiter visibility.
- **🎨 Multi-Template System**: Choose between 4+ professional, mathematically balanced layouts (Modern, Classic, Compact, Two-Column).
- **📄 Document Engineering**: A4 pixel-perfect PDF generation with strict pagination control and no browser-native print noise.
- **✉️ Cover Letter Generation**: Instantly craft tailored cover letters that align your experience with specific job requirements.
- **🔒 Privacy First**: Your data stays local until processing, and API keys are never stored on-server.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Vanilla CSS (Strict Design Tokens)
- **Components**: Radix UI + Framer Motion (Micro-animations)
- **Language**: TypeScript

### Backend
- **Framework**: FastAPI (Python)
- **AI Orchestration**: LangChain + Pydantic AI
- **Models**: Google Gemini 1.5 Flash, Groq (Llama 3.3 70B)
- **PDF Engine**: Puppeteer-based high-fidelity rendering

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- API Keys: [Google AI Studio](https://aistudio.google.com/) and [Groq Cloud](https://console.groq.com/)

### 1. Clone & Setup
```bash
git clone https://github.com/Rkx-01/REFORGE.git
cd REFORGE
```

### 2. Backend Configuration
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Gemini/Groq API keys
uvicorn main:app --reload
```

### 3. Frontend Configuration
```bash
cd ../frontend
npm install
cp .env.example .env.local
# Edit .env.local with NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
npm run dev
```

---

## 🌍 Deployment

### 🛰 Backend (Render / Railway)
1. Set **Root Directory** to `backend`.
2. Use the provided `Procfile` for automatic process management.
3. Configure `GEMINI_API_KEY` and `GROQ_API_KEY` in the provider's dashboard.

### ⚛️ Frontend (Vercel)
1. Set **Root Directory** to `frontend`.
2. Add the environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend.

---

## 🔒 Security & Privacy
Reforge is designed with security in mind:
- **Zero-Persistence**: Resumes are processed in-memory and temporary files are purged immediately after generation.
- **Key Safety**: `.env` files are strictly ignored by Git to prevent accidental key exposure.

---

## 📜 License
Internal use only.

---

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---
*Developed with ❤️ by the Reforge Team.*
