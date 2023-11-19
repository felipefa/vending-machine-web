export const coins = [5, 10, 20, 50, 100] as const;

export type Coin = (typeof coins)[number];
