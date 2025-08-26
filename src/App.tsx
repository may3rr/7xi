import { useState } from 'react';
import type { Card } from './types';
import { useGacha } from './hooks/useGacha';
import GachaButton from './components/GachaButton';
import ResultModal from './components/ResultModal';
import Statistics from './components/Statistics';
import History from './components/History';

function App() {
  const { state, isLoading, pullSingle, pullMultiple, clearHistory, getPityProgress, shareResult } = useGacha();
  const [showModal, setShowModal] = useState(false);
  const [currentResults, setCurrentResults] = useState<Card[]>([]);
  const [isSinglePull, setIsSinglePull] = useState(false);

  const handleSinglePull = async () => {
    if (isLoading) return;
    
    try {
      const results = await pullSingle();
      setCurrentResults(results);
      setIsSinglePull(true);
      setShowModal(true);
    } catch (error) {
      console.error('Single pull failed:', error);
    }
  };

  const handleMultiPull = async () => {
    if (isLoading) return;
    
    try {
      const results = await pullMultiple();
      setCurrentResults(results);
      setIsSinglePull(false);
      setShowModal(true);
    } catch (error) {
      console.error('Multi pull failed:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentResults([]);
  };

  const handleShare = () => {
    if (currentResults.length > 0) {
      shareResult(currentResults);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-qixi">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-4xl animate-float">💕</span>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              七夕限定卡池
            </h1>
            <span className="text-4xl animate-float" style={{ animationDelay: '1s' }}>💕</span>
          </div>
          <p className="text-lg text-gray-600 mb-2">抽取属于你的七夕限定文案</p>
          <div className="text-sm text-gray-500">
            SSR (1%) • SR (9%) • R (30%) • N (60%)
          </div>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Statistics 
              stats={state.stats} 
              pityCount={state.pityCount} 
              pityProgress={getPityProgress()} 
            />
          </div>

          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <GachaButton 
                type="single" 
                onClick={handleSinglePull} 
                disabled={isLoading}
              />
              <GachaButton 
                type="multi" 
                onClick={handleMultiPull} 
                disabled={isLoading}
              />
            </div>
            
            {isLoading && (
              <div className="flex flex-col items-center gap-2 animate-zoom-in">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                <span className="text-primary-600 font-medium">
                  {isSinglePull ? '抽卡中...' : '十连抽中...'}
                </span>
              </div>
            )}
          </div>

          <div className="animate-slide-up">
            <History 
              results={state.results} 
              onClear={clearHistory}
            />
          </div>
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span>💝</span>
            <span>七夕快乐，愿有情人终成眷属</span>
            <span>💝</span>
          </div>
          <div>
            Made with 💖 for Qixi Festival
          </div>
        </footer>
      </div>

      <ResultModal
        isOpen={showModal}
        onClose={closeModal}
        cards={currentResults}
        isSingle={isSinglePull}
      />

      {showModal && currentResults.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleShare}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2"
          >
            <span>📱</span>
            分享结果
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
