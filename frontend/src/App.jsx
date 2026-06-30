import Dither from './Dither'
import TargetCursor from './TargetCursor'
import DoctorFinder from './DoctorFinder'
import { useState, useEffect } from 'react'
import BodyMap from './BodyMap'
import './App.css'

const SEVERITY_COLOR = { low: 'var(--safe)', moderate: 'var(--warning)', high: 'var(--danger)' }

const REGION_LABEL_MAP = {
  head: 'Head', neck: 'Neck', chest: 'Chest', chest_f: 'Breast',
  abdomen: 'Abdomen', pelvis: 'Pelvis', groin: 'Groin', torso: 'Torso',
  upper_back: 'Upper Back', lower_back: 'Lower Back', glutes: 'Glutes',
  arms: 'Arms', legs: 'Legs',
}

const AGE_GROUPS = [
  { key: 'child', label: 'Child', sub: 'Under 12', icon: '🧒' },
  { key: 'adult', label: 'Adult', sub: '12–60', icon: '🧑' },
  { key: 'senior', label: 'Senior', sub: '60+', icon: '🧓' },
]

function PulseIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" className="pulse-icon">
      <circle cx="50" cy="50" r="46" className="pulse-ring pulse-ring-1" />
      <circle cx="50" cy="50" r="46" className="pulse-ring pulse-ring-2" />
      <path
        d="M8,50 L28,50 L36,30 L46,70 L54,15 L62,50 L72,50 L80,40 L92,50"
        className="pulse-line"
        fill="none"
      />
    </svg>
  )
}

