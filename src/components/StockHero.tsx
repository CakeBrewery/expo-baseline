import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { StockWorkspace } from '../constants/stock';
import { formatCurrency, formatPercent } from '../lib/numberFormat';

type Props = {
  stock: StockWorkspace;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const StockHeroComponent = ({ stock, isFavorite, onToggleFavorite }: Props) => {
  const isGain = stock.dailyChange >= 0;
  const changeSign = isGain ? '+' : ''; // Tailwind handles negative numbers for text color, so no explicit '-' sign needed in template string.
  const absoluteChange = Math.abs(stock.dailyChange);
  const absolutePercent = Math.abs(stock.dailyChangePercent);
  const formattedChangeValue = `${changeSign}${formatCurrency(absoluteChange)}`;
  const formattedChangePercent = `${changeSign}${formatPercent(absolutePercent)}`;

  return (
    <View className="bg-surface rounded-[28px] p-6 gap-5 border border-border shadow-lg">
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-4 items-start">
          <View>
            <View className="flex-row items-center gap-3">
              <Text className="text-[28px] font-bold text-textPrimary">{stock.symbol}</Text>
              <TouchableOpacity onPress={onToggleFavorite} hitSlop={10}>
                <Text className={`text-2xl ${isFavorite ? 'text-amber-400' : 'text-textSecondary opacity-30'}`}>
                  {isFavorite ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="mt-1 text-base text-textSecondary">{stock.companyName}</Text>
            <Text className="mt-1 text-[13px] text-placeholder">
              {stock.exchange} • {stock.sector}
            </Text>
          </View>
        </View>
        <View className="bg-[#0b1223] py-[10px] px-5 rounded-full">
          <Text className="text-surface font-semibold tracking-[0.5px]">{stock.timeline}</Text>
        </View>
      </View>

      <View className="flex-row items-end gap-4">
        <Text className="text-5xl font-bold text-textPrimary">{formatCurrency(stock.price)}</Text>
        <Text className={`text-lg font-semibold ${isGain ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
          {formattedChangeValue}{' '}
          <Text className={`${isGain ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>({formattedChangePercent})</Text>
        </Text>
      </View>

      <Text className="text-[15px] text-textSecondary leading-[22px]">{stock.description}</Text>
    </View>
  );
};

export const StockHero = memo(StockHeroComponent);
