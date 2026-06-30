import { useState } from 'react'
import './BodyMap.css'

const REGION_COLORS = {
  active: '#8052ff',
  activeStroke: '#a685ff',
  inactive: 'rgba(148,163,184,0.15)',
  inactiveStroke: 'rgba(148,163,184,0.35)',
}

function RegionPath({ region, activeRegions, onRegionClick, d, label, labelX, labelY, shape = 'path', ...shapeProps }) {
  const active = activeRegions.has(region)
  const fill = active ? 'rgba(128,82,255,0.28)' : REGION_COLORS.inactive
  const stroke = active ? REGION_COLORS.activeStroke : REGION_COLORS.inactiveStroke
  const textFill = active ? '#a685ff' : 'rgba(148,163,184,0.6)'
  const onClick = () => onRegionClick(region)

  const sharedProps = {
    fill, stroke, strokeWidth: active ? 2 : 1.2,
    className: 'region-shape cursor-target', onClick,
  }

  return (
    <g>
      {shape === 'ellipse' && <ellipse {...sharedProps} {...shapeProps} />}
      {shape === 'rect' && <rect {...sharedProps} {...shapeProps} />}
      {shape === 'path' && <path d={d} {...sharedProps} />}
      {label && (
        <text x={labelX} y={labelY} textAnchor="middle" fontSize="7.5" fill={textFill}
          className="region-label" fontWeight={active ? '600' : '400'}>
          {label}
        </text>
      )}
    </g>
  )
}

