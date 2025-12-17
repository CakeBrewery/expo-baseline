export type PricePoint = {
  label: string;
  value: number;
};

export type StockWorkspace = {
  symbol: string;
  companyName: string;
  exchange: string;
  timeline: '1Y';
  sector: string;
  price: number;
  dailyChange: number;
  dailyChangePercent: number;
  marketCap: number;
  week52High: number;
  week52Low: number;
  yearStartPrice: number;
  description: string;
  priceSeries: PricePoint[];
};

export const NVDA_WORKSPACE: StockWorkspace = {
  symbol: 'NVDA',
  companyName: 'NVIDIA Corporation',
  exchange: 'NASDAQ',
  timeline: '1Y',
  sector: 'Semiconductors',
  price: 130.48,
  dailyChange: 2.18,
  dailyChangePercent: 1.7,
  marketCap: 3.12e12,
  week52High: 135.2,
  week52Low: 62.32,
  yearStartPrice: 52.8,
  description:
    'NVIDIA continues to dominate accelerated computing workloads. Every portfolio lane ties back to their CUDA moat and data center scale.',
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
};
