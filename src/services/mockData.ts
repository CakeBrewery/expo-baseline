import { StockSummary } from '../generated/api';

type SummarySeed = {
  symbol: string;
  companyName: string;
  exchange: string;
  sector: string;
  price: number;
  dailyChange: number;
  dailyChangePercent: number;
  marketCap: number;
  description: string;
  priceSeries: { label: string; value: number }[];
};

const buildSummary = (seed: SummarySeed): StockSummary => {
  const values = seed.priceSeries.map(point => point.value ?? 0);
  const week52High = values.length ? Math.max(...values) : 0;
  const week52Low = values.length ? Math.min(...values) : 0;
  const yearStartPrice = seed.priceSeries.length ? seed.priceSeries[0]?.value ?? 0 : 0;

  return {
    symbol: seed.symbol,
    companyName: seed.companyName,
    exchange: seed.exchange,
    sector: seed.sector,
    timeline: '1Y',
    price: seed.price,
    dailyChange: seed.dailyChange,
    dailyChangePercent: seed.dailyChangePercent,
    marketCap: seed.marketCap,
    week52High,
    week52Low,
    yearStartPrice,
    description: seed.description,
    priceSeries: seed.priceSeries,
  };
};

const NVDA_SUMMARY = buildSummary({
  symbol: 'NVDA',
  companyName: 'NVIDIA Corporation',
  exchange: 'NASDAQ',
  sector: 'Semiconductors',
  price: 181.46,
  dailyChange: 1.54,
  dailyChangePercent: 0.8559,
  marketCap: 4_387_809_264_000,
  description:
    'NVIDIA powers accelerated computing workloads across data center, gaming, and edge surfaces. This template keeps the focus on core price action.',
  priceSeries: [
    { label: 'Aug', value: 52.8 },
    { label: 'Sep', value: 55.1 },
    { label: 'Oct', value: 58.4 },
    { label: 'Nov', value: 63.5 },
    { label: 'Dec', value: 66.9 },
    { label: 'Jan', value: 71.2 },
    { label: 'Feb', value: 77.5 },
    { label: 'Mar', value: 88.4 },
    { label: 'Apr', value: 96.8 },
    { label: 'May', value: 111.5 },
    { label: 'Jun', value: 124.2 },
    { label: 'Jul', value: 130.5 },
  ],
});

const MSFT_SUMMARY = buildSummary({
  symbol: 'MSFT',
  companyName: 'Microsoft Corporation',
  exchange: 'NASDAQ',
  sector: 'Software Infrastructure',
  price: 422.3,
  dailyChange: 1.3,
  dailyChangePercent: 0.3088,
  marketCap: 3_150_000_000_000,
  description:
    'Microsoft’s cloud stack keeps compounding. Use this case to validate the shape of the summary payload against a mega-cap benchmark.',
  priceSeries: [
    { label: 'Aug', value: 305 },
    { label: 'Sep', value: 312 },
    { label: 'Oct', value: 320 },
    { label: 'Nov', value: 330 },
    { label: 'Dec', value: 338 },
    { label: 'Jan', value: 345 },
    { label: 'Feb', value: 352 },
    { label: 'Mar', value: 360 },
    { label: 'Apr', value: 372 },
    { label: 'May', value: 388 },
    { label: 'Jun', value: 402 },
    { label: 'Jul', value: 418 },
  ],
});

const AMD_SUMMARY = buildSummary({
  symbol: 'AMD',
  companyName: 'Advanced Micro Devices, Inc.',
  exchange: 'NASDAQ',
  sector: 'Semiconductors',
  price: 151.3,
  dailyChange: 0.8,
  dailyChangePercent: 0.5316,
  marketCap: 245_000_000_000,
  description:
    'AMD continues to chase share in GPUs and data center compute. Great example to showcase how the UI responds to higher volatility.',
  priceSeries: [
    { label: 'Aug', value: 90 },
    { label: 'Sep', value: 95 },
    { label: 'Oct', value: 102 },
    { label: 'Nov', value: 108 },
    { label: 'Dec', value: 115 },
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 126 },
    { label: 'Mar', value: 132 },
    { label: 'Apr', value: 138 },
    { label: 'May', value: 143 },
    { label: 'Jun', value: 148 },
    { label: 'Jul', value: 151 },
  ],
});

export const mockStockSummaries: Record<string, StockSummary> = {
  NVDA: NVDA_SUMMARY,
  MSFT: MSFT_SUMMARY,
  AMD: AMD_SUMMARY,
};
