import { memo } from 'react';
import { Text, View } from 'react-native';

type Props = {
  title: string;
  subtitle: string;
};

const PlaceholderPanelComponent = ({ title, subtitle }: Props) => (
  <View className="bg-surface rounded-[28px] p-6 gap-3 border border-border shadow-lg">
    <Text className="text-xl font-bold text-textPrimary">{title}</Text>
    <Text className="text-[15px] text-textMuted leading-[22px]">{subtitle}</Text>
    <View className="mt-3 bg-panelTint rounded-2xl p-6 min-h-[180px] items-center justify-center border-dashed border border-panelBorder">
      <Text className="text-placeholder text-[13px] text-center">Design canvas ready for future charts</Text>
    </View>
  </View>
);

export const PlaceholderPanel = memo(PlaceholderPanelComponent);
