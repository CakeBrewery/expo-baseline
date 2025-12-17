import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, useColorScheme, View, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PriceTrendChart } from '../components/PriceTrendChart';
import { StockHero } from '../components/StockHero';
import { StockMetricCard } from '../components/StockMetricCard';
import { useStockData } from '../hooks/useStockData';
import { useFavorites } from '../hooks/useFavorites';
import { formatCompactNumber, formatCurrency, formatPercent } from '../lib/numberFormat';

export const WorkspaceScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [searchText, setSearchText] = useState('NVDA');
  const [activeSymbol, setActiveSymbol] = useState('NVDA');

  const { data: stock, loading, error } = useStockData(activeSymbol);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleSearch = () => {
    if (searchText.trim()) {
      setActiveSymbol(searchText.trim().toUpperCase());
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="textPrimary" />
          <Text className="text-base leading-6 text-secondary mt-4">Loading market data...</Text>
        </View>
      );
    }

    if (error || !stock) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl leading-[38px] font-bold text-textPrimary">Error</Text>
          <Text className="text-base leading-6 text-textSecondary">{error || 'Failed to load data'}</Text>
        </View>
      );
    }

    const trailingReturn =
      ((stock.price - stock.yearStartPrice) / stock.yearStartPrice) * 100;

    return (
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24, gap: 32 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          <Text className="text-sm tracking-wide uppercase text-kicker font-semibold">Live workspace prototype</Text>
          <Text className="text-3xl leading-[38px] font-bold text-textPrimary">Tracking {stock.symbol} for the {stock.timeline} window.</Text>
          <Text className="text-base leading-6 text-textSecondary">
            The surface below is now connected to live data.
          </Text>
        </View>

        <StockHero
          stock={stock}
          isFavorite={isFavorite(stock.symbol)}
          onToggleFavorite={() => toggleFavorite(stock.symbol)}
        />

        <PriceTrendChart
          points={stock.priceSeries}
          startValue={stock.yearStartPrice}
          endValue={stock.price}
        />

        <View className="flex-row flex-wrap gap-4">
          <StockMetricCard label="52 week high" value={formatCurrency(stock.week52High)} helper="High" />
          <StockMetricCard
            label="52 week low"
            value={formatCurrency(stock.week52Low)}
            helper="Low"
          />
          <StockMetricCard
            label="Market cap"
            value={formatCompactNumber(stock.marketCap)}
            helper="Cap"
          />
          <StockMetricCard
            label="Return this cycle"
            value={formatPercent(trailingReturn)}
            helper={`Opened the cycle at ${formatCurrency(stock.yearStartPrice)}`}
          />
        </View>

        <View className="bg-surface rounded-3xl p-6 border border-border gap-2">
          <Text className="text-base font-semibold text-textPrimary">Workspace notes</Text>
          <Text className="text-sm leading-[22px] text-textSecondary">
            {stock.description}
          </Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View className="px-6 pt-3 pb-3">
        <TextInput
          className="h-[50px] bg-surface rounded-xl px-4 text-base text-textPrimary border border-border"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          placeholder="Enter stock symbol (e.g. AAPL)"
          placeholderTextColor="text-placeholder"
          autoCapitalize="characters"
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

export default WorkspaceScreen;
