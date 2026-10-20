import { getMulank, getBhagyank } from './numerology.js'

// A hand-built 1-9 compatibility matrix — this is a "for fun" numerology
// compatibility score, not a claim of astrological authority. Symmetric by
// construction (MATRIX[a][b] === MATRIX[b][a]).
const MATRIX = {
  1: { 1: 82, 2: 68, 3: 88, 4: 55, 5: 90, 6: 72, 7: 60, 8: 50, 9: 85 },
  2: { 1: 68, 2: 78, 3: 65, 4: 80, 5: 70, 6: 92, 7: 88, 8: 58, 9: 62 },
  3: { 1: 88, 2: 65, 3: 80, 4: 60, 5: 85, 6: 90, 7: 70, 8: 55, 9: 75 },
  4: { 1: 55, 2: 80, 3: 60, 4: 76, 5: 58, 6: 65, 7: 62, 8: 90, 9: 52 },
  5: { 1: 90, 2: 70, 3: 85, 4: 58, 5: 82, 6: 78, 7: 65, 8: 60, 9: 88 },
  6: { 1: 72, 2: 92, 3: 90, 4: 65, 5: 78, 6: 85, 7: 80, 8: 62, 9: 70 },
  7: { 1: 60, 2: 88, 3: 70, 4: 62, 5: 65, 6: 80, 7: 79, 8: 85, 9: 58 },
  8: { 1: 50, 2: 58, 3: 55, 4: 90, 5: 60, 6: 62, 7: 85, 8: 81, 9: 68 },
  9: { 1: 85, 2: 62, 3: 75, 4: 52, 5: 88, 6: 70, 7: 58, 8: 68, 9: 83 },
}

export function verdictFor(score) {
  if (score >= 85) return 'Excellent match — natural ease between you two.'
  if (score >= 70) return 'Good match — works well with a little give and take.'
  if (score >= 55) return 'Workable — needs open communication to really click.'
  return "Challenging — you're wired quite differently, but that's not a dealbreaker."
}

export function computeCompatibility(dob1, dob2) {
  const m1 = getMulank(dob1), m2 = getMulank(dob2)
  const b1 = getBhagyank(dob1), b2 = getBhagyank(dob2)
  if (!m1 || !m2 || !b1 || !b2) return null

  const mulankScore = MATRIX[m1][m2]
  const bhagyankScore = MATRIX[b1][b2]
  const overall = Math.round((mulankScore + bhagyankScore) / 2)

  return { m1, m2, b1, b2, mulankScore, bhagyankScore, overall, verdict: verdictFor(overall) }
}
