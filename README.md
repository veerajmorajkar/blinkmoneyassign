# BlinkMoney

A React Native take-home for BlinkMoney: a working rebuild of the liquid wealth account, with one extra loop that the live app does not really let you *feel*.

This is a prototype on mock data. It is not a production build, and it does not claim to forecast markets.

<p>
  <img src="docs/screenshots/home-momentum.png" alt="Home — Wealth Momentum" width="280" />
  &nbsp;
  <img src="docs/screenshots/stress-test.png" alt="Wealth Stress Test" width="280" />
  &nbsp;
  <img src="docs/screenshots/wealth-circle.png" alt="Wealth Circle" width="280" />
</p>

## The gap

BlinkMoney’s product is unusually clear: one account, daily SIP, money stays invested, borrow against it without selling. Save → Grow → Borrow is the whole story.

The live app, at least as it stands today, does not quite tell that story. Home still reads like a landing page — promo, help, grids — while the actual jobs (today’s SIP, how far you are from credit, what happens if the decade is quieter than 15%) sit in the background. You can *read* the loop. It is harder to *use* it.

I kept their palette (black + lime `#A3E635`) and the tab jobs. I did not copy the marketing chrome. The work is a quieter shell plus a few interactions that make the loop visible.

## Why not another dashboard

The brief asked for something that could move engagement, referral, or wealth gamification — and it asked for thinking that is not obvious.

A portfolio screen with a pie and two line charts would have been the default. BlinkMoney is not a stock ticker. People already have Groww for that. What they do not have is a reason to keep the SIP on, a way to sit through a weak year without selling, and a way to bring someone else in without publishing their balance.

So I built around behaviour, not allocation charts:

| Feature | Outcome it is aiming at |
| --- | --- |
| Still Growing (Save → Grow → Borrow) | Wealth gamification — the loop as a mechanic |
| Wealth Momentum + share | Engagement, and something you might send unprompted |
| Wealth Circle | Referral without a coupon |
| Stress Test | Engagement — come back and *do* something with the plan |

Scores on this app are heuristics, labelled as such. They are not NAV, credit scores, or predicted returns.

## Features

### Still Growing

Save, grow, and borrow as one ladder — not three products. You see today’s SIP, how much more invested unlocks credit, and that a draw is a lien, not a sale.

Implemented in `src/components/StillGrowing.tsx`, on Home. Save (`app/(tabs)/save.tsx`) and Borrow (`app/(tabs)/borrow.tsx`) are the two actions that feed it. The SIP calculator on Home is local; it does not quietly rewrite the wallet.

### Wealth Momentum

A single “how is this habit going?” read: consistency, growth, SIP discipline, and a next move (step the SIP). It is meant to answer “am I still in the loop?” in a few seconds, not to rank the user.

`src/components/WealthMomentum.tsx` on Home. Mock wallet in `src/data/store.tsx`.

### Share progress

From Momentum (and again at the bottom of Stress Test) you can share a short card: streak, a score, SIP still on — not the full book. The share sheet is the OS one; there is no native share extension in this prototype.

Same component family; Stress Test uses `src/components/stress/ShareMomentumCard.tsx`.

### Wealth Circle

Referral as a pair, not a gift box and a code on an empty screen. You add a friend and compare **habits** (Momentum, consistency) — never balances. The invite copy is built that way on purpose.

`src/components/WealthCircle.tsx`, Rewards tab (`app/(tabs)/rewards.tsx`), teaser on Home.

### Wealth Stress Test

The extra tab. One page: *if the next decade is quieter than 15% p.a.\*, what happens to this SIP — and what can I change?*

You pick a path (Normal is their disclosed illustration; Dip / Severe are a shock, then recovery). The chart and the delay update on the same screen. You can raise the monthly equivalent, see the plan check move, and apply a step-up **to the simulation only**.

That is the out-of-the-box piece: not “here is your allocation,” but “here is how resilient the *plan* is, and here is the one lever you actually control.”

`app/(tabs)/stress.tsx` → `src/components/stress/`. Math is deterministic in `src/stress/calc.ts`.

## Run

```sh
npm install
npx expo start
```

Then iOS simulator, Android emulator, or Expo Go. Web: `npx expo start --web`.

## Stack

Expo SDK 57, Expo Router, TypeScript, Reanimated, Gesture Handler, `react-native-svg`. No backend.

```
app/                   screens
src/theme.ts           colour and type
src/data/store.tsx     mock wallet
src/stress/calc.ts     scenario paths
src/components/        UI
```

Notes on money copy, empty states, and Android quirks: [docs/EDGE_CASES.md](./docs/EDGE_CASES.md). Visual rules: [docs/DESIGN.md](./docs/DESIGN.md).
