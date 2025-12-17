import { memo } from 'react';
import { Text, View } from 'react-native';

import { Timeline } from '../constants/timelines';

type Props = {
  label: Timeline;
  active?: boolean;
};

const TimelinePillComponent = ({ label, active }: Props) => (
  <View className={`py-2.5 px-6 rounded-full border border-panelBorder bg-surface ${active ? 'bg-timelinePrimary border-timelinePrimary' : ''}`}>
    <Text className={`font-semibold tracking-[0.5px] text-timelinePrimary ${active ? 'text-surface' : ''}`}>{label}</Text>
  </View>
);

export const TimelinePill = memo(TimelinePillComponent);
