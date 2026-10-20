// Compact sun-sign lookup: for each month, a cutoff day. If the birth day is on
// or before the cutoff, use that month's sign; otherwise use the next month's.
const SIGNS = [
  ['Capricorn', 19], ['Aquarius', 18], ['Pisces', 20], ['Aries', 19],
  ['Taurus', 20], ['Gemini', 20], ['Cancer', 22], ['Leo', 22],
  ['Virgo', 22], ['Libra', 22], ['Scorpio', 21], ['Sagittarius', 21],
  ['Capricorn', 31],
]

export function getZodiacSign(month, day) {
  const [sign, cutoff] = SIGNS[month - 1]
  return day <= cutoff ? sign : SIGNS[month][0]
}

export function getZodiacFromDob(dobString) {
  if (!dobString) return null
  const [, month, day] = dobString.split('-').map(Number) // yyyy-mm-dd from <input type="date">
  if (!month || !day) return null
  return getZodiacSign(month, day)
}
