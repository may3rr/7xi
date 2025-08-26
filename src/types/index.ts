export type Rarity = 'SSR' | 'SR' | 'R' | 'N';

export interface Card {
  id: string;
  text: string;
  rarity: Rarity;
  probability: number;
}

export interface GachaResult {
  card: Card;
  timestamp: number;
  pullCount: number;
}

export interface GachaStats {
  totalPulls: number;
  ssrCount: number;
  srCount: number;
  rCount: number;
  nCount: number;
  lastSsrPull: number;
}

export interface GachaState {
  results: GachaResult[];
  stats: GachaStats;
  pityCount: number;
}