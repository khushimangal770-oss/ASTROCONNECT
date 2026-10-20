export const ASSISTANT_CATEGORIES = ['Career', 'Love', 'Money', 'Health', 'Family', 'Something else']

// Each category gives a short canned reply, which astrologer skills to
// recommend, and one relevant store product (a "remedy") to suggest.
export const assistantGuidance = {
  Career: { reply: "Career doubts usually ease once you stop waiting for full certainty and make one decisive move. A Vedic or Numerology reading can show you a better window to act.", skills: ['Vedic', 'Numerology'], productId: 'p2' },
  Love: { reply: "Relationship questions are often less about the stars and more about a conversation you've been avoiding. A Tarot reading can help you see what you already sense.", skills: ['Tarot'], productId: 'p3' },
  Money: { reply: "Financial anxiety usually peaks right before a decision. A Numerology or Vastu consultation can help you see the real picture instead of carrying it in your head.", skills: ['Numerology', 'Vastu'], productId: 'p2' },
  Health: { reply: "I can't give medical advice — please see a doctor for anything physical. For the stress and uncertainty around it, a Vedic astrologer can offer some real perspective.", skills: ['Vedic'], productId: 'p4' },
  Family: { reply: "Family patterns usually repeat until someone names them out loud. A Vastu or Vedic astrologer can help you understand the pattern, not just the latest incident.", skills: ['Vastu', 'Vedic'], productId: 'p5' },
  'Something else': { reply: "You don't need to have it all figured out before talking to someone. Here's a well-rated astrologer who can help you work through it.", skills: [], productId: 'p1' },
}
