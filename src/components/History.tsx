import React, { useState } from 'react';
import type { GachaResult } from '../types';

interface HistoryProps {
  results: GachaResult[];
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ results, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayResults = isExpanded ? results : results.slice(0, 10);
  const hasMore = results.length > 10;

  if (results.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
        <div className="text-gray-500">暂无抽卡记录</div>
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'SSR':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'SR':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'R':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'N':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">抽卡记录</h3>
        <button
          onClick={onClear}
          className="text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          清空记录
        </button>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {displayResults.map((result, index) => (
          <div
            key={`${result.timestamp}-${index}`}
            className="flex items-center justify-between p-3 rounded-lg border bg-white/50"
          >
            <div className="flex items-center gap-3">
              <div className={`px-2 py-1 rounded text-xs font-bold border ${getRarityColor(result.card.rarity)}`}>
                {result.card.rarity}
              </div>
              <span className="text-gray-800 font-medium">{result.card.text}</span>
            </div>
            
            <div className="text-xs text-gray-500">
              {formatTime(result.timestamp)}
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            {isExpanded ? '收起' : `查看全部 ${results.length} 条记录`}
          </button>
        </div>
      )}
    </div>
  );
};

export default History;