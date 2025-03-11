import { useSelector } from 'react-redux';
import { setFont } from '@/store/uiSlice';
import { RootState } from '@/store';
import { FontType } from '@/types';
import { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';

const FontSelector = () => {
  const dispatch = useAppDispatch();
  const { font } = useSelector((state: RootState) => state.ui);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fontOptions: { value: FontType; label: string }[] = [
    { value: 'serif', label: 'Serif' },
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'monospace', label: 'Monospace' },
  ];

  const handleFontChange = (selectedFont: FontType) => {
    dispatch(setFont(selectedFont));
    setIsOpen(false);
  };

  // Cierra el modal al dar clic fuera del modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const currentFontLabel = fontOptions.find(option => option.value === font)?.label || 'Sans Serif';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className={`
          ${font === 'serif' ? 'font-serif' : ''}
          ${font === 'sans-serif' ? 'font-sans' : ''}
          ${font === 'monospace' ? 'font-monospace' : ''}
        `}>
          {currentFontLabel}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200 dark:border-gray-700">
          <ul className="py-1">
            {fontOptions.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleFontChange(option.value)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${font === option.value ? 'text-purple-600 dark:text-purple-400' : ''}`}
                >
                  <span className={`
                    ${option.value === 'serif' ? 'font-serif' : ''}
                    ${option.value === 'sans-serif' ? 'font-sans' : ''}
                    ${option.value === 'monospace' ? 'font-monospace' : ''}
                  `}>
                    {option.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FontSelector;