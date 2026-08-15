import { View } from 'react-native';
import { AnimInt } from '@/src/components/stress/AnimInt';
import { T } from '@/src/components/T';
import { rupee } from '@/src/format';
import { color, radius } from '@/src/theme';

function Col({
  title,
  sip,
  year,
  score,
  accent,
}: {
  title: string;
  sip: number;
  year: number | null;
  score: number;
  accent?: boolean;
}) {
  return (
    <View style={{ flex: 1, gap: 6 }}>
      <T size={12} tone={accent ? 'lime' : 'muted'} weight="med">
        {title}
      </T>
      <T size={14}>{rupee(sip)} / mo</T>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <T size={11} tone="muted">
          ₹10L
        </T>
        {year == null ? (
          <T size={16} serif tone={accent ? 'lime' : 'text'}>
            30+
          </T>
        ) : (
          <AnimInt value={year} size={16} serif lime={accent} />
        )}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <T size={11} tone="muted">
          Check
        </T>
        <AnimInt value={score} size={16} serif lime={accent} />
      </View>
    </View>
  );
}

export function PlanComparison({
  currentSip,
  currentYear,
  currentScore,
  adjustedSip,
  adjustedYear,
  adjustedScore,
}: {
  currentSip: number;
  currentYear: number | null;
  currentScore: number;
  adjustedSip: number;
  adjustedYear: number | null;
  adjustedScore: number;
}) {
  if (adjustedSip === currentSip) return null;

  return (
    <View
      style={{
        backgroundColor: color.surface,
        borderRadius: radius.md,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        gap: 16,
      }}
    >
      <Col title="Now" sip={currentSip} year={currentYear} score={currentScore} />
      <View style={{ width: 1, backgroundColor: color.line }} />
      <Col title="Adjusted" sip={adjustedSip} year={adjustedYear} score={adjustedScore} accent />
    </View>
  );
}
