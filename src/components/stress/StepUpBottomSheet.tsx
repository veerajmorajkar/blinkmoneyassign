import { Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/src/components/Button';
import { T } from '@/src/components/T';
import { rupee } from '@/src/format';
import { color, radius, space } from '@/src/theme';

export function StepUpBottomSheet({
  open,
  current,
  step,
  onClose,
  onApply,
}: {
  open: boolean;
  current: number;
  step: number;
  onClose: () => void;
  onApply: () => void;
}) {
  const inset = useSafeAreaInsets();
  const years = [0, 1, 2, 3].map((i) => current + step * i);

  return (
    <Modal visible={open} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: color.overlay }}>
        <View
          style={{
            backgroundColor: color.surface,
            borderTopLeftRadius: radius.lg,
            borderTopRightRadius: radius.lg,
            padding: space[5],
            paddingBottom: Math.max(inset.bottom, 20) + 8,
            gap: 14,
          }}
        >
          <View>
            <T serif size={26}>
              Step-up SIP
            </T>
            <T size={13} tone="muted" style={{ marginTop: 6 }}>
              Simulation only.
            </T>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <T size={11} tone="muted">
                Now
              </T>
              <T size={16} weight="med">
                {rupee(current)}
              </T>
            </View>
            <View>
              <T size={11} tone="muted">
                Step
              </T>
              <T size={16} weight="med" tone="lime">
                {rupee(step)}
              </T>
            </View>
            <View>
              <T size={11} tone="muted">
                Every
              </T>
              <T size={16} weight="med">
                12 months
              </T>
            </View>
          </View>
          <View style={{ gap: 8 }}>
            {years.map((amt, i) => (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T size={13} tone="muted">
                  Year {i + 1}
                </T>
                <T size={13} weight="med">
                  {rupee(amt)} / mo
                </T>
              </View>
            ))}
          </View>
          <Button label="Apply to simulation" onPress={onApply} />
          <Button label="Close" kind="quiet" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
