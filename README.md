# AstroConnect

Frontend-only astrology consultation app (React + Vite + Tailwind). All data
is mocked unless noted otherwise — no backend required to run it.



### 2. Dark / light theme toggle
- Every color in the app now comes from CSS variables (`index.css`,
  `tailwind.config.js`) instead of hardcoded Tailwind colors — this is what
  makes a single toggle able to re-skin the whole app instantly.
- `context/ThemeContext.jsx` — toggle + `localStorage` persistence. Sun/moon
  button in the navbar.

### 3. Birth details shared automatically after login
- `LoginModal.jsx` now also asks for **place of birth** (optional).
- `ChatModal.jsx` — if you're logged in, the astrologer's opening message
  already references your date/time/place, and the canned "please share your
  birth details" line is skipped. A small badge confirms this is happening.

### 4. Community posts now live in your profile
- `context/CommunityContext.jsx` — posts persist to `localStorage` (this also
  fixes a bug where posts vanished if you navigated away from the Community
  page, since the page previously held them in local state that reset on
  unmount).
- `components/Profile.jsx` — new page (click your avatar in the navbar) shows
  your birth details and **every post you've made**, including your own
  anonymous ones (the real author is still tracked internally for this; only
  the public display hides it).

### 5. Reply variety (partial fix — see note below)
- `sampleReplies` (chat) expanded from 4 to 10 lines; `aiAstroReplies`
  (Community/Assistant) now has 2-3 hand-written variants per category, picked
  randomly. This reduces repetition but does **not** make replies actually
  understand what you typed.

---

## Why some things need a real API (you said this was OK to explain)

Two things in this app are fundamentally limited by being frontend-only mock
data, and genuinely need a backend + a real API key to fix properly:

**A. Chat / AI Astro / Assistant replies that actually respond to what you said.**
Right now every "AI" reply is a hand-written string from an array, cycled or
randomly picked — it never reads your actual message. To make replies really
vary and be relevant, you need:
1. A small backend server (Node/Express is the easiest pairing with this
   React app) — **never call an LLM API directly from the browser**, because
   your API key would be exposed to anyone who opens dev tools.
2. That backend holds an API key for a language model provider (Anthropic,
   OpenAI, etc.) and exposes one endpoint like `POST /api/chat` that takes
   the conversation so far and returns a real, context-aware reply.
