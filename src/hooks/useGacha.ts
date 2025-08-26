import { useState, useCallback, useEffect } from 'react';
import type { GachaState, GachaResult, Card } from '../types';
import { GachaSystem } from '../utils/gacha';

const STORAGE_KEY = 'qixi-gacha-data';

const initialState: GachaState = {
  results: [],
  stats: {
    totalPulls: 0,
    ssrCount: 0,
    srCount: 0,
    rCount: 0,
    nCount: 0,
    lastSsrPull: 0,
  },
  pityCount: 0,
};

export const useGacha = () => {
  const [state, setState] = useState<GachaState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const gachaSystem = new GachaSystem();

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setState(parsedData);
      } catch (error) {
        console.error('Failed to load saved gacha data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateStats = useCallback((newCards: Card[], currentStats = state.stats) => {
    let stats = { ...currentStats };
    stats.totalPulls += newCards.length;

    newCards.forEach(card => {
      switch (card.rarity) {
        case 'SSR':
          stats.ssrCount++;
          stats.lastSsrPull = stats.totalPulls;
          break;
        case 'SR':
          stats.srCount++;
          break;
        case 'R':
          stats.rCount++;
          break;
        case 'N':
          stats.nCount++;
          break;
      }
    });

    return stats;
  }, []);

  const pullSingle = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { card, newPityCount } = gachaSystem.pullSingle(state.pityCount);
      
      const result: GachaResult = {
        card,
        timestamp: Date.now(),
        pullCount: state.stats.totalPulls + 1,
      };

      const newStats = updateStats([card]);
      
      setState(prev => ({
        ...prev,
        results: [result, ...prev.results],
        stats: newStats,
        pityCount: newPityCount,
      }));

      return [card];
    } finally {
      setIsLoading(false);
    }
  }, [state.pityCount, state.stats.totalPulls, updateStats, gachaSystem]);

  const pullMultiple = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { cards, newPityCount } = gachaSystem.pullMultiple(10, state.pityCount);
      
      const results: GachaResult[] = cards.map((card, index) => ({
        card,
        timestamp: Date.now() + index,
        pullCount: state.stats.totalPulls + index + 1,
      }));

      const newStats = updateStats(cards);
      
      setState(prev => ({
        ...prev,
        results: [...results.reverse(), ...prev.results],
        stats: newStats,
        pityCount: newPityCount,
      }));

      return cards;
    } finally {
      setIsLoading(false);
    }
  }, [state.pityCount, state.stats.totalPulls, updateStats, gachaSystem]);

  const clearHistory = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getPityProgress = useCallback(() => {
    return gachaSystem.getPityProgress(state.pityCount);
  }, [state.pityCount, gachaSystem]);

  const shareResult = useCallback((cards: Card[]) => {
    const hasSSR = cards.some(card => card.rarity === 'SSR');
    const hasSR = cards.some(card => card.rarity === 'SR');
    
    let shareText = '🎊 七夕限定卡池抽卡结果 🎊\n\n';
    
    if (hasSSR) {
      const ssrCards = cards.filter(card => card.rarity === 'SSR');
      shareText += '✨ 恭喜获得 SSR：\n';
      ssrCards.forEach(card => {
        shareText += `🌟 ${card.text}\n`;
      });
      shareText += '\n';
    }
    
    if (hasSR) {
      const srCards = cards.filter(card => card.rarity === 'SR');
      shareText += '💜 SR 卡片：\n';
      srCards.forEach(card => {
        shareText += `🔮 ${card.text}\n`;
      });
      shareText += '\n';
    }
    
    shareText += `总计 ${cards.length} 张卡片\n`;
    shareText += `当前保底进度：${state.pityCount}/90\n\n`;
    shareText += '#七夕限定卡池 #抽卡模拟器';

    if (navigator.share) {
      navigator.share({
        title: '七夕限定卡池抽卡结果',
        text: shareText,
      });
    } else {
      navigator.clipboard?.writeText(shareText);
      alert('结果已复制到剪贴板！');
    }
  }, [state.pityCount]);

  return {
    state,
    isLoading,
    pullSingle,
    pullMultiple,
    clearHistory,
    getPityProgress,
    shareResult,
  };
};