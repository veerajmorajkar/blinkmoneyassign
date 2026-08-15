import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { CurrentPlanSummary } from '@/src/components/stress/CurrentPlanSummary';
import { InsightCard } from '@/src/components/stress/InsightCard';
import { NextBestMove } from '@/src/components/stress/NextBestMove';
import { PlanComparison } from '@/src/components/stress/PlanComparison';
import { ResilienceScore } from '@/src/components/stress/ResilienceScore';
import { ScenarioResult } from '@/src/components/stress/ScenarioResult';
import { ScenarioSelector } from '@/src/components/stress/ScenarioSelector';
import { ShareMomentumCard } from '@/src/components/stress/ShareMomentumCard';
import { SIP_STEPS, SipAdjustmentControl } from '@/src/components/stress/SipAdjustmentControl';
import { EmptyState, InsufficientState, LoadingState } from '@/src/components/stress/StressStates';
import { StepUpBottomSheet } from '@/src/components/stress/StepUpBottomSheet';
import { StressTestHeader } from '@/src/components/stress/StressTestHeader';
import { WealthProjectionChart } from '@/src/components/stress/WealthProjectionChart';
import { Screen } from '@/src/components/Screen';
import { T } from '@/src/components/T';
import { useWallet } from '@/src/data/store';
import {
  GOAL,
  HORIZON_YEARS,
  monthsToGoal,
  monthlyFromDaily,
  projectSeries,
  resilience,
  type Scenario,
  valueAtYears,
  yearFromMonths,
} from '@/src/stress/calc';

function snapSip(n: number) {
  return SIP_STEPS.reduce((best, s) => (Math.abs(s - n) < Math.abs(best - n) ? s : best), SIP_STEPS[0]);
}

function yearOrNull(r: { months: number; reached: boolean }) {
  return r.reached ? yearFromMonths(r.months) : null;
}

function insightFor(scenario: Scenario, sipOk: boolean) {
  if (!sipOk) {
    return {
      title: 'A missed debit hurts more than a quiet market.',
      body: 'This path assumes the SIP keeps running. Retry the debit first.',
    };
  }
  if (scenario === 'severe' || scenario === 'correction') {
    return {
      title: 'Weaker markets delay the goal. Selling locks it in.',
      body: 'Keep units invested. Borrow if you need cash — don’t redeem the SIP.',
    };
  }
  return {
    title: 'This holds if the SIP stays on.',
    body: 'Normal is the ~15% p.a.* illustration, not a promise. A step-up adds buffer if the decade is quieter.',
  };
}

export function StressTestPage() {
  const w = useWallet();
  const router = useRouter();
  const baseMonthly = monthlyFromDaily(w.dailySip, w.frequency);
  const present = w.balance;

  const [ready, setReady] = useState(false);
  const [scenario, setScenario] = useState<Scenario>('normal');
  const [monthly, setMonthly] = useState(() => snapSip(baseMonthly));
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 520);
    return () => clearTimeout(id);
  }, []);

  const empty = w.dailySip <= 0 || (w.invested <= 0 && !w.pending);
  const thin = !empty && (w.sipStreak < 3 || w.invested < 500);

  const sim = useMemo(() => {
    const basePath = monthsToGoal(present, baseMonthly, 'normal');
    const marketPath = monthsToGoal(present, baseMonthly, scenario);
    const adjPath = monthsToGoal(present, monthly, scenario);
    const suggested = Math.min(5000, snapSip(baseMonthly) + 500);
    const suggestedPath = monthsToGoal(present, suggested, scenario);
    return {
      baseSeries: projectSeries(present, baseMonthly, 'normal'),
      scenSeries: projectSeries(present, monthly, scenario),
      baseYear: yearOrNull(basePath),
      marketYear: yearOrNull(marketPath),
      adjYear: yearOrNull(adjPath),
      monthDelta: marketPath.months - basePath.months,
      baseAtH: valueAtYears(present, baseMonthly, 'normal', HORIZON_YEARS),
      marketAtH: valueAtYears(present, baseMonthly, scenario, HORIZON_YEARS),
      rBase: resilience({ sipOk: w.sipOk, sipStreak: w.sipStreak, monthly: baseMonthly, present, scenario }),
      rAdj: resilience({ sipOk: w.sipOk, sipStreak: w.sipStreak, monthly, present, scenario }),
      suggested,
      sooner: Math.max(0, marketPath.months - suggestedPath.months),
    };
  }, [present, baseMonthly, monthly, scenario, w.sipOk, w.sipStreak]);

  const copy = insightFor(scenario, w.sipOk);

  if (!ready) {
    return (
      <Screen>
        <StressTestHeader />
        <LoadingState />
      </Screen>
    );
  }

  if (empty) {
    return (
      <Screen>
        <StressTestHeader />
        <EmptyState onStart={() => router.push('/save')} />
      </Screen>
    );
  }

  if (thin) {
    return (
      <Screen>
        <StressTestHeader />
        <InsufficientState onBack={() => router.push('/save')} />
      </Screen>
    );
  }

  return (
    <Screen gap={24}>
      <StressTestHeader />
      <CurrentPlanSummary
        daily={w.frequency === 'daily' ? w.dailySip : null}
        monthly={baseMonthly}
        current={present}
        goal={GOAL}
        year={sim.baseYear}
      />
      <View style={{ gap: 16 }}>
        <ScenarioSelector value={scenario} onChange={setScenario} />
        <WealthProjectionChart base={sim.baseSeries} scenario={sim.scenSeries} />
        <ScenarioResult
          baseYear={sim.baseYear}
          scenYear={sim.marketYear}
          baseValue={sim.baseAtH}
          scenValue={sim.marketAtH}
          monthDelta={sim.monthDelta}
        />
      </View>
      <View style={{ gap: 16 }}>
        <SipAdjustmentControl value={monthly} onChange={setMonthly} />
        <PlanComparison
          currentSip={snapSip(baseMonthly)}
          currentYear={yearOrNull(monthsToGoal(present, baseMonthly, scenario))}
          currentScore={sim.rBase.score}
          adjustedSip={monthly}
          adjustedYear={sim.adjYear}
          adjustedScore={sim.rAdj.score}
        />
      </View>
      <ResilienceScore
        score={sim.rAdj.score}
        consistency={sim.rAdj.consistency}
        timeHorizon={sim.rAdj.timeHorizon}
        contribution={sim.rAdj.contribution}
        goalBuffer={sim.rAdj.goalBuffer}
      />
      <InsightCard title={copy.title} body={copy.body} />
      <NextBestMove
        current={snapSip(baseMonthly)}
        suggested={sim.suggested}
        monthsSooner={sim.sooner}
        onExplore={() => setSheet(true)}
      />
      <View style={{ gap: 8 }}>
        <T size={13} tone="muted">
          You can’t control the market.
        </T>
        <T size={15} weight="med" style={{ lineHeight: 22 }}>
          You can keep the SIP on, and not sell in a dip.
        </T>
      </View>
      <ShareMomentumCard score={sim.rAdj.score} streakDays={w.sipStreak} daily={w.dailySip} />
      <StepUpBottomSheet
        open={sheet}
        current={snapSip(baseMonthly)}
        step={500}
        onClose={() => setSheet(false)}
        onApply={() => {
          setMonthly(sim.suggested);
          setSheet(false);
        }}
      />
    </Screen>
  );
}
