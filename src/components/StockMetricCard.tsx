import { memo } from 'react';
import { Text, View } from 'react-native';

type Props = {
  label: string;
  value: string;
  helper?: string;
};

const StockMetricCardComponent = ({ label, value, helper }: Props) => (
  <View className="flex-1 min-w-[140px] bg-surface rounded-2xl py-4 px-[18px] border border-border gap-[6px]">
    <Text className="text-xs uppercase tracking-wide text-kicker font-semibold">{label}</Text>
    <Text className="text-lg font-semibold text-textPrimary">{value}</Text>
    {helper ? <Text className="text-[13px] text-textSecondary">{helper}</Text> : null}
  </View>
);

export const StockMetricCard = memo(StockMetricCardComponent);