3. The frontend (e.g. `ChatModal.jsx`'s `send()` function) calls that
   endpoint instead of picking from `sampleReplies`.

I can scaffold that backend (a small Express server + the fetch calls to
replace the canned-reply logic) if you want — just say so and tell me which
provider's API key you'll use.

**B. Store product photos that always genuinely match the product.**
Free hotlinking only reliably works for the specific, pre-confirmed images I
already wired in. To guarantee every product has a correct, real photo, you
need one of:
- **Your own product photos** — put them in `/public/images/products/` and
  point `image:` in `products.js` at `/images/products/<file>.jpg`. This is
  the right answer for a real store.
- **A stock-photo API** (Pexels or Pixabay both have free tiers with an API
  key) — same backend-proxy reasoning as above applies if you want to search
  per-product at runtime instead of hand-picking.

---

## Full file guide — what data lives where

### Entry points
- `index.html` — HTML shell, fonts, favicon.
- `src/main.jsx` — mounts the app, wraps it in every context provider (theme,
  wallet, cart, auth, streak, chat history, community) — this nesting order
  is why, e.g., `useWallet()` works in any component.
- `src/App.jsx` — the "router" (no real router library — just a `view` string
  in state: `'home' | 'store' | 'community' | 'match' | 'profile'`, plus a
  separate `profileAstrologer` state for an individual astrologer's page).
  Also owns the save-chat/share-chat orchestration logic.

### `src/data/` — all the mock content, no logic
- `astrologers.js` — the 6 astrologers: name, skills, languages, price,
  rating, online status, **avatar URL** (DiceBear cartoon). Also holds
  `sampleReplies` (canned chat lines) and the `initials()` helper.
- `products.js` — the 9 store products: name, category, price, **image URL
  (or null)**, description.
- `reviews.js` — astrologer reviews, keyed by astrologer `id`. Also exports
  `ratingBreakdown()`, a pure function that turns a review list into
  star-count percentages for `ReviewsList.jsx`.
- `horoscope.js` — all 12 zodiac signs: glyph, date range, mood, lucky
  color/number, and the "reading" text shown in Daily Horoscope.
- `zodiacTraits.js` — a one-line personality blurb per sign, used in the
  signup result screen.
- `numerology.js` — the 1-9 mulank/bhagyank table: ruling planet, glyph,
  badge color, trait text.
- `posts.js` — seed Community posts (`initialPosts`), the category list, and
  `aiAstroReplies` / `pickAiReply()` (the AI Astro reply variants).
- `assistant.js` — per-category guidance text + which astrologer skills and
  which store product to recommend, used by the floating Assistant widget.

### `src/utils/` — pure calculation functions, no UI, no state
- `zodiac.js` — `getZodiacSign(month, day)` and `getZodiacFromDob(dobString)`.
- `numerology.js` — `getMulank(dob)` and `getBhagyank(dob)`.
- `compatibility.js` — the 1-9 compatibility matrix + `computeCompatibility()`.

### `src/context/` — shared state, each one `localStorage`-backed or not as noted
- `ThemeContext.jsx` — `'dark' | 'light'`. **Persisted.**
- `WalletContext.jsx` — balance, recharge modal open/close. **Not persisted**
  (resets on refresh).
- `CartContext.jsx` — store cart items, totals. **Not persisted.**
- `AuthContext.jsx` — the logged-in `user` object (`name, dob, time, place,
  sign, mulank, bhagyank`), login modal state. **Not persisted** — you'd need
  to add this yourself if you want "stay logged in" across refreshes (see
  `StreakContext.jsx` for the pattern to copy).
- `StreakContext.jsx` — daily check-in streak. **Persisted**, and the only
  context that reasons about real calendar dates (today/yesterday).
- `ChatHistoryContext.jsx` — up to 5 saved chats (astrologer, full
  transcript). **Persisted.**
- `CommunityContext.jsx` — all Community posts, including ones you add.
  **Persisted.**

### `src/components/` — grouped by what they're for
- **Layout**: `Navbar.jsx`, `Footer.jsx`, `Hero.jsx`
- **Astrologer browsing**: `FilterBar.jsx`, `AstrologerGrid.jsx`,
  `AstrologerCard.jsx`, `AstrologerProfile.jsx`, `StarRating.jsx`,
  `ReviewsList.jsx`
- **Chat & billing**: `ChatModal.jsx` (the biggest single file — billing
  timer, thinking-pause, shared-context display, save-on-close flow all live
  here), `ShareChatPrompt.jsx`
- **Wallet**: `RechargeModal.jsx`
- **Signup / identity**: `LoginModal.jsx`, `NumerologyBadge.jsx`, `Profile.jsx`
- **Daily horoscope & matching**: `DailyHoroscope.jsx`, `CompatibilityMatcher.jsx`
- **Store**: `Store.jsx`, `CartDrawer.jsx`, `ProductImage.jsx`
- **Community**: `Community.jsx`, `NewPostForm.jsx`, `MoodPoll.jsx`
- **AI Assistant**: `AssistantWidget.jsx` (the floating bottom-right bubble)
- **Shared primitives**: `Avatar.jsx` (image-with-fallback for astrologers)

---

## Known simplifications (still true)
- No routing library — page switching is `useState` in `App.jsx`, not deep-linkable.
- No real backend for wallet/cart/auth — see `context/` table above for exactly
  what does and doesn't survive a refresh.
- AI Astro / Assistant replies and the compatibility matrix are hand-authored
  templates, not a real model — see "Why some things need a real API" above.

## Extending it
- Persist wallet, cart and auth to `localStorage` the same way `StreakContext.jsx` does.
- Add `react-router-dom` so profile pages, community posts and the matcher have real URLs.
- Scaffold the small backend described above if you want real, varying AI replies.
