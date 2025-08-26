import React, { useEffect } from 'react';
import type { Card as CardType } from '../types';
import Card from './Card';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: CardType[];
  isSingle?: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({ 
  isOpen, 
  onClose, 
  cards, 
  isSingle = false 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hasSSR = cards.some(card => card.rarity === 'SSR');
  const hasSR = cards.some(card => card.rarity === 'SR');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isSingle ? '抽卡结果' : '十连抽结果'}
              {hasSSR && <span className="ml-2 text-yellow-600">✨ SSR!</span>}
              {!hasSSR && hasSR && <span className="ml-2 text-purple-600">💜 SR!</span>}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className={`grid gap-4 ${isSingle ? 'max-w-sm mx-auto' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
            {cards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-in"
              >
                <Card 
                  card={card} 
                  showShine={card.rarity === 'SSR'}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;