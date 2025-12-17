export const TIMELINES = ['1D', '5D', '1W', '1M', '3M', '1Y', '5Y'] as const;

export type Timeline = (typeof TIMELINES)[number];
