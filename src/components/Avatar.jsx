import { useState } from 'react'

// Shows a photo if it loads; falls back to initials if the image is broken
// or missing, so the UI never shows a dead image icon.
export default function Avatar({ src, alt, initials, online, dotSize = 'h-3.5 w-3.5', className = 'h-14 w-14' }) {
  const [broken, setBroken] = useState(false)

  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full border border-ink-line bg-ink-surface2 ${className}`}>
      {src && !broken ? (
        <img
          src={src}
          alt={alt}
          onError={() => setBroken(true)}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display font-semibold text-ink-text">
          {initials}
        </div>
      )}
      {online !== undefined && (
        <span
          className={`absolute bottom-0.5 right-0.5 rounded-full border-2 border-ink ${dotSize} ${online ? 'bg-cyan' : 'bg-busy'}`}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
