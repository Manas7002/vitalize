import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

from data import SYMPTOMS, CONDITIONS, LANGUAGES
from translations import TRANSLATIONS, LANGUAGE_CODES

app = FastAPI(title="Symptom Checker API", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CheckRequest(BaseModel):
    symptoms: List[str] = Field(..., min_length=1)
    lang: str = Field(default="en")
    gender: Optional[str] = Field(default="all")
    age: Optional[str] = Field(default="adult")


class ConditionResult(BaseModel):
    name: str
    score: float
    severity: str
    advice: str
    matched_symptoms: List[str]


class CheckResponse(BaseModel):
    results: List[ConditionResult]
    lang: str


@app.get("/api")
def root():
    return {"status": "ok", "service": "symptom-checker-api"}


@app.get("/api/symptoms")
def get_symptoms(lang: str = "en", gender: str = "all", age: str = "adult"):
    if lang not in LANGUAGES:
        lang = "en"
    labels = TRANSLATIONS.get(lang, TRANSLATIONS["en"])
    result = []
    for key, meta in SYMPTOMS.items():
        sym_gender = meta.get("gender", "all")
        sym_age = meta.get("age", "all")
        if gender != "all" and sym_gender != "all" and sym_gender != gender:
            continue
        if age != "all" and sym_age != "all" and sym_age != age:
            continue
        result.append({
            "key": key,
            "label": labels.get(key, meta["label"]),
            "region": meta["region"],
            "gender": sym_gender,
            "age": sym_age,
        })
    return {"lang": lang, "symptoms": result}


@app.get("/api/languages")
def get_languages():
    return {"languages": [{"code": k, "name": v} for k, v in LANGUAGES.items()]}


@app.post("/api/check", response_model=CheckResponse)
def check_symptoms(req: CheckRequest):
    selected = set(req.symptoms)
    unknown = selected - set(SYMPTOMS.keys())
    if unknown:
        raise HTTPException(status_code=400, detail=f"Unknown symptoms: {sorted(unknown)}")

    lang = req.lang if req.lang in LANGUAGES else "en"
    gender = req.gender if req.gender in ("male", "female", "all") else "all"
    age = req.age if req.age in ("child", "adult", "senior", "all") else "adult"

    results = []
    for condition_name, info in CONDITIONS.items():
        cond_gender = info.get("gender", "all")
        cond_age = info.get("age", "all")
        if gender != "all" and cond_gender != "all" and cond_gender != gender:
            continue
        if age != "all" and cond_age != "all" and cond_age != age:
            continue
        weights = info["weights"]
        matched = selected & set(weights.keys())
        if not matched:
            continue
        raw_score = sum(weights[s] for s in matched)
        max_score = sum(weights.values())
        normalized = round((raw_score / max_score) * 100, 1)
        results.append(ConditionResult(
            name=condition_name,
            score=normalized,
            severity=info["severity"],
            advice=info["advice"],
            matched_symptoms=sorted(matched),
        ))

    results.sort(key=lambda r: r.score, reverse=True)
    return CheckResponse(results=results[:6], lang=lang)