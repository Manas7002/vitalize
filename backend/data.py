SYMPTOMS = {
    # Head
    "headache":            {"region": "head",       "label": "Headache"},
    "fever":               {"region": "head",       "label": "Fever"},
    "dizziness":           {"region": "head",       "label": "Dizziness"},
    "runny_nose":          {"region": "head",       "label": "Runny Nose"},
    "ear_pain":            {"region": "head",       "label": "Ear Pain"},
    "vision_blur":         {"region": "head",       "label": "Blurred Vision"},
    "memory_issues":       {"region": "head",       "label": "Memory Issues"},
    "confusion":           {"region": "head",       "label": "Confusion"},
    # Neck
    "sore_throat":         {"region": "neck",       "label": "Sore Throat"},
    "neck_stiffness":      {"region": "neck",       "label": "Neck Stiffness"},
    "swollen_glands":      {"region": "neck",       "label": "Swollen Glands"},
    # Chest
    "cough":               {"region": "chest",      "label": "Cough"},
    "chest_pain":          {"region": "chest",      "label": "Chest Pain"},
    "shortness_of_breath": {"region": "chest",      "label": "Shortness of Breath"},
    "heart_palpitations":  {"region": "chest",      "label": "Heart Palpitations"},
    "wheezing":            {"region": "chest",      "label": "Wheezing"},
    # Abdomen
    "nausea":              {"region": "abdomen",    "label": "Nausea"},
    "vomiting":            {"region": "abdomen",    "label": "Vomiting"},
    "abdominal_pain":      {"region": "abdomen",    "label": "Abdominal Pain"},
    "diarrhea":            {"region": "abdomen",    "label": "Diarrhea"},
    "bloating":            {"region": "abdomen",    "label": "Bloating"},
    "loss_of_appetite":    {"region": "abdomen",    "label": "Loss of Appetite"},
    "constipation":        {"region": "abdomen",    "label": "Constipation"},
    # Torso
    "fatigue":             {"region": "torso",      "label": "Fatigue"},
    "muscle_ache":         {"region": "torso",      "label": "Muscle Ache"},
    "chills":              {"region": "torso",      "label": "Chills"},
    "rash":                {"region": "torso",      "label": "Skin Rash"},
    "night_sweats":        {"region": "torso",      "label": "Night Sweats"},
    "weight_loss":         {"region": "torso",      "label": "Unexplained Weight Loss"},
    "itching":             {"region": "torso",      "label": "Itching"},
    # Back
    "upper_back_pain":     {"region": "upper_back", "label": "Upper Back Pain"},
    "lower_back_pain":     {"region": "lower_back", "label": "Lower Back Pain"},
    "spine_pain":          {"region": "upper_back", "label": "Spine Pain"},
    "hip_pain":            {"region": "glutes",     "label": "Hip / Glute Pain"},
    "tailbone_pain":       {"region": "glutes",     "label": "Tailbone Pain"},
    # Arms
    "arm_weakness":        {"region": "arms",       "label": "Arm Weakness"},
    "arm_pain":            {"region": "arms",       "label": "Arm / Shoulder Pain"},
    "numbness_hands":      {"region": "arms",       "label": "Numbness in Hands"},
    # Legs
    "joint_pain":          {"region": "legs",       "label": "Joint Pain"},
    "leg_swelling":        {"region": "legs",       "label": "Leg Swelling"},
    "leg_cramps":          {"region": "legs",       "label": "Leg Cramps"},
    "leg_weakness":        {"region": "legs",       "label": "Leg Weakness"},
    "numbness_feet":       {"region": "legs",       "label": "Numbness in Feet"},

    # Female only
    "menstrual_cramps":    {"region": "pelvis",  "label": "Menstrual Cramps",           "gender": "female"},
    "irregular_periods":   {"region": "pelvis",  "label": "Irregular Periods",          "gender": "female"},
    "heavy_bleeding":      {"region": "pelvis",  "label": "Heavy Menstrual Bleeding",   "gender": "female"},
    "pelvic_pain":         {"region": "pelvis",  "label": "Pelvic Pain",                "gender": "female"},
    "breast_pain":         {"region": "chest_f", "label": "Breast Pain / Tenderness",   "gender": "female"},
    "breast_lump":         {"region": "chest_f", "label": "Breast Lump",                "gender": "female"},
    "vaginal_discharge":   {"region": "pelvis",  "label": "Unusual Vaginal Discharge",  "gender": "female"},
    "hot_flashes":         {"region": "torso",   "label": "Hot Flashes",                "gender": "female"},
    "mood_swings":         {"region": "head",    "label": "Mood Swings",                "gender": "female"},

    # Male only
    "groin_pain":           {"region": "groin", "label": "Groin Pain",                  "gender": "male"},
    "testicular_pain":      {"region": "groin", "label": "Testicular Pain",             "gender": "male"},
    "testicular_lump":      {"region": "groin", "label": "Testicular Lump",             "gender": "male"},
    "difficulty_urinating": {"region": "groin", "label": "Difficulty Urinating",        "gender": "male"},
    "erectile_issues":      {"region": "groin", "label": "Erectile Dysfunction",        "gender": "male"},
    "prostate_pressure":    {"region": "groin", "label": "Pelvic / Prostate Pressure",  "gender": "male"},
    "low_libido_m":         {"region": "groin", "label": "Low Libido",                  "gender": "male"},

    # Child only
    "ear_tugging":          {"region": "head",    "label": "Ear Tugging / Pulling",     "age": "child"},
    "teething_pain":        {"region": "head",    "label": "Teething Pain",             "age": "child"},
    "croup_cough":          {"region": "chest",   "label": "Barking / Croup Cough",     "age": "child"},
    "diaper_rash":          {"region": "torso",   "label": "Diaper Rash",               "age": "child"},
    "growth_pain":          {"region": "legs",    "label": "Growing Pains",             "age": "child"},

    # Senior only
    "balance_issues":       {"region": "legs",    "label": "Balance / Fall Risk",       "age": "senior"},
    "incontinence":         {"region": "abdomen", "label": "Urinary Incontinence",      "age": "senior"},
    "bone_pain":            {"region": "torso",   "label": "Bone / Joint Ache",         "age": "senior"},
    "cognitive_decline":    {"region": "head",    "label": "Cognitive Decline",         "age": "senior"},
    "chronic_fatigue":      {"region": "torso",   "label": "Chronic Fatigue",           "age": "senior"},
}