function FrontBody({ activeRegions, onRegionClick, gender }) {
  const rp = (region, extra) => ({ region, activeRegions, onRegionClick, ...extra })

  return (
    <svg viewBox="0 0 200 480" className="body-map-svg" aria-label="Front body map">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* HEAD - realistic oval */}
      <RegionPath {...rp('head')} shape="path"
        d="M100,10 C82,10 68,24 68,44 C68,58 74,70 84,76 C88,78 92,80 100,80 C108,80 112,78 116,76 C126,70 132,58 132,44 C132,24 118,10 100,10 Z"
        label="Head" labelX="100" labelY="48" />

      {/* NECK */}
      <RegionPath {...rp('neck')} shape="path"
        d="M91,80 C91,80 88,94 88,98 L112,98 C112,94 109,80 109,80 Z"
        label="Neck" labelX="100" labelY="92" />

      {/* SHOULDERS */}
      <RegionPath {...rp('arms')} shape="path"
        d="M60,104 C52,100 40,102 34,110 C30,116 32,124 36,126 L52,120 Z"
        label="" labelX="42" labelY="112" />
      <RegionPath {...rp('arms')} shape="path"
        d="M140,104 C148,100 160,102 166,110 C170,116 168,124 164,126 L148,120 Z"
        label="" labelX="158" labelY="112" />

      {/* CHEST / TORSO */}
      <RegionPath {...rp('chest')} shape="path"
        d="M60,104 C60,104 72,98 100,98 C128,98 140,104 140,104 L142,160 C142,168 122,172 100,172 C78,172 58,168 58,160 Z"
        label="Chest" labelX="100" labelY="135" />

      {/* FEMALE BREASTS */}
      {gender === 'female' && <>
        <RegionPath {...rp('chest_f')} shape="ellipse"
          cx="85" cy="148" rx="16" ry="13" label="" labelX="85" labelY="149" />
        <RegionPath {...rp('chest_f')} shape="ellipse"
          cx="115" cy="148" rx="16" ry="13" label="" labelX="115" labelY="149" />
        {activeRegions.has('chest_f') && (
          <text x="100" y="168" textAnchor="middle" fontSize="7" fill="#a685ff" className="region-label">Breast</text>
        )}
        {!activeRegions.has('chest_f') && (
          <text x="100" y="168" textAnchor="middle" fontSize="7" fill="rgba(148,163,184,0.5)" className="region-label">Breast</text>
        )}
      </>}

      {/* ABDOMEN */}
      <RegionPath {...rp('abdomen')} shape="path"
        d="M58,160 C58,160 78,172 100,172 C122,172 142,160 142,160 L140,215 C136,222 120,228 100,228 C80,228 64,222 60,215 Z"
        label="Abdomen" labelX="100" labelY="198" />

      {/* PELVIS / GROIN */}
      {gender === 'female' && (
        <RegionPath {...rp('pelvis')} shape="path"
          d="M60,215 C64,222 80,228 100,228 C120,228 136,222 140,215 L138,240 C132,250 118,256 100,256 C82,256 68,250 62,240 Z"
          label="Pelvis" labelX="100" labelY="238" />
      )}
      {gender === 'male' && (
        <RegionPath {...rp('groin')} shape="path"
          d="M60,215 C64,222 80,228 100,228 C120,228 136,222 140,215 L138,240 C132,250 118,256 100,256 C82,256 68,250 62,240 Z"
          label="Groin" labelX="100" labelY="238" />
      )}
      {gender === 'all' && (
        <RegionPath {...rp('abdomen')} shape="path"
          d="M60,215 C64,222 80,228 100,228 C120,228 136,222 140,215 L138,240 C132,250 118,256 100,256 C82,256 68,250 62,240 Z"
          label="" labelX="100" labelY="238" />
      )}

      {/* LEFT ARM */}
      <RegionPath {...rp('arms')} shape="path"
        d="M36,126 L52,120 L54,192 L38,196 Z"
        label="" labelX="45" labelY="160" />
      {/* LEFT FOREARM */}
      <RegionPath {...rp('arms')} shape="path"
        d="M38,196 L54,192 L52,248 L36,244 Z"
        label="" labelX="44" labelY="220" />
      {/* LEFT HAND */}
      <RegionPath {...rp('arms')} shape="ellipse"
        cx="40" cy="258" rx="10" ry="14"
        label="Arm" labelX="26" labelY="200" />

      {/* RIGHT ARM */}
      <RegionPath {...rp('arms')} shape="path"
        d="M164,126 L148,120 L146,192 L162,196 Z"
        label="" labelX="155" labelY="160" />
      <RegionPath {...rp('arms')} shape="path"
        d="M162,196 L146,192 L148,248 L164,244 Z"
        label="" labelX="156" labelY="220" />
      <RegionPath {...rp('arms')} shape="ellipse"
        cx="160" cy="258" rx="10" ry="14" label="" labelX="160" labelY="270" />

      {/* LEFT THIGH */}
      <RegionPath {...rp('legs')} shape="path"
        d="M62,240 C68,250 82,256 96,256 L94,330 C88,332 74,328 66,318 Z"
        label="" labelX="78" labelY="292" />
      {/* LEFT SHIN */}
      <RegionPath {...rp('legs')} shape="path"
        d="M66,318 C74,328 88,332 94,330 L92,392 L68,386 Z"
        label="Leg" labelX="78" labelY="358" />
      {/* LEFT FOOT */}
      <RegionPath {...rp('legs')} shape="path"
        d="M68,386 L92,392 L90,408 C88,416 80,420 70,418 C60,416 56,410 58,402 Z"
        label="" labelX="74" labelY="406" />

      {/* RIGHT THIGH */}
      <RegionPath {...rp('legs')} shape="path"
        d="M138,240 C132,250 118,256 104,256 L106,330 C112,332 126,328 134,318 Z"
        label="" labelX="122" labelY="292" />
      {/* RIGHT SHIN */}
      <RegionPath {...rp('legs')} shape="path"
        d="M134,318 C126,328 112,332 106,330 L108,392 L132,386 Z"
        label="" labelX="122" labelY="358" />
      {/* RIGHT FOOT */}
      <RegionPath {...rp('legs')} shape="path"
        d="M132,386 L108,392 L110,408 C112,416 120,420 130,418 C140,416 144,410 142,402 Z"
        label="" labelX="126" labelY="406" />
    </svg>
  )
}

