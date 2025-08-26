import React from 'react';

interface GachaButtonProps {
  type: 'single' | 'multi';
  onClick: () => void;
  disabled?: boolean;
}

const GachaButton: React.FC<GachaButtonProps> = ({ type, onClick, disabled = false }) => {
  const isSingle = type === 'single';
  
  const baseClasses = 'relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg';
  
  const buttonClasses = isSingle
    ? `${baseClasses} bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-primary-500/25`
    : `${baseClasses} bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-primary-600/30`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      <div className="flex items-center justify-center gap-2">
        <span>{isSingle ? '单抽' : '十连抽'}</span>
        {!isSingle && (
          <div className="bg-white/20 px-2 py-1 rounded-full text-sm">
            保底SR
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </button>
  );
};

export default GachaButton;