CONDITIONS = {
    "Common Cold": {
        "weights": {"runny_nose": 3, "sore_throat": 2, "cough": 2, "fever": 1, "fatigue": 1, "headache": 1, "swollen_glands": 1},
        "advice": "Usually self-limiting. Rest, fluids, and OTC decongestants. See a doctor if symptoms persist beyond 10 days.",
        "severity": "low", "gender": "all", "age": "all",
    },
    "Influenza (Flu)": {
        "weights": {"fever": 3, "muscle_ache": 3, "chills": 2, "fatigue": 2, "cough": 2, "headache": 1, "sore_throat": 1, "night_sweats": 1},
        "advice": "Rest and hydration are key. Antivirals may help if caught early. Seek care if breathing becomes difficult.",
        "severity": "moderate", "gender": "all", "age": "all",
    },
    "Migraine": {
        "weights": {"headache": 4, "dizziness": 2, "nausea": 2, "vision_blur": 2, "vomiting": 1, "neck_stiffness": 1},
        "advice": "Rest in a dark, quiet room. OTC pain relief may help. Consult a doctor if migraines are frequent.",
        "severity": "moderate", "gender": "all", "age": "all",
    },
    "Gastroenteritis": {
        "weights": {"nausea": 3, "vomiting": 3, "diarrhea": 3, "abdominal_pain": 2, "fever": 1, "loss_of_appetite": 1, "bloating": 1},
        "advice": "Stay hydrated with oral rehydration solutions. Seek medical care if symptoms last more than 2 days.",
        "severity": "moderate", "gender": "all", "age": "all",
    },
    "COVID-19 / Respiratory Infection": {
        "weights": {"fever": 2, "cough": 3, "shortness_of_breath": 3, "fatigue": 2, "sore_throat": 1, "headache": 1, "muscle_ache": 1, "loss_of_appetite": 1},
        "advice": "Isolate and monitor oxygen levels. Seek urgent care for breathing difficulty or chest pain.",
        "severity": "high", "gender": "all", "age": "all",
    },
    "Musculoskeletal Strain": {
        "weights": {"upper_back_pain": 3, "lower_back_pain": 4, "spine_pain": 3, "hip_pain": 2, "joint_pain": 3, "muscle_ache": 2, "fatigue": 1, "leg_cramps": 1, "arm_pain": 1, "tailbone_pain": 1},
        "advice": "Rest, ice/heat therapy, and gentle stretching. See a physiotherapist if pain persists beyond a week.",
        "severity": "low", "gender": "all", "age": "all",
    },
    "Anxiety / Stress Response": {
        "weights": {"dizziness": 2, "fatigue": 2, "headache": 2, "chest_pain": 1, "nausea": 1, "heart_palpitations": 2, "memory_issues": 1, "night_sweats": 1},
        "advice": "Consider stress-management techniques and adequate sleep. Persistent symptoms warrant a doctor or counselor.",
        "severity": "low", "gender": "all", "age": "all",
    },
    "Possible Cardiac Concern": {
        "weights": {"chest_pain": 4, "shortness_of_breath": 3, "dizziness": 2, "fatigue": 1, "heart_palpitations": 3, "arm_pain": 2, "leg_swelling": 1, "nausea": 1},
        "advice": "If severe or sudden with arm/jaw pain, seek emergency care immediately.",
        "severity": "high", "gender": "all", "age": "all",
    },
    "Asthma / Bronchitis": {
        "weights": {"wheezing": 4, "cough": 3, "shortness_of_breath": 3, "chest_pain": 1, "fatigue": 1},
        "advice": "Use prescribed inhalers if available. Seek urgent care if breathing is severely restricted.",
        "severity": "moderate", "gender": "all", "age": "all",
    },
    "Urinary Tract Infection (UTI)": {
        "weights": {"abdominal_pain": 2, "lower_back_pain": 2, "fever": 2, "fatigue": 1, "nausea": 1, "chills": 1},
        "advice": "Drink plenty of water. UTIs require antibiotic treatment — see a doctor promptly.",
        "severity": "moderate", "gender": "all", "age": "all",
    },
    "Diabetes / Blood Sugar Issue": {
        "weights": {"fatigue": 3, "vision_blur": 2, "numbness_feet": 2, "numbness_hands": 2, "weight_loss": 2, "dizziness": 1, "leg_cramps": 1, "itching": 1},
        "advice": "Monitor blood sugar levels. Consult a doctor for testing and management.",
        "severity": "high", "gender": "all", "age": "all",
    },
    "Allergic Reaction": {
        "weights": {"rash": 3, "itching": 3, "runny_nose": 2, "swollen_glands": 1, "wheezing": 2, "nausea": 1, "dizziness": 1},
        "advice": "Identify and avoid the allergen. Seek emergency care for throat swelling or breathing difficulty.",
        "severity": "moderate", "gender": "all", "age": "all",
    },
    "Menstrual / Period Issues": {
        "weights": {"menstrual_cramps": 4, "heavy_bleeding": 3, "irregular_periods": 3, "pelvic_pain": 2, "bloating": 1, "mood_swings": 1, "fatigue": 1},
        "advice": "Track your cycle. Consult a gynecologist if periods are severely irregular, extremely painful, or unusually heavy.",
        "severity": "moderate", "gender": "female", "age": "all",
    },
    "PCOS": {
        "weights": {"irregular_periods": 4, "weight_loss": 2, "mood_swings": 2, "fatigue": 2, "pelvic_pain": 2, "bloating": 1},
        "advice": "PCOS is manageable with lifestyle changes and medication. See a gynecologist for diagnosis.",
        "severity": "moderate", "gender": "female", "age": "all",
    },
    "Breast Concern": {
        "weights": {"breast_pain": 4, "breast_lump": 4, "swollen_glands": 1},
        "advice": "Any new breast lump should be evaluated by a doctor promptly.",
        "severity": "high", "gender": "female", "age": "all",
    },
    "Vaginal Infection / STI": {
        "weights": {"vaginal_discharge": 4, "pelvic_pain": 2, "itching": 2, "fever": 1, "abdominal_pain": 1},
        "advice": "See a gynecologist. Infections require proper diagnosis and targeted treatment.",
        "severity": "moderate", "gender": "female", "age": "all",
    },
    "Menopause Symptoms": {
        "weights": {"hot_flashes": 4, "night_sweats": 3, "mood_swings": 2, "irregular_periods": 2, "fatigue": 1, "memory_issues": 1},
        "advice": "Hormone therapy and lifestyle changes can ease symptoms. Consult a doctor.",
        "severity": "low", "gender": "female", "age": "all",
    },
    "Prostate Issue": {
        "weights": {"difficulty_urinating": 4, "prostate_pressure": 4, "lower_back_pain": 2, "groin_pain": 2, "fatigue": 1},
        "advice": "See a urologist — early detection of prostate conditions is important.",
        "severity": "moderate", "gender": "male", "age": "all",
    },
    "Testicular Concern": {
        "weights": {"testicular_pain": 4, "testicular_lump": 4, "groin_pain": 2, "leg_swelling": 1},
        "advice": "Any testicular lump or persistent pain should be evaluated by a doctor promptly.",
        "severity": "high", "gender": "male", "age": "all",
    },
    "Low Testosterone": {
        "weights": {"low_libido_m": 4, "fatigue": 3, "erectile_issues": 3, "mood_swings": 2, "weight_loss": 1, "memory_issues": 1},
        "advice": "Low testosterone is diagnosable with a blood test. See a doctor before any hormone therapy.",
        "severity": "low", "gender": "male", "age": "all",
    },
    "Inguinal Hernia / Groin Strain": {
        "weights": {"groin_pain": 4, "abdominal_pain": 2, "leg_swelling": 1, "fatigue": 1},
        "advice": "Groin pain that worsens with activity may indicate a hernia. See a doctor.",
        "severity": "moderate", "gender": "male", "age": "all",
    },
    "Ear Infection (Otitis Media)": {
        "weights": {"ear_tugging": 4, "ear_pain": 3, "fever": 2, "cough": 1, "runny_nose": 1},
        "advice": "Common in children. See a pediatrician — antibiotics may be needed.",
        "severity": "moderate", "gender": "all", "age": "child",
    },
    "Croup": {
        "weights": {"croup_cough": 4, "fever": 2, "shortness_of_breath": 2, "cough": 1},
        "advice": "Steam or cool air may help. Seek urgent care if breathing becomes labored.",
        "severity": "moderate", "gender": "all", "age": "child",
    },
    "Growing Pains": {
        "weights": {"growth_pain": 4, "leg_cramps": 2, "fatigue": 1},
        "advice": "Common in children aged 3–12. Massage and warmth help. Consult a pediatrician if severe.",
        "severity": "low", "gender": "all", "age": "child",
    },
    "Osteoporosis / Bone Weakness": {
        "weights": {"bone_pain": 4, "joint_pain": 3, "fatigue": 2, "balance_issues": 2},
        "advice": "Calcium, Vitamin D, and weight-bearing exercise help. See a doctor for a bone density scan.",
        "severity": "moderate", "gender": "all", "age": "senior",
    },
    "Cognitive Decline / Early Dementia": {
        "weights": {"cognitive_decline": 4, "memory_issues": 4, "confusion": 3, "fatigue": 1},
        "advice": "Early assessment is key. Consult a neurologist or geriatrician for evaluation.",
        "severity": "high", "gender": "all", "age": "senior",
    },
    "Fall Risk / Balance Disorder": {
        "weights": {"balance_issues": 4, "dizziness": 3, "leg_weakness": 2, "vision_blur": 1},
        "advice": "Physical therapy and home safety modifications reduce fall risk significantly.",
        "severity": "moderate", "gender": "all", "age": "senior",
    },
}

LANGUAGES = {"en": "English", "hi": "Hindi", "te": "Telugu"}