import { useState } from 'react'
import './DoctorFinder.css'

const SPECIALITY_MAP = {
  'Possible Cardiac Concern': 'cardiologist',
  'Asthma / Bronchitis': 'pulmonologist',
  'Migraine': 'neurologist',
  'Diabetes / Blood Sugar Issue': 'endocrinologist',
  'PCOS': 'gynecologist',
  'Menstrual / Period Issues': 'gynecologist',
  'Breast Concern': 'gynecologist',
  'Vaginal Infection / STI': 'gynecologist',
  'Menopause Symptoms': 'gynecologist',
  'Prostate Issue': 'urologist',
  'Testicular Concern': 'urologist',
  'Low Testosterone': 'urologist',
  'Cognitive Decline / Early Dementia': 'neurologist',
  'Osteoporosis / Bone Weakness': 'orthopedic doctor',
  'Fall Risk / Balance Disorder': 'physiotherapist',
  'Ear Infection (Otitis Media)': 'pediatrician',
  'Croup': 'pediatrician',
  'Growing Pains': 'pediatrician',
  'Allergic Reaction': 'allergist',
  'Urinary Tract Infection (UTI)': 'urologist',
}

function getSpeciality(results) {
  if (!results || results.length === 0) return 'general physician'
  const top = results[0]
  return SPECIALITY_MAP[top.name] || 'general physician'
}

export default function DoctorFinder({ results }) {
  const [status, setStatus] = useState('idle') // idle | loading | ready | error
  const [mapUrl, setMapUrl] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [coords, setCoords] = useState(null)
  const [clinics, setClinics] = useState([])

  const findDoctors = () => {
    setStatus('loading')
    const spec = getSpeciality(results)
    setSpeciality(spec)

    if (!navigator.geolocation) {
      setStatus('error')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        setCoords({ lat, lng })

        const query = encodeURIComponent(`${spec} clinic near me`)
        const url = `https://maps.google.com/maps?q=${query}&near=${lat},${lng}&output=embed&z=14`
        setMapUrl(url)

        // Build nearby clinic links
        const searches = [
          { label: `${spec} near me`, q: `${spec} near me` },
          { label: 'General physician near me', q: 'general physician clinic near me' },
          { label: 'Hospital near me', q: 'hospital near me' },
          { label: 'Emergency care near me', q: 'emergency hospital near me' },
        ]
        setClinics(searches)
        setStatus('ready')
      },
      () => {
        // fallback without coords
        const spec2 = getSpeciality(results)
        const url = `https://maps.google.com/maps?q=${encodeURIComponent(spec2 + ' clinic')}&output=embed&z=12`
        setMapUrl(url)
        setClinics([
          { label: `${spec2} near me`, q: `${spec2} near me` },
          { label: 'General physician near me', q: 'general physician clinic near me' },
          { label: 'Hospital near me', q: 'hospital near me' },
          { label: 'Emergency care near me', q: 'emergency hospital near me' },
        ])
        setStatus('ready')
      },
      { timeout: 8000 }
    )
  }

  const openMaps = (q, lat, lng) => {
    const base = lat && lng
      ? `https://www.google.com/maps/search/${encodeURIComponent(q)}/@${lat},${lng},14z`
      : `https://www.google.com/maps/search/${encodeURIComponent(q)}`
    window.open(base, '_blank')
  }

  if (status === 'idle') return (
    <div className="doctor-finder-idle">
      <div className="finder-icon">🏥</div>
      <div>
        <p className="finder-title">Find nearby doctors</p>
        <p className="finder-sub">
          Based on your results, we'll suggest a <strong>{getSpeciality(results)}</strong> near you
        </p>
      </div>
      <button className="find-btn" onClick={findDoctors}>Find doctors</button>
    </div>
  )

  if (status === 'loading') return (
    <div className="doctor-finder-loading">
      <div className="spinner" />
      <p>Locating nearby clinics…</p>
    </div>
  )

  if (status === 'error') return (
    <div className="doctor-finder-error">
      <p>⚠️ Could not access location. Please search manually.</p>
      <a href="https://www.google.com/maps/search/doctor+near+me" target="_blank" rel="noreferrer" className="find-btn">
        Open Google Maps
      </a>
    </div>
  )

  return (
    <div className="doctor-finder-ready">
      <div className="finder-header">
        <div>
          <p className="finder-title">Recommended: <strong>{speciality}</strong></p>
          {coords && <p className="finder-sub">Based on your current location</p>}
        </div>
        <button className="find-btn small" onClick={() => setStatus('idle')}>Change</button>
      </div>

      <iframe
        title="Nearby clinics map"
        src={mapUrl}
        className="map-iframe"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="clinic-links">
        {clinics.map(c => (
          <button key={c.q} className="clinic-link-btn" onClick={() => openMaps(c.q, coords?.lat, coords?.lng)}>
            🔍 {c.label}
          </button>
        ))}
      </div>

      <p className="finder-disclaimer">
        Results are from Google Maps. Always call ahead to confirm availability and speciality.
      </p>
    </div>
  )
}