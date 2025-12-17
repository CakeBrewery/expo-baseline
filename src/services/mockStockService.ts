import { GlobalQuote, CompanyOverview, TimeSeriesMonthly } from '../generated/api';
import { mockStockData } from './mockData';

const SIMULATED_DELAY = 500;  // ms

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStockMockData = (symbol: string) => {
  const data = (mockStockData as any)[symbol.toUpperCase()];
  // Fallback to NVDA if the symbol is not explicitly mocked
  return data || mockStockData['NVDA'];
};

export const fetchGlobalQuote = async (symbol: string): Promise<GlobalQuote> => {
  await sleep(SIMULATED_DELAY);
  console.log(`[MOCK] fetchGlobalQuote for ${symbol}`);
  return getStockMockData(symbol).globalQuote;
};

export const fetchCompanyOverview = async (symbol: string): Promise<CompanyOverview> => {
  await sleep(SIMULATED_DELAY);
  console.log(`[MOCK] fetchCompanyOverview for ${symbol}`);
  return getStockMockData(symbol).companyOverview;
};

export const fetchMonthlyTimeSeries = async (symbol: string): Promise<TimeSeriesMonthly> => {
  await sleep(SIMULATED_DELAY);
  console.log(`[MOCK] fetchMonthlyTimeSeries for ${symbol}`);
  return getStockMockData(symbol).monthlyTimeSeries;
};
