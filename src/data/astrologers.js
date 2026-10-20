export const SKILLS = ["All", "Vedic", "Tarot", "Numerology", "Vastu", "Palmistry"]

// avatar URLs use DiceBear's "avataaars" style (api.dicebear.com) — these are
// generated CARTOON avatars (Bitmoji/Snapchat-style illustrations), not
// photos of real people, which avoids both the "no real Indian photos"
// problem and any likeness/rights issue with using stock photos of strangers.
// seed is fixed per astrologer so the same cartoon face shows every time.
export const astrologers = [
  { id: 1, name: "Pt. Ramesh Joshi", skills: ["Vedic", "Vastu"], langs: ["Hindi", "English"], exp: 18, rating: 4.9, orders: 12400, price: 25, online: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramesh-joshi&backgroundColor=b6e3f4,c0aede,d1d4f9" },
  { id: 2, name: "Meera Nair", skills: ["Tarot", "Numerology"], langs: ["English", "Malayalam"], exp: 9, rating: 4.8, orders: 8300, price: 18, online: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera-nair&backgroundColor=ffd5dc,ffdfbf" },
  { id: 3, name: "Acharya Sandeep Iyer", skills: ["Vedic", "Palmistry"], langs: ["Tamil", "English", "Hindi"], exp: 24, rating: 4.9, orders: 20100, price: 40, online: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sandeep-iyer&backgroundColor=c0aede,b6e3f4" },
  { id: 4, name: "Kavita Deshmukh", skills: ["Tarot"], langs: ["Marathi", "Hindi"], exp: 7, rating: 4.6, orders: 3900, price: 12, online: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kavita-deshmukh&backgroundColor=ffdfbf,ffd5dc" },
  { id: 5, name: "Dr. Arvind Sharma", skills: ["Vedic", "Numerology", "Vastu"], langs: ["Hindi", "Punjabi"], exp: 31, rating: 4.7, orders: 15700, price: 35, online: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arvind-sharma&backgroundColor=d1d4f9,b6e3f4" },
  { id: 6, name: "Nisha Bhatt", skills: ["Palmistry", "Tarot"], langs: ["Gujarati", "Hindi", "English"], exp: 12, rating: 4.7, orders: 6100, price: 20, online: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nisha-bhatt&backgroundColor=ffd5dc,d1d4f9" },
]

// NOTE: these are hand-written canned lines, cycled in order — they WILL
// repeat for long conversations or repeat visits. Real variety needs a real
// model behind a backend (see README "Making replies actually vary").
export const sampleReplies = [
  "Thank you. Please share your date, time and place of birth so I can open your kundli.",
  "Your chart shows a strong 10th house this year. A change is possible between November and February.",
  "Avoid signing anything major before the second week of October. Would you like a simple remedy?",
  "Keep it simple: donate on Saturdays and stay consistent with your plan. Anything else you want to ask?",
  "Saturn is transiting an important house for you right now — this explains some of the delay you've been feeling.",
  "There's no major obstacle in your chart here, just a timing issue. Patience for the next 6-8 weeks will help.",
  "I'd suggest wearing a small piece of yellow sapphire or chanting the Guru beej mantra on Thursdays.",
  "Your moon sign suggests you process things emotionally first, logically second — that's not a flaw, work with it.",
  "This is a good phase to start something new, but not to make big financial commitments just yet.",
  "Is there anything specific from today's conversation you'd like me to go deeper on?",
]

export function initials(name) {
  return name.replace(/^(Pt\.|Dr\.|Acharya)\s/, "").split(" ").map((w) => w[0]).join("").slice(0, 2)
}
