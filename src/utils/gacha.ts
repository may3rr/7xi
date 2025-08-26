import type { Card, Rarity } from '../types';
import { CARDS_DATA, RARITY_CONFIG } from '../data/cards';

const PITY_THRESHOLD = 90;

export class GachaSystem {
  private cards: Card[] = CARDS_DATA;

  private getRandomCard(isGuaranteedSSR: boolean = false): Card {
    if (isGuaranteedSSR) {
      const ssrCards = this.cards.filter(card => card.rarity === 'SSR');
      return ssrCards[Math.floor(Math.random() * ssrCards.length)];
    }

    const totalProbability = this.cards.reduce((sum, card) => sum + card.probability, 0);
    let random = Math.random() * totalProbability;
    
    for (const card of this.cards) {
      random -= card.probability;
      if (random <= 0) {
        return card;
      }
    }
    
    return this.cards[this.cards.length - 1];
  }

  public pullSingle(pityCount: number): { card: Card; newPityCount: number } {
    const isGuaranteedSSR = pityCount >= PITY_THRESHOLD - 1;
    const card = this.getRandomCard(isGuaranteedSSR);
    const newPityCount = card.rarity === 'SSR' ? 0 : pityCount + 1;
    
    return { card, newPityCount };
  }

  public pullMultiple(count: number, pityCount: number): { cards: Card[]; newPityCount: number } {
    const results: Card[] = [];
    let currentPityCount = pityCount;
    let hasSSR = false;

    for (let i = 0; i < count; i++) {
      const isGuaranteedSSR = currentPityCount >= PITY_THRESHOLD - 1;
      const isLastPullGuaranteedSR = i === count - 1 && !hasSSR && count === 10;
      
      let card: Card;
      
      if (isGuaranteedSSR) {
        card = this.getRandomCard(true);
      } else if (isLastPullGuaranteedSR) {
        const srOrBetterCards = this.cards.filter(card => 
          card.rarity === 'SSR' || card.rarity === 'SR'
        );
        const totalProb = srOrBetterCards.reduce((sum, c) => sum + c.probability, 0);
        let random = Math.random() * totalProb;
        
        card = srOrBetterCards.find(c => {
          random -= c.probability;
          return random <= 0;
        }) || srOrBetterCards[0];
      } else {
        card = this.getRandomCard();
      }
      
      results.push(card);
      
      if (card.rarity === 'SSR') {
        currentPityCount = 0;
        hasSSR = true;
      } else {
        currentPityCount++;
      }
    }
    
    return { cards: results, newPityCount: currentPityCount };
  }

  public getRarityInfo(rarity: Rarity) {
    return RARITY_CONFIG[rarity];
  }

  public getPityProgress(pityCount: number): number {
    return Math.min((pityCount / PITY_THRESHOLD) * 100, 100);
  }

  public getRarityCards(rarity: Rarity): Card[] {
    return this.cards.filter(card => card.rarity === rarity);
  }
}