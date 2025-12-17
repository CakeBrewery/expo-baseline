import { StockSummary } from '../generated/api';
import { StockControllerService } from '../generated/api/services/StockControllerService';
import { OpenAPI } from '../generated/api/core/OpenAPI';
import { fetchStockSummary as fetchMockStockSummary } from './mockStockService';
import { USE_MOCK_STOCK_API, API_BASE_URL } from '../constants/config';

// Configure OpenAPI client once
OpenAPI.BASE = API_BASE_URL;

const fetchRealStockSummary = async (symbol: string): Promise<StockSummary> => {
  return StockControllerService.getStockSummary(symbol);
};

export const fetchStockSummary = USE_MOCK_STOCK_API ? fetchMockStockSummary : fetchRealStockSummary;
