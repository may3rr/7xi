import React from 'react';
import type { GachaStats } from '../types';

interface StatisticsProps {
  stats: GachaStats;
  pityCount: number;
  pityProgress: number;
}

const Statistics: React.FC<StatisticsProps> = ({ stats, pityCount, pityProgress }) => {
  const getSSRRate = () => {
    if (stats.totalPulls === 0) return '0.00';
    return ((stats.ssrCount / stats.totalPulls) * 100).toFixed(2);
  };

  const getSRRate = () => {
    if (stats.totalPulls === 0) return '0.00';
    return ((stats.srCount / stats.totalPulls) * 100).toFixed(2);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">统计信息</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">{stats.totalPulls}</div>
          <div className="text-sm text-gray-500">总抽数</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.ssrCount}</div>
          <div className="text-sm text-gray-500">SSR ({getSSRRate()}%)</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.srCount}</div>
          <div className="text-sm text-gray-500">SR ({getSRRate()}%)</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{stats.rCount + stats.nCount}</div>
          <div className="text-sm text-gray-500">R+N</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">保底进度</span>
          <span className="text-sm text-gray-500">{pityCount}/90</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-300 relative"
            style={{ width: `${pityProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 rounded-full animate-pulse" />
          </div>
        </div>
        {pityCount >= 80 && (
          <div className="text-xs text-yellow-600 mt-1 font-medium">
            即将触发保底机制！
          </div>
        )}
      </div>

      {stats.lastSsrPull > 0 && (
        <div className="text-sm text-gray-600 text-center">
          距离上次 SSR：{pityCount} 抽
        </div>
      )}
    </div>
  );
};

export default Statistics;