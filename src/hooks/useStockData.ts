import { useState, useEffect } from 'react';
import { StockWorkspace, PricePoint } from '../constants/stock';
import { fetchGlobalQuote, fetchCompanyOverview, fetchMonthlyTimeSeries } from '../services/stockService';

export const useStockData = (symbol: string) => {
  const [data, setData] = useState<StockWorkspace | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Using Promise.all to fetch data in parallel
        // Note: Alpha Vantage free tier has a rate limit of 5 API requests per minute and 500 requests per day.
        // Fetching 3 endpoints might hit the limit if refreshed quickly. 
        // We might need to chain them or add delays if we hit limits, but for now parallel is standard.
        const [quote, overview, timeSeries] = await Promise.all([
          fetchGlobalQuote(symbol),
          fetchCompanyOverview(symbol),
          fetchMonthlyTimeSeries(symbol),
        ]);

        const timeSeriesData = timeSeries.monthlyTimeSeries || {};
        // Sort dates ascending
        const sortedDates = Object.keys(timeSeriesData).sort();
        // Get the last 12 months
        const recentDates = sortedDates.slice(-12);

        const priceSeries: PricePoint[] = recentDates.map(date => {
          const dateObj = new Date(date);
          // Adjust for timezone if necessary, but usually simple formatting is enough for month
          // Using UTC to avoid timezone shifts changing the month
          const month = dateObj.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
          return {
            label: month,
            value: parseFloat(timeSeriesData[date]?.close || '0'),
          };
        });

        // yearStartPrice is the first point in our 1-year series
        const yearStartPrice = priceSeries.length > 0 ? priceSeries[0].value : 0;

        const stockData: StockWorkspace = {
          symbol: overview.symbol || '',
          companyName: overview.name || '',
          exchange: overview.exchange || '',
          timeline: '1Y',
          sector: overview.sector || '',
          price: parseFloat(quote.price || '0'),
          dailyChange: parseFloat(quote.change || '0'),
          dailyChangePercent: parseFloat((quote.changePercent || '0%').replace('%', '')),
          marketCap: parseFloat(overview.marketCapitalization || '0'),
          week52High: parseFloat(overview.fiftyTwoWeekHigh || '0'),
          week52Low: parseFloat(overview.fiftyTwoWeekLow || '0'),
          yearStartPrice: yearStartPrice,
          description: overview.description || '',
          priceSeries: priceSeries,
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