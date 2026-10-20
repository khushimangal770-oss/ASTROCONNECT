function digitSum(n) {
  return String(n).split('').reduce((sum, d) => sum + Number(d), 0)
}

function reduceToSingleDigit(n) {
  while (n > 9) n = digitSum(n)
  return n
}

// Mulank (root number) — from the day of birth only
export function getMulank(dobString) {
  if (!dobString) return null
  const [, , day] = dobString.split('-').map(Number)
  if (!day) return null
  return reduceToSingleDigit(day)
}

// Bhagyank (destiny number) — from the full date of birth
export function getBhagyank(dobString) {
  if (!dobString) return null
  const [y, m, d] = dobString.split('-').map(Number)
  if (!y || !m || !d) return null
  const total = digitSum(d) + digitSum(m) + digitSum(y)
  return reduceToSingleDigit(total)
}
