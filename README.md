# AstroConnect

A frontend astrology consultation app — browse and chat with astrologers,
check your daily horoscope, buy puja remedies, and ask the community. Built
with **React + Vite + Tailwind CSS**. All content is mocked (no backend) so
you can run it with nothing but `npm install`.

---

## Features

- **Astrologer directory** — filter by speciality/language, sort by rating,
  price or experience; editorial row layout instead of generic cards
- **Fair, live chat billing** — a running per-second meter that **pauses
  automatically** while the astrologer is shown "thinking", so you're never
  billed for silence
- **Save & continue a chat with a different astrologer** — explicitly opt in
  to save a conversation when you leave it; the next astrologer you chat with
  can pick up from where you left off instead of you repeating yourself
- **AI Astro Assistant** — a floating chat bubble that greets you, asks what's
  on your mind, and routes you to a matching astrologer or store remedy
- **Astrologer profiles & reviews** — rating breakdown, verified-consultation
  badges, sortable reviews
- **Daily horoscope** — all 12 signs, free (no wallet charge), with a
  `localStorage`-backed daily check-in **streak**
- **Signup with zodiac sign + numerology** — enter your date (and optionally
  time/place) of birth and get your sun sign, Mulank and Bhagyank, each with
  a small badge for its ruling planet (e.g. Mulank 1 → Sun ☉)
- **Compatibility matcher** — a numerology-based match score between two
  birth dates, for fun
- **Puja item store** — rudraksha, gemstones, yantras, idols, with a cart
- **Community Q&A** — post a problem (anonymously if you like), get an
  instant AI Astro reply plus real replies from other users/astrologers, vote
  in a daily "mood of the day" poll
- **Profile page** — your birth details (shared automatically with
  astrologers so you never retype them) and every post you've made
- **Dark / light theme toggle** — the whole app re-skins from one button

---

## Getting started

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. For a production build:

```bash
npm run build
npm run preview
```

---

## Tech stack


| Framework  | React 18 (function components + hooks)             |
| Build tool | Vite                                               |
| Styling    | Tailwind CSS, theme-aware via CSS variables        |
| State      | React Context (no Redux/Zustand)                   |
| Routing    | None — a `view` string in `App.jsx`'s state        |
| Persistence| `localStorage`, used selectively (see table below) |

---

## Project structure

```
astroconnect/
├─ index.html
├─ package.json / vite.config.js / tailwind.config.js / postcss.config.js
└─ src/
   ├─ main.jsx          — mounts App, wraps it in every context provider
   ├─ App.jsx            — the "router" (view switching) + top-level orchestration
   ├─ index.css           — Tailwind layers + CSS variables for theming
   ├─ data/               — static mock content (no logic)
   ├─ utils/              — pure calculation functions (no UI, no state)
   ├─ context/            — shared app state, one file per concern
   └─ components/         — UI, grouped by feature
```

### `src/data/` — content, no logic
| File              | Holds 

| `astrologers.js`  | The 6 astrologers (skills, languages, price, rating, avatar URL), plus `sampleReplies` for the chat demo 
| `products.js`     | The 9 store products (name, category, price, image URL or `null`, description) 
| `reviews.js`      | Astrologer reviews keyed by id, plus a `ratingBreakdown()` helper 
| `horoscope.js`    | All 12 zodiac signs — glyph, date range, mood, lucky color/number, daily reading 
| `zodiacTraits.js` | One-line personality blurb per sign |
| `numerology.js`   | The 1-9 Mulank/Bhagyank table — ruling planet, glyph, badge color, trait |
| `posts.js`        | Seed Community posts, categories, and `aiAstroReplies` / `pickAiReply()` |
| `assistant.js`    | Per-category guidance text + which astrologer skills / product to recommend |

### `src/utils/` — pure functions
| File              | Exports |

| `zodiac.js`        | `getZodiacSign(month, day)`, `getZodiacFromDob(dob)` |
| `numerology.js`    | `getMulank(dob)`, `getBhagyank(dob)` |
| `compatibility.js` | The 1-9 compatibility matrix + `computeCompatibility()` |

### `src/context/` — shared state
| Context              | Manages                                                        | Persisted to `localStorage`? |

| `ThemeContext`       | `'dark' \| 'light'`                                             | Yes |
| `WalletContext`      | Balance, recharge modal                                         | No |
| `CartContext`        | Store cart items/totals                                         | No |
| `AuthContext`        | Logged-in user (name, dob, time, place, sign, mulank, bhagyank) | No |
| `StreakContext`      | Daily check-in streak                                           | Yes |
| `ChatHistoryContext` | Up to 5 saved chats (astrologer + full transcript )             | Yes |
| `CommunityContext`   | All Community posts, including ones you add                      | Yes |

### `src/components/` — grouped by feature
| Group | Files |
|---|---|
| Layout | `Navbar`, `Footer`, `Hero` |
| Astrologer browsing | `FilterBar`, `AstrologerGrid`, `AstrologerCard`, `AstrologerProfile`, `StarRating`, `ReviewsList` |
| Chat & billing | `ChatModal` (timer, thinking-pause, shared-context, save-on-close), `ShareChatPrompt` |
| Wallet | `RechargeModal` |
| Signup / identity | `LoginModal`, `NumerologyBadge`, `Profile` |
| Horoscope & matching | `DailyHoroscope`, `CompatibilityMatcher` |
| Store | `Store`, `CartDrawer`, `ProductImage` |
| Community | `Community`, `NewPostForm`, `MoodPoll` |
| AI Assistant | `AssistantWidget` (floating bottom-right bubble) |
| Shared | `Avatar` (image with fallback to initials) |

---

## Images

- **Astrologers** use [DiceBear](https://www.dicebear.com/) `avataaars` —
  generated cartoon avatars (Bitmoji-style), not photos of real people.
- **Store products**: 2 of 9 have a confirmed genuine photo (Wikimedia
  Commons, openly licensed); the rest are intentionally `image: null` and
  fall back to a category emoji rather than show a mismatched stock photo.
  See `data/products.js` for which is which, and "Known limitations" below
  for how to finish this properly.
- Both `Avatar.jsx` and `ProductImage.jsx` gracefully fall back (to initials /
  emoji) if an image URL ever fails to load.

---

## Known limitations

- **No routing library** — page switching is `useState` in `App.jsx`, so
  nothing is deep-linkable or shareable by URL.
- **No real backend** — wallet, cart and login state reset on refresh
  (streak, saved chats and community posts are the exceptions — they use
  `localStorage`, see the context table above).
- **AI replies aren't real AI.** Chat replies, AI Astro replies and the
  compatibility score are all hand-written templates — cycled or randomly
  picked, never actually reading what you typed. Making this real needs:
  1. A small backend (Node/Express pairs easily with this app) holding an
     LLM API key — **never call an LLM API directly from the browser**, since
     the key would be exposed in dev tools.
  2. One endpoint (e.g. `POST /api/chat`) that takes the conversation and
     returns a real, context-aware reply.
  3. The frontend calling that endpoint instead of picking from
     `sampleReplies`.
- **Store photos**: only 2 products have a verified real photo. To finish
  this properly, either add your own product photos (e.g. to
  `/public/images/products/` and point `image:` at them) or wire a
  stock-photo API (Pexels/Pixabay, free tier) behind the same kind of backend
  proxy described above.

---

## Extending it

- Persist wallet, cart and auth to `localStorage` the same way
  `StreakContext.jsx` already does.
- Add `react-router-dom` so profile pages, community posts and the matcher
  get real, shareable URLs.
- Scaffold the small backend described above for real AI replies.
