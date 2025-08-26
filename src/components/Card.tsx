import React from 'react';
import type { Card as CardType } from '../types';
import { RARITY_CONFIG } from '../data/cards';

interface CardProps {
  card: CardType;
  isFlipping?: boolean;
  showShine?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isFlipping = false, showShine = false }) => {
  const rarityConfig = RARITY_CONFIG[card.rarity];
  
  const getCardStyles = () => {
    const baseClasses = 'relative w-full h-48 rounded-xl border-4 p-4 flex flex-col justify-center items-center text-center transition-all duration-300 overflow-hidden card';
    
    switch (card.rarity) {
      case 'SSR':
        return `${baseClasses} bg-gradient-card-ssr border-rarity-ssr text-amber-900 font-bold ${isFlipping ? 'animate-card-flip' : ''} ${showShine ? 'animate-golden-glow' : ''}`;
      case 'SR':
        return `${baseClasses} bg-gradient-card-sr border-purple-400 text-purple-900 font-semibold ${isFlipping ? 'animate-card-flip' : ''}`;
      case 'R':
        return `${baseClasses} bg-gradient-card-r border-blue-400 text-blue-900 font-medium ${isFlipping ? 'animate-card-flip' : ''}`;
      case 'N':
        return `${baseClasses} bg-gradient-card-n border-gray-400 text-gray-800 ${isFlipping ? 'animate-card-flip' : ''}`;
      default:
        return baseClasses;
    }
  };

  const renderSparkles = () => {
    if (card.rarity !== 'SSR') return null;
    
    const sparkles = Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="sparkle"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 1.5}s`,
        }}
      />
    ));
    
    return <>{sparkles}</>;
  };

  return (
    <div className={getCardStyles()}>
      {showShine && <div className="card-shine" />}
      {renderSparkles()}
      
      <div className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
        {card.rarity}
      </div>
      
      <div className="text-lg md:text-xl font-bold mb-2 z-10">
        {card.text}
      </div>
      
      <div className="text-xs opacity-75 z-10">
        {rarityConfig.name}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default Card;