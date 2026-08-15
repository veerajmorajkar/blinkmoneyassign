import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import { sipFutureValue } from '@/src/format';

export type Frequency = 'daily' | 'monthly';
export type Years = 1 | 5 | 10;

export type CircleFriend = {
  name: string;
  momentum: number;
  streakMonths: number;
  growPct: number;
  saveDone: boolean;
  unlocked: boolean;
};

type State = {
  name: string;
  dailySip: number;
  frequency: Frequency;
  years: Years;
  invested: number;
  marketAdd: number;
  drawn: number;
  sipStreak: number;
  pending: { fund: string; amount: number; status: 'amount' | 'active' | 'failed' } | null;
  sipOk: boolean;
  notify: boolean;
  circle: CircleFriend | null;
};

type Action =
  | { type: 'setDaily'; value: number }
  | { type: 'setFrequency'; value: Frequency }
  | { type: 'setYears'; value: Years }
  | { type: 'confirmSip' }
  | { type: 'failSip' }
  | { type: 'retrySip' }
  | { type: 'draw'; value: number }
  | { type: 'repay' }
  | { type: 'toggleNotify' }
  | { type: 'addFriend'; name: string }
  | { type: 'leaveCircle' };

const UNLOCK_AT = 25_000;
const LTV = 0.5;

const seed: State = {
  name: 'Veeraj',
  dailySip: 100,
  frequency: 'daily',
  years: 1,
  invested: 18_400,
  marketAdd: 810,
  drawn: 0,
  sipStreak: 14,
  pending: {
    fund: 'ICICI Prudential Multi-Asset — Growth',
    amount: 100,
    status: 'amount',
  },
  sipOk: true,
  notify: true,
  circle: null,
};

function clampSip(n: number) {
  return Math.min(50_000, Math.max(21, Math.round(n)));
}

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case 'setDaily':
      return { ...state, dailySip: clampSip(action.value) };
    case 'setFrequency':
      return { ...state, frequency: action.value };
    case 'setYears':
      return { ...state, years: action.value };
    case 'confirmSip':
      return {
        ...state,
        pending: state.pending ? { ...state.pending, status: 'active', amount: state.dailySip } : null,
        sipOk: true,
      };
    case 'failSip':
      return {
        ...state,
        sipOk: false,
        pending: state.pending ? { ...state.pending, status: 'failed' } : null,
      };
    case 'retrySip':
      return {
        ...state,
        sipOk: true,
        pending: state.pending ? { ...state.pending, status: 'active' } : null,
      };
    case 'draw': {
      const cap = Math.max(0, state.invested * LTV - state.drawn);
      const value = Math.min(cap, Math.max(0, Math.round(action.value)));
      return { ...state, drawn: state.drawn + value };
    }
    case 'repay':
      return { ...state, drawn: 0 };
    case 'toggleNotify':
      return { ...state, notify: !state.notify };
    case 'addFriend': {
      const name = action.name.trim() || 'Aarav';
      return {
        ...state,
        circle: {
          name,
          momentum: 68,
          streakMonths: 5,
          growPct: 63,
          saveDone: true,
          unlocked: false,
        },
      };
    }
    case 'leaveCircle':
      return { ...state, circle: null };
    default:
      return state;
  }
}

type Ctx = State & {
  balance: number;
  xirr: number;
  lifetimePct: number;
  creditLeft: number;
  unlockAt: number;
  unlocked: boolean;
  projection: number;
  momentum: number;
  dispatch: (a: Action) => void;
};

const Wallet = createContext<Ctx | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduce, seed);
  const value = useMemo(() => {
    const balance = state.invested + state.marketAdd;
    const lifetimePct = state.invested > 0 ? (state.marketAdd / state.invested) * 100 : 0;
    const xirr = lifetimePct === 0 ? 0 : 16.43;
    const creditCap = state.invested * LTV;
    const creditLeft = Math.max(0, creditCap - state.drawn);
    const unlocked = state.invested >= UNLOCK_AT;
    const daily = state.frequency === 'daily' ? state.dailySip : state.dailySip / 30;
    return {
      ...state,
      balance,
      xirr,
      lifetimePct,
      creditLeft,
      unlockAt: UNLOCK_AT,
      unlocked,
      projection: sipFutureValue(daily, state.years),
      momentum: state.sipOk ? 74 : 34,
      dispatch,
    };
  }, [state]);

  return <Wallet.Provider value={value}>{children}</Wallet.Provider>;
}

export function useWallet() {
  const ctx = useContext(Wallet);
  if (!ctx) throw new Error('Wallet missing');
  return ctx;
}
