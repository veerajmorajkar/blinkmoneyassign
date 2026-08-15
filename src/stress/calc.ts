export type Scenario = 'normal' | 'stable' | 'correction' | 'severe';

/** Illustrative target only. BlinkMoney is not a goal-date product. */
export const GOAL = 1_000_000;
export const HORIZON_YEARS = 12;
export const START_YEAR = 2026;
export const MAX_MONTHS = 360;

export const SCENARIOS: {
  key: Scenario;
  label: string;
  hint: string;
}[] = [
  { key: 'normal', label: 'Normal', hint: '15% p.a. illustration' },
  { key: 'stable', label: 'Stable', hint: '8% p.a. quieter years' },
  { key: 'correction', label: 'Correction', hint: '1 bad year, then recover' },
  { key: 'severe', label: 'Severe', hint: '2 hard years, then recover' },
];

/** Annual rate for a given month in the path. Correction/severe are shocks, not forever. */
export function rateForMonth(scenario: Scenario, monthIndex: number) {
  if (scenario === 'normal') return 0.15;
  if (scenario === 'stable') return 0.08;
  if (scenario === 'correction') return monthIndex < 12 ? -0.18 : 0.12;
  return monthIndex < 24 ? -0.22 : 0.1;
}

export function monthlyFromDaily(daily: number, frequency: 'daily' | 'monthly') {
  return frequency === 'daily' ? Math.round(daily * (365 / 12)) : daily;
}

function growMonth(value: number, monthly: number, annualRate: number) {
  return value * (1 + annualRate / 12) + monthly;
}

export function projectSeries(
  present: number,
  monthly: number,
  scenario: Scenario,
  years = HORIZON_YEARS,
) {
  const pts = [present];
  let v = present;
  let m = 0;
  for (let y = 0; y < years; y++) {
    for (let i = 0; i < 12; i++) {
      v = growMonth(v, monthly, rateForMonth(scenario, m));
      m += 1;
    }
    pts.push(v);
  }
  return pts;
}

export function monthsToGoal(present: number, monthly: number, scenario: Scenario, goal = GOAL) {
  let v = present;
  let months = 0;
  while (v < goal && months < MAX_MONTHS) {
    v = growMonth(v, monthly, rateForMonth(scenario, months));
    months += 1;
  }
  return { months, reached: v >= goal };
}

export function yearFromMonths(months: number) {
  return START_YEAR + Math.floor(months / 12);
}

export function valueAtYears(present: number, monthly: number, scenario: Scenario, years: number) {
  const s = projectSeries(present, monthly, scenario, years);
  return s[s.length - 1] ?? present;
}

export function resilience(opts: {
  sipOk: boolean;
  sipStreak: number;
  monthly: number;
  present: number;
  scenario: Scenario;
}) {
  const consistency = opts.sipOk
    ? Math.min(94, 55 + Math.round(Math.min(opts.sipStreak, 60) * 0.6))
    : 32;
  const { months, reached } = monthsToGoal(opts.present, opts.monthly, opts.scenario);
  const timeHorizon = reached ? Math.max(38, Math.min(92, 100 - Math.round(months / 8))) : 36;
  const contribution = Math.max(30, Math.min(94, Math.round((opts.monthly / 5000) * 100)));
  const at10 = valueAtYears(opts.present, opts.monthly, opts.scenario, 10);
  const goalBuffer = Math.max(20, Math.min(94, Math.round((at10 / GOAL) * 70)));
  const shock = opts.scenario === 'severe' ? 10 : opts.scenario === 'correction' ? 6 : 0;
  const score = Math.max(
    22,
    Math.min(
      94,
      Math.round(consistency * 0.3 + timeHorizon * 0.22 + contribution * 0.26 + goalBuffer * 0.22 - shock),
    ),
  );
  return { score, consistency, timeHorizon, contribution, goalBuffer };
}
