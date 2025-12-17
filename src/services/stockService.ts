import { StockControllerService } from '../generated/api/services/StockControllerService';
import { OpenAPI } from '../generated/api/core/OpenAPI';
import { GlobalQuote, CompanyOverview, TimeSeriesMonthly } from '../generated/api';
import { fetchGlobalQuote as fetchMockQuote, fetchCompanyOverview as fetchMockOverview, fetchMonthlyTimeSeries as fetchMockTimeSeries } from './mockStockService';
import { USE_MOCK_STOCK_API, API_BASE_URL } from '../constants/config';

// Configure OpenAPI client
OpenAPI.BASE = API_BASE_URL;

const fetchRealQuote = async (symbol: string): Promise<GlobalQuote> => {
    return StockControllerService.getGlobalQuote(symbol);
}

const fetchRealOverview = async (symbol: string): Promise<CompanyOverview> => {
    return StockControllerService.getCompanyOverview(symbol);
}

const fetchRealTimeSeries = async (symbol: string): Promise<TimeSeriesMonthly> => {
    return StockControllerService.getMonthlyTimeSeries(symbol);
}

export const fetchGlobalQuote = USE_MOCK_STOCK_API ? fetchMockQuote : fetchRealQuote;
export const fetchCompanyOverview = USE_MOCK_STOCK_API ? fetchMockOverview : fetchRealOverview;
export const fetchMonthlyTimeSeries = USE_MOCK_STOCK_API ? fetchMockTimeSeries : fetchRealTimeSeries;