export const POST_CATEGORIES = ["Career", "Love", "Health", "Money", "Family"]

// NOTE: each category has a few hand-written variants, picked at random — a
// real reduction in repetition, but still not true variety. See README.
export const aiAstroReplies = {
  Career: [
    "Based on common patterns, periods of career doubt like this often ease within 4-6 weeks once you make one small decisive move instead of waiting for full clarity. Is the uncertainty about the job itself, or about change in general?",
    "A lot of career stuckness is really a fear-of-the-wrong-choice problem, not a lack-of-options problem. What would you do if you knew you couldn't get it wrong?",
    "Worth noticing: are you deciding based on what excites you, or just on what feels safest right now? Both are valid, but they lead to different answers.",
  ],
  Love: [
    "Relationship uncertainty often reflects unspoken expectations on both sides. A direct, calm conversation usually resolves more than waiting for signs. What's one thing you haven't said out loud yet?",
    "Distance, timing or mismatched pace are usually easier to fix than an actual values mismatch. Which one does this feel closer to?",
    "Sometimes the question isn't 'is this right' but 'am I ready for this to be right.' Worth sitting with for a moment.",
  ],
  Health: [
    "I can't give medical advice, but stress and uncertainty often show up physically first. If this has been going on a while, pairing an astrologer's guidance with an actual doctor's visit is the safer path.",
    "Please don't skip a real medical opinion for anything physical — I can help with the stress and uncertainty around it, not the condition itself.",
  ],
  Money: [
    "Financial anxiety tends to peak right before a decision, not after. Most people feel better once they've written down the actual numbers instead of carrying them in their head. What's the specific decision you're stuck on?",
    "A good gut-check: would you make the same call if no one else would ever know about it? That usually cuts through a lot of the noise.",
  ],
  Family: [
    "Family patterns repeat until someone names them out loud. It's rarely about the most recent incident — it's usually about something older underneath it. Would it help to talk about what started this pattern?",
    "It's worth separating 'what happened this week' from 'what this always does to me.' They usually need different responses.",
  ],
}

export function pickAiReply(category) {
  const variants = aiAstroReplies[category]
  if (!variants) return null
  return variants[Math.floor(Math.random() * variants.length)]
}

export const initialPosts = [
  {
    id: 'post1',
    category: 'Career',
    anonymous: false,
    author: 'Rohit M.',
    text: "I've been offered a new job but it means relocating away from my family. My gut says yes but I keep finding reasons to say no. Second-guessing myself a lot.",
    time: '3 hours ago',
    aiReply: null,
    replies: [
      { id: 'c1', author: 'Megha', text: "I did this exact move 2 years ago. The first 3 months are hard, then it gets easier. Family understood once they saw me happier.", upvotes: 14, isAstrologer: false },
      { id: 'c2', author: 'Acharya Sandeep Iyer', text: "Your hesitation sounds more like fear of change than an actual bad sign in your chart. Worth a proper reading if you want specifics.", upvotes: 9, isAstrologer: true },
    ],
  },
  {
    id: 'post2',
    category: 'Love',
    anonymous: true,
    author: 'Anonymous',
    text: "Been talking to someone for 6 months, long distance. Some days it feels right, some days I feel like I'm forcing it. How do I know the difference?",
    time: '7 hours ago',
    aiReply: aiAstroReplies.Love[0],
    replies: [
      { id: 'c3', author: 'Divya', text: "If you have to convince yourself daily that it's right, that's usually the answer already.", upvotes: 22, isAstrologer: false },
    ],
  },
  {
    id: 'post3',
    category: 'Money',
    anonymous: false,
    author: 'Sanjay K.',
    text: "Thinking of investing my savings in a friend's business. Numbers look okay on paper but something feels off. Anyone been through this?",
    time: '1 day ago',
    aiReply: aiAstroReplies.Money[0],
    replies: [
      { id: 'c4', author: 'Pt. Ramesh Joshi', text: "Mixing money and friendship rarely goes wrong because of the money — it goes wrong because expectations were never written down. Get it in writing regardless of what your gut says.", upvotes: 31, isAstrologer: true },
      { id: 'c5', author: 'Farah', text: "Lost a friendship this way. Not saying don't do it, just... get everything in writing like the astrologer said.", upvotes: 18, isAstrologer: false },
    ],
  },
]