function BackBody({ activeRegions, onRegionClick }) {
  const rp = (region, extra) => ({ region, activeRegions, onRegionClick, ...extra })

  return (
    <svg viewBox="0 0 200 480" className="body-map-svg" aria-label="Back body map">
      {/* HEAD */}
      <RegionPath {...rp('head')} shape="path"
        d="M100,10 C82,10 68,24 68,44 C68,58 74,70 84,76 C88,78 92,80 100,80 C108,80 112,78 116,76 C126,70 132,58 132,44 C132,24 118,10 100,10 Z"
        label="Head" labelX="100" labelY="48" />

      {/* NECK */}
      <RegionPath {...rp('neck')} shape="path"
        d="M91,80 C91,80 88,94 88,98 L112,98 C112,94 109,80 109,80 Z"
        label="Neck" labelX="100" labelY="92" />

      {/* SHOULDERS */}
      <RegionPath {...rp('arms')} shape="path"
        d="M60,104 C52,100 40,102 34,110 C30,116 32,124 36,126 L52,120 Z" />
      <RegionPath {...rp('arms')} shape="path"
        d="M140,104 C148,100 160,102 166,110 C170,116 168,124 164,126 L148,120 Z" />

      {/* UPPER BACK */}
      <RegionPath {...rp('upper_back')} shape="path"
        d="M60,104 C60,104 72,98 100,98 C128,98 140,104 140,104 L140,162 C140,162 122,166 100,166 C78,166 60,162 60,162 Z"
        label="Upper back" labelX="100" labelY="133" />

      {/* LOWER BACK */}
      <RegionPath {...rp('lower_back')} shape="path"
        d="M60,162 C60,162 78,166 100,166 C122,166 140,162 140,162 L140,216 C136,222 120,228 100,228 C80,228 64,222 60,216 Z"
        label="Lower back" labelX="100" labelY="195" />

      {/* GLUTES */}
      <RegionPath {...rp('glutes')} shape="path"
        d="M60,216 C64,222 80,228 100,228 C120,228 136,222 140,216 L138,252 C132,264 118,270 100,270 C82,270 68,264 62,252 Z"
        label="Glutes" labelX="100" labelY="247" />

      {/* LEFT ARM */}
      <RegionPath {...rp('arms')} shape="path" d="M36,126 L52,120 L54,192 L38,196 Z" />
      <RegionPath {...rp('arms')} shape="path" d="M38,196 L54,192 L52,248 L36,244 Z" />
      <RegionPath {...rp('arms')} shape="ellipse" cx="40" cy="258" rx="10" ry="14"
        label="Arm" labelX="26" labelY="200" />

      {/* RIGHT ARM */}
      <RegionPath {...rp('arms')} shape="path" d="M164,126 L148,120 L146,192 L162,196 Z" />
      <RegionPath {...rp('arms')} shape="path" d="M162,196 L146,192 L148,248 L164,244 Z" />
      <RegionPath {...rp('arms')} shape="ellipse" cx="160" cy="258" rx="10" ry="14" />

      {/* LEFT LEG BACK */}
      <RegionPath {...rp('legs')} shape="path"
        d="M62,252 C68,264 82,270 96,270 L94,344 C88,346 74,342 66,330 Z"
        label="" labelX="78" labelY="306" />
      <RegionPath {...rp('legs')} shape="path"
        d="M66,330 C74,342 88,346 94,344 L92,406 L68,400 Z"
        label="Leg" labelX="78" labelY="370" />
      <RegionPath {...rp('legs')} shape="path"
        d="M68,400 L92,406 L90,420 C86,428 76,430 66,426 C58,422 56,414 60,406 Z" />

      {/* RIGHT LEG BACK */}
      <RegionPath {...rp('legs')} shape="path"
        d="M138,252 C132,264 118,270 104,270 L106,344 C112,346 126,342 134,330 Z"
        label="" labelX="122" labelY="306" />
      <RegionPath {...rp('legs')} shape="path"
        d="M134,330 C126,342 112,346 106,344 L108,406 L132,400 Z"
        label="" labelX="122" labelY="370" />
      <RegionPath {...rp('legs')} shape="path"
        d="M132,400 L108,406 L110,420 C114,428 124,430 134,426 C142,422 144,414 140,406 Z" />
    </svg>
  )
}

export default function BodyMap({ activeRegions, onRegionClick, gender }) {
  const [view, setView] = useState('front')
  return (
    <div className="body-map-wrapper">
      <div className="view-toggle">
        <button className={`toggle-btn cursor-target ${view === 'front' ? 'active' : ''}`} onClick={() => setView('front')}>Front</button>
        <button className={`toggle-btn cursor-target ${view === 'back' ? 'active' : ''}`} onClick={() => setView('back')}>Back</button>
      </div>
      {view === 'front'
        ? <FrontBody activeRegions={activeRegions} onRegionClick={onRegionClick} gender={gender} />
        : <BackBody activeRegions={activeRegions} onRegionClick={onRegionClick} />
      }
    </div>
  )
}