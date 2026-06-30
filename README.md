# Vitalize 🩺

*Empowering health through intelligent symptom assessment.*

## 📖 About

Vitalize is an AI-assisted symptom checker designed to help users understand their health concerns. By analyzing user-reported symptoms based on biological sex and age, Vitalize provides actionable health insights and helps users find relevant medical professionals.

**Disclaimer:** Vitalize is an informational tool for personal reference only. It does not provide medical diagnoses and should not replace professional medical advice. Always consult a qualified healthcare professional.

**🔗 Live Demo:** [vitalize-beta.vercel.app](https://vitalize-beta.vercel.app/)

## 🚀 Key Features

- **Intelligent Triage:** Personalized symptom analysis based on demographic data (gender and age group).
- **Interactive Body Map:** Visually select affected regions (front and back views) for a more intuitive experience.
- **Multilingual Support:** Access health insights in English, Hindi, and Telugu.
- **PDF Reporting:** Download and save detailed health reports for your records.
- **Doctor Locator:** Easily find nearby medical professionals based on your symptoms.

## 🛠 Tech Stack

- **Frontend:** React, Vite, plain CSS (glass-morphism UI)
- **Backend:** FastAPI (Python)
- **Data Processing:** Custom rule-based algorithm for symptom-to-condition matching
- **Deployment:** Vercel (unified frontend + backend serverless deployment)

## 📂 Project Structure
vitalize/

├── backend/

│   ├── main.py            # API entry point & routes

│   ├── data.py             # Symptom/condition datasets

│   ├── translations.py     # Multilingual label mappings

│   └── requirements.txt

├── frontend/

│   ├── src/

│   │   ├── App.jsx          # Main application state

│   │   ├── BodyMap.jsx      # Interactive SVG body map

│   │   ├── DoctorFinder.jsx # Nearby doctor search

│   │   └── *.css

│   └── public/

├── vercel.json              # Unified deployment config

└── README.md

## 📋 Getting Started

### Prerequisites

- Node.js (for frontend)
- Python 3.10+ (for backend)

### Installation

Clone the repository:

```bash
git clone https://github.com/Manas7002/vitalize.git
cd vitalize
```

Run the backend:

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Run the frontend (in a separate terminal):

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` — the Vite dev server proxies `/api` requests to the backend on port 8000.

## 🗺️ Roadmap

- [ ] **Advanced Analytics:** Add historical tracking of user reports.
- [ ] **Doctor Verification:** Integrate real-time API for hospital availability.
- [ ] **Accessibility:** Improve keyboard navigation for the Body Map.
- [ ] **Auth:** Add user profiles to save health history securely.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.