import { useState } from 'react'

// Same fallback idea as Avatar: show the image, or fall back to the emoji
// glyph if the placeholder image fails to load.
export default function ProductImage({ src, alt, glyph, className = 'h-36 w-full rounded-xl' }) {
  const [broken, setBroken] = useState(false)

  return (
    <div className={`flex items-center justify-center overflow-hidden border border-ink-line bg-ink ${className}`}>
      {src && !broken ? (
        <img src={src} alt={alt} onError={() => setBroken(true)} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="text-3xl">{glyph}</span>
      )}
    </div>
  )
}
