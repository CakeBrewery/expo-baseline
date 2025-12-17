import { StockSummary } from '../generated/api';
import { mockStockSummaries } from './mockData';

const SIMULATED_DELAY = 500;  // ms

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchStockSummary = async (symbol: string): Promise<StockSummary> => {
  await sleep(SIMULATED_DELAY);
  console.log(`[MOCK] fetchStockSummary for ${symbol}`);
  const key = symbol?.toUpperCase() || '';
  return mockStockSummaries[key] ?? mockStockSummaries['NVDA'];
};
