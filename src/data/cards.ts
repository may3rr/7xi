import { Card } from '../types';

export const CARDS_DATA: Card[] = [
  // SSR 卡片 (1%概率)
  {
    id: 'ssr_1',
    text: '好呀宝宝',
    rarity: 'SSR',
    probability: 0.33,
  },
  {
    id: 'ssr_2',
    text: '我们结婚吧',
    rarity: 'SSR',
    probability: 0.33,
  },
  {
    id: 'ssr_3',
    text: '余生请多指教',
    rarity: 'SSR',
    probability: 0.34,
  },

  // SR 卡片 (9%概率)
  {
    id: 'sr_1',
    text: '你是个好人',
    rarity: 'SR',
    probability: 2.0,
  },
  {
    id: 'sr_2',
    text: '我们还是做朋友吧',
    rarity: 'SR',
    probability: 2.0,
  },
  {
    id: 'sr_3',
    text: '你很特别',
    rarity: 'SR',
    probability: 2.0,
  },
  {
    id: 'sr_4',
    text: '我需要时间考虑',
    rarity: 'SR',
    probability: 1.5,
  },
  {
    id: 'sr_5',
    text: '你真的很用心',
    rarity: 'SR',
    probability: 1.5,
  },

  // R 卡片 (30%概率)
  {
    id: 'r_1',
    text: '癔症又犯了?',
    rarity: 'R',
    probability: 5.0,
  },
  {
    id: 'r_2',
    text: '你也配?',
    rarity: 'R',
    probability: 5.0,
  },
  {
    id: 'r_3',
    text: '想得美',
    rarity: 'R',
    probability: 5.0,
  },
  {
    id: 'r_4',
    text: '做梦吧你',
    rarity: 'R',
    probability: 4.0,
  },
  {
    id: 'r_5',
    text: '不可能的',
    rarity: 'R',
    probability: 4.0,
  },
  {
    id: 'r_6',
    text: '门都没有',
    rarity: 'R',
    probability: 3.0,
  },
  {
    id: 'r_7',
    text: '省省吧',
    rarity: 'R',
    probability: 4.0,
  },

  // N 卡片 (60%概率)
  {
    id: 'n_1',
    text: '滚你妈的',
    rarity: 'N',
    probability: 8.0,
  },
  {
    id: 'n_2',
    text: '以后不要再和我扯上关系',
    rarity: 'N',
    probability: 7.0,
  },
  {
    id: 'n_3',
    text: '呵呵',
    rarity: 'N',
    probability: 8.0,
  },
  {
    id: 'n_4',
    text: '没意思',
    rarity: 'N',
    probability: 7.0,
  },
  {
    id: 'n_5',
    text: '算了吧',
    rarity: 'N',
    probability: 6.0,
  },
  {
    id: 'n_6',
    text: '随便',
    rarity: 'N',
    probability: 6.0,
  },
  {
    id: 'n_7',
    text: '无语',
    rarity: 'N',
    probability: 6.0,
  },
  {
    id: 'n_8',
    text: '拜托',
    rarity: 'N',
    probability: 5.0,
  },
  {
    id: 'n_9',
    text: '懒得理你',
    rarity: 'N',
    probability: 4.0,
  },
  {
    id: 'n_10',
    text: '不感兴趣',
    rarity: 'N',
    probability: 3.0,
  },
];

export const RARITY_CONFIG = {
  SSR: {
    probability: 1,
    color: '#ffd700',
    bgGradient: 'bg-gradient-card-ssr',
    borderColor: 'border-rarity-ssr',
    name: '超稀有',
  },
  SR: {
    probability: 9,
    color: '#c470d3',
    bgGradient: 'bg-gradient-card-sr',
    borderColor: 'border-rarity-sr',
    name: '稀有',
  },
  R: {
    probability: 30,
    color: '#4a90e2',
    bgGradient: 'bg-gradient-card-r',
    borderColor: 'border-rarity-r',
    name: '普通',
  },
  N: {
    probability: 60,
    color: '#6b7280',
    bgGradient: 'bg-gradient-card-n',
    borderColor: 'border-rarity-n',
    name: '常见',
  },
} as const;