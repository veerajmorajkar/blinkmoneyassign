const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function rupee(n: number) {
  return inr.format(Math.round(n));
}

export function lakh(n: number) {
  if (Math.abs(n) >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`;
  return rupee(n);
}

export function pct(n: number) {
  const sign = n > 0 ? '+' : n < 0 ? '−' : '';
  return `${sign}${Math.abs(n).toFixed(2)}%`;
}

/** Daily SIP future value at a disclosed assumed rate. Not a promise. */
export function sipFutureValue(daily: number, years: number, annualRate = 0.15) {
  const days = Math.max(1, years) * 365;
  const r = annualRate / 365;
  return daily * ((Math.pow(1 + r, days) - 1) / r);
}