function exportPDF(gender, age, lang, selected, symptoms, results) {
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const selectedLabels = symptoms.filter(s => selected.has(s.key)).map(s => s.label)
  const severityColor = { low: '#4ade80', moderate: '#fbbf24', high: '#f87171' }

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vitalize Report</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; color: #1e293b; padding: 40px; max-width: 700px; margin: 0 auto; }
  .header { border-bottom: 3px solid #5eead4; padding-bottom: 20px; margin-bottom: 28px; }
  .logo { font-size: 22px; font-weight: 700; color: #0f172a; letter-spacing: -0.5px; }
  .logo span { color: #5eead4; }
  .meta { margin-top: 8px; font-size: 13px; color: #64748b; }
  h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin: 24px 0 10px; }
  .profile-row { display: flex; gap: 24px; }
  .profile-pill { background: #f1f5f9; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 600; color: #334155; }
  .symptom-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
  .chip { background: #e0f2fe; color: #0369a1; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 500; }
  .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; margin-bottom: 12px; }
  .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .card-name { font-weight: 700; font-size: 15px; color: #0f172a; }
  .badge { font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; color: #0f172a; }
  .bar-bg { background: #f1f5f9; border-radius: 4px; height: 6px; margin-bottom: 6px; }
  .bar-fill { height: 100%; border-radius: 4px; }
  .score-txt { font-size: 12px; color: #64748b; margin-bottom: 8px; }
  .advice { font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 6px; }
  .matched { font-size: 11px; color: #5eead4; }
  .disclaimer { margin-top: 32px; padding: 14px 18px; background: #fff7ed; border-left: 4px solid #fbbf24; border-radius: 6px; font-size: 12px; color: #92400e; line-height: 1.6; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
</style>
</head>
<body>
  <div class="header">
   <div class="logo">🩺 Vital<span>ize</span></div>
    <div class="meta">Generated on ${date} &nbsp;·&nbsp; Confidential personal health report</div>
  </div>

  <h2>Profile</h2>
  <div class="profile-row">
    <div class="profile-pill">${gender === 'male' ? '♂ Male' : gender === 'female' ? '♀ Female' : '⚥ General'}</div>
    <div class="profile-pill">${AGE_GROUPS.find(a => a.key === age)?.label || 'Adult'} (${AGE_GROUPS.find(a => a.key === age)?.sub || '12–60'})</div>
    <div class="profile-pill">Language: ${lang.toUpperCase()}</div>
  </div>

  <h2>Reported Symptoms (${selectedLabels.length})</h2>
  <div class="symptom-list">
    ${selectedLabels.map(l => `<span class="chip">${l}</span>`).join('')}
  </div>

  <h2>Possible Conditions</h2>
  ${results.map(r => `
  <div class="card">
    <div class="card-header">
      <span class="card-name">${r.name}</span>
      <span class="badge" style="background:${severityColor[r.severity]}">${r.severity}</span>
    </div>
    <div class="bar-bg"><div class="bar-fill" style="width:${r.score}%;background:${severityColor[r.severity]}"></div></div>
    <div class="score-txt">${r.score}% symptom match</div>
    <div class="advice">${r.advice}</div>
    <div class="matched">Matched: ${r.matched_symptoms.join(', ')}</div>
  </div>`).join('')}

  <div class="disclaimer">
    ⚠️ <strong>Medical Disclaimer:</strong> This report is generated by an automated symptom-checking tool and does not constitute a medical diagnosis. Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment. Do not delay seeking professional care based on this report.
  </div>
  <div class="footer">Vitalize · For personal reference only · Not for clinical use</div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  if (win) {
    win.onload = () => {
      win.print()
      URL.revokeObjectURL(url)
    }
  }
}

function DitherBackground() {
  return (
    <>
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        cursorColor="#8052ff"
        cursorColorOnTarget="#ffb829"
      />
      <div className="dither-background">
        <Dither
          waveColor={[0.5, 0.31, 1.0]}
          colorNum={4}
          waveAmplitude={0.25}
          waveFrequency={2.5}
          waveSpeed={0.04}
          enableMouseInteraction={true}
          mouseRadius={0.4}
        />
      </div>
    </>
  )
}

export default function App() {
  const [step, setStep] = useState('gender')   // gender | age | main
  const [gender, setGender] = useState(null)
  const [age, setAge] = useState(null)
  const [symptoms, setSymptoms] = useState([])
  const [selected, setSelected] = useState(new Set())
  const [activeRegions, setActiveRegions] = useState(new Set())
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    if (step !== 'main') return
    fetch(`/api/symptoms?lang=${lang}&gender=${gender}&age=${age}`)
      .then(r => r.json())
      .then(data => {
        setSymptoms(data.symptoms)
        setSelected(new Set())
        setActiveRegions(new Set())
        setResults(null)
      })
  }, [lang, gender, age, step])

  useEffect(() => {
    setActiveRegions(new Set(symptoms.filter(s => selected.has(s.key)).map(s => s.region)))
  }, [selected, symptoms])

  const toggleSymptom = (key) => setSelected(prev => {
    const next = new Set(prev)
    next.has(key) ? next.delete(key) : next.add(key)
    return next
  })

  const handleRegionClick = (region) => {
    const regionSymptoms = symptoms.filter(s => s.region === region).map(s => s.key)
    if (!regionSymptoms.length) return
    const allSelected = regionSymptoms.every(k => selected.has(k))
    setSelected(prev => {
      const next = new Set(prev)
      regionSymptoms.forEach(k => allSelected ? next.delete(k) : next.add(k))
      return next
    })
  }

  const checkSymptoms = async () => {
    if (!selected.size) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: [...selected], lang, gender, age }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      setResults((await res.json()).results)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  const reset = () => { setSelected(new Set()); setResults(null); setError(null) }
  const restart = () => { setStep('gender'); setGender(null); setAge(null); setSelected(new Set()); setResults(null); setSymptoms([]) }

  const grouped = {}
  symptoms.forEach(s => { if (!grouped[s.region]) grouped[s.region] = []; grouped[s.region].push(s) })

  // ── GENDER SCREEN ──
  if (step === 'gender') return (
    <>
      <DitherBackground />
      <div className="app app-content onboarding-screen">
        <div className="onboarding-card glass">
  <div className="brand-lockup onboarding-brand">
    <PulseIcon />
    <h1 className="brand-name onboarding-brand-name">Vitalize</h1>
  </div>
  <p className="subtitle">AI-assisted triage to help you understand your symptoms</p>
          <p className="step-label">Step 1 of 2 — Biological sex</p>
          <div className="gender-options">
            <button className="select-btn male cursor-target" onClick={() => { setGender('male'); setStep('age') }}>
              <span className="select-icon">♂</span><span>Male</span>
            </button>
            <button className="select-btn female cursor-target" onClick={() => { setGender('female'); setStep('age') }}>
              <span className="select-icon">♀</span><span>Female</span>
            </button>
            <button className="select-btn other cursor-target" onClick={() => { setGender('all'); setStep('age') }}>
              <span className="select-icon">⚥</span><span>Prefer not to say</span>
            </button>
          </div>
          <p className="privacy-note">Used only to filter relevant symptoms. Never stored.</p>
        </div>
      </div>
    </>
  )

  // ── AGE SCREEN ──
  if (step === 'age') return (
    <>
      <DitherBackground />
      <div className="app app-content onboarding-screen">
        <div className="onboarding-card glass">
          <div className="onboarding-icon">🧑‍⚕️</div>
          <h1>Age Group</h1>
          <p className="subtitle">Conditions and symptoms vary by age</p>
          <p className="step-label">Step 2 of 2 — Age group</p>
          <div className="age-options">
            {AGE_GROUPS.map(a => (
              <button key={a.key} className="age-btn cursor-target" onClick={() => { setAge(a.key); setStep('main') }}>
                <span className="age-icon">{a.icon}</span>
                <span className="age-label">{a.label}</span>
                <span className="age-sub">{a.sub}</span>
              </button>
            ))}
          </div>
          <button className="back-btn cursor-target" onClick={() => setStep('gender')}>← Back</button>
        </div>
      </div>
    </>
  )

  // ── MAIN APP ──
  const ageInfo = AGE_GROUPS.find(a => a.key === age)

  return (
    <>
      <DitherBackground />
      <div className="app app-content">
        <header className="app-header">
          <div className="header-top">
            <div className="brand-lockup">
              <PulseIcon />
              <h1 className="brand-name">Vitalize</h1>
            </div>
            <div className="header-badges">
              <span className="profile-badge">
                {gender === 'male' ? '♂' : gender === 'female' ? '♀' : '⚥'} {gender === 'all' ? 'General' : gender === 'male' ? 'Male' : 'Female'}
              </span>
              <span className="profile-badge">{ageInfo?.icon} {ageInfo?.label}</span>
              <button className="restart-btn cursor-target" onClick={restart}>Start over</button>
            </div>
          </div>
          <p className="subtitle">Click body regions or select symptoms below</p>
          <div className="lang-switcher">
            {['en', 'hi', 'te'].map(l => (
              <button key={l} className={`lang-btn cursor-target ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
                {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : 'తెలుగు'}
              </button>
            ))}
          </div>
        </header>

        <main className="app-main">
          <section className="glass body-map-section">
            <h2>Body map</h2>
            <p className="hint">Click to highlight a region</p>
            <BodyMap activeRegions={activeRegions} onRegionClick={handleRegionClick} gender={gender} />
            {activeRegions.size > 0 && (
              <div className="active-regions">
                {[...activeRegions].map(r => (
                  <span key={r} className="region-tag">{REGION_LABEL_MAP[r] || r}</span>
                ))}
              </div>
            )}
          </section>

          <section className="glass symptom-list-section">
            <h2>Symptoms <span className="count">({selected.size} selected)</span></h2>
            <div className="symptom-groups">
              {Object.entries(grouped).map(([region, syms]) => (
                <div key={region} className="symptom-group">
                  <p className="group-label">{REGION_LABEL_MAP[region] || region}</p>
                  <div className="symptom-grid">
                    {syms.map(s => (
                      <button key={s.key}
                        className={`symptom-chip cursor-target ${selected.has(s.key) ? 'selected' : ''}`}
                        onClick={() => toggleSymptom(s.key)}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="action-row">
              <button className="check-btn cursor-target" onClick={checkSymptoms} disabled={!selected.size || loading}>
                {loading ? 'Checking…' : `Check symptoms${selected.size > 0 ? ` (${selected.size})` : ''}`}
              </button>
              {(selected.size > 0 || results) && <button className="reset-btn cursor-target" onClick={reset}>Clear</button>}
            </div>
            {error && <p className="error-msg">⚠️ {error}</p>}
          </section>
        </main>

        {results && (
          <section className="results-section">
            <div className="results-header">
              <h2>Possible conditions</h2>
              <button className="export-btn cursor-target" onClick={() => exportPDF(gender, age, lang, selected, symptoms, results)}>
                ⬇ Save as PDF
              </button>
            </div>
            <div className="results-grid">
              {results.map(r => (
                <div key={r.name} className="glass result-card cursor-target">
                  <div className="result-header">
                    <span className="result-name">{r.name}</span>
                    <span className="severity-badge" style={{ background: SEVERITY_COLOR[r.severity] }}>{r.severity}</span>
                  </div>
                  <div className="score-bar-wrap">
                    <div className="score-bar" style={{ width: `${r.score}%`, background: SEVERITY_COLOR[r.severity] }} />
                  </div>
                  <span className="score-label">{r.score}% symptom match</span>
                  <p className="advice">{r.advice}</p>
                  <p className="matched">Matched: {r.matched_symptoms.join(', ')}</p>
                </div>
              ))}
            </div>
            <p className="disclaimer">⚠️ This tool does not provide medical diagnosis. Always consult a qualified doctor.</p>
            <DoctorFinder results={results} />
          </section>
        )}
      </div>
    </>
  )
}