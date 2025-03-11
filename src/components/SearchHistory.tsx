import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clearHistory } from '@/store/historySlice';
import { searchWord } from '@/store/dictionarySlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

const SearchHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchHistory } = useSelector((state: RootState) => state.history);
  const dispatch = useAppDispatch();

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  const handleSearchHistoryItem = (word: string) => {
    dispatch(searchWord(word));
    setIsOpen(false);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors focus:outline-none focus:text-purple-600 dark:focus:text-purple-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 7 4 4 20 4 20 7"></polyline>
          <line x1="9" y1="20" x2="15" y2="20"></line>
          <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
        Search History ({searchHistory.length})
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Recent Searches</h3>
              <button
                onClick={handleClearHistory}
                className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {searchHistory.map((item, index) => (
                <li key={index} className="py-3">
                  <button
                    onClick={() => handleSearchHistoryItem(item.word)}
                    className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors p-2 rounded"
                  >
                    <div className="font-medium text-purple-600 dark:text-purple-400">{item.word}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(item.timestamp)}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;