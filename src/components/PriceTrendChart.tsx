import { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

import { PricePoint } from '../constants/stock';
import { formatCurrency } from '../lib/numberFormat';

type Props = {
  points: PricePoint[];
  startValue: number;
  endValue: number;
};

const PriceTrendChartComponent = ({ points, startValue, endValue }: Props) => {
  const { min, max } = useMemo(() => {
    const values = points.map((point) => point.value);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [points]);

  const range = max - min || 1;

  return (
    <View className="bg-surface rounded-3xl p-5 border border-border gap-4">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-[13px] uppercase tracking-wide text-kicker font-semibold">Trailing performance</Text>
          <Text className="mt-1 text-lg font-semibold text-textPrimary">1 year trend, NVDA</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-placeholder">Range</Text>
          <Text className="mt-0.5 font-semibold text-textPrimary">
            {formatCurrency(startValue)} → {formatCurrency(endValue)}
          </Text>
        </View>
      </View>

      <View className="flex-row items-end gap-3">
        {points.map((point) => {
          const normalized = (point.value - min) / range;
          const height = 60 + normalized * 80;
          return (
            <View key={point.label} className="items-center flex-1">
              <View className="w-3 rounded-lg bg-timelinePrimary" style={{ height }} />
              <Text className="mt-2 text-xs text-placeholder">{point.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const PriceTrendChart = memo(PriceTrendChartComponent);
