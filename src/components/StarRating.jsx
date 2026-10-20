export default function StarRating({ value, size = 'text-sm' }) {
  const full = Math.round(value)
  return (
    <span className={`${size} text-gold`} aria-label={`${value} out of 5 stars`}>
      {'★'.repeat(full)}
      <span className="text-ink-line">{'★'.repeat(5 - full)}</span>
    </span>
  )
}
