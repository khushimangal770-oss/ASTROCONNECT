// Mock reviews, keyed by astrologer id
export const reviews = {
  1: [
    { id: 'r1', name: 'Priya S.', rating: 5, date: '2 days ago', verified: true, text: "Pt. Joshi ji ne meri job situation bilkul clear kar di. Jo unhone bola woh ek mahine mein sach hua. Highly recommend." },
    { id: 'r2', name: 'Rahul', rating: 5, date: '1 week ago', verified: true, text: "Vastu suggestions diye jo turant implement kar sakte the. Bahut practical approach hai unka." },
    { id: 'r3', name: 'Anita K.', rating: 4, date: '2 weeks ago', verified: true, text: "Achha session tha, thoda rushed laga end mein kyunki time khatam ho gaya. Overall satisfied." },
    { id: 'r4', name: 'Vikram', rating: 5, date: '3 weeks ago', verified: false, text: "Genuine astrologer, sunta hai pehle poori baat phir advice deta hai." },
  ],
  2: [
    { id: 'r5', name: 'Sneha', rating: 5, date: '3 days ago', verified: true, text: "Tarot reading was spot on about my relationship. Meera felt very intuitive and kind." },
    { id: 'r6', name: 'Arjun P.', rating: 4, date: '1 week ago', verified: true, text: "Good numerology insights, gave me clear next steps." },
  ],
  3: [
    { id: 'r7', name: 'Deepa', rating: 5, date: '5 days ago', verified: true, text: "24 saal ka experience clearly dikhta hai. Palmistry reading detailed thi." },
    { id: 'r8', name: 'Suresh M.', rating: 5, date: '1 week ago', verified: true, text: "Best astrologer on this app, bilkul doubt nahi." },
    { id: 'r9', name: 'Kiran', rating: 3, date: '2 weeks ago', verified: false, text: "Theek tha, kuch naya nahi laga jo maine pehle nahi suna ho." },
  ],
  4: [
    { id: 'r10', name: 'Pooja', rating: 4, date: '4 days ago', verified: true, text: "Tarot cards explanation was clear and gentle, felt comfortable sharing." },
  ],
  5: [
    { id: 'r11', name: 'Manoj', rating: 5, date: '2 days ago', verified: true, text: "31 saal ka experience, bahut depth se explain karte hain." },
    { id: 'r12', name: 'Ritu', rating: 4, date: '6 days ago', verified: true, text: "Vastu aur numerology dono cover kiya ek hi session mein, value for money." },
  ],
  6: [
    { id: 'r13', name: 'Aisha', rating: 5, date: '1 week ago', verified: true, text: "Palmistry session was detailed and she explained everything patiently." },
    { id: 'r14', name: 'Tanvi', rating: 4, date: '2 weeks ago', verified: false, text: "Achha tha, Gujarati mein baat kar sakte hain yeh bhi plus point hai." },
  ],
}

export function ratingBreakdown(list) {
  const counts = [0, 0, 0, 0, 0] // index 0 = 1-star ... index 4 = 5-star
  list.forEach((r) => counts[r.rating - 1]++)
  const total = list.length || 1
  return counts.map((c, i) => ({ star: i + 1, count: c, pct: Math.round((c / total) * 100) })).reverse()
}
