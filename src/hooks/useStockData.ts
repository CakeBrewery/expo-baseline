import { useState, useEffect } from 'react';
import { StockWorkspace, PricePoint } from '../constants/stock';
import { fetchStockSummary } from '../services/stockService';

export const useStockData = (symbol: string) => {
  const [data, setData] = useState<StockWorkspace | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const summary = await fetchStockSummary(symbol);
        const priceSeries: PricePoint[] = (summary.priceSeries || []).map(point => ({
          label: point.label || '',
          value: point.value ?? 0,
        }));

        const yearStartPrice = summary.yearStartPrice ?? (priceSeries.length > 0 ? priceSeries[0].value : 0);

        const stockData: StockWorkspace = {
          symbol: summary.symbol || '',
          companyName: summary.companyName || '',
          exchange: summary.exchange || '',
          timeline: '1Y',
          sector: summary.sector || '',
          price: summary.price ?? 0,
          dailyChange: summary.dailyChange ?? 0,
          dailyChangePercent: summary.dailyChangePercent ?? 0,
          marketCap: summary.marketCap ?? 0,
          week52High: summary.week52High ?? 0,
          week52Low: summary.week52Low ?? 0,
          yearStartPrice,
          description: summary.description || '',
          priceSeries,
        };

        setData(stockData);
      } catch (err: any) {
        console.error('Error fetching stock data:', err);
        setError(err.message || 'Failed to load stock data');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      loadData();
    }
  }, [symbol]);

  return { data, loading, error };
};
