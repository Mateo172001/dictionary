import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState, useRef } from 'react';

const WordDefinition = () => {
  const { results, loading, error } = useSelector((state: RootState) => state.dictionary);
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4 text-xl">😕</div>
        <h3 className="text-xl font-bold mb-4">No Definitions Found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {error === 'Word not found' 
            ? "Sorry, we couldn't find definitions for the word you were looking for." 
            : error}
        </p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  const word = results[0];
  
  //Buscamos el primer audio disponible
  const audioFile = word.phonetics.find(phonetic => phonetic.audio)?.audio || '';
  
  const handlePlayAudio = () => {
    if (!audioFile) return;
    
    if (activeAudio) {
      activeAudio.pause();
    }
    
    if (audioRef.current) {
      audioRef.current.play();
      setActiveAudio(audioRef.current);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-2">{word.word}</h1>
          <p className="text-purple-500 text-lg">{word.phonetic}</p>
        </div>
        {audioFile && (
          <button 
            onClick={handlePlayAudio}
            className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 rounded-full p-4 text-purple-600 dark:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Play pronunciation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <audio ref={audioRef} src={audioFile} />
          </button>
        )}
      </div>

      {word.meanings.map((meaning, index) => (
        <div key={index} className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl italic">{meaning.partOfSpeech}</h2>
            <div className="h-px bg-gray-300 dark:bg-gray-700 flex-grow"></div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-gray-500 dark:text-gray-400 mb-4">Meaning</h3>
            <ul className="list-disc list-outside pl-5 space-y-3">
              {meaning.definitions.map((def, defIndex) => (
                <li key={defIndex} className="text-lg">
                  <p>{def.definition}</p>
                  {def.example && (
                    <p className="text-gray-500 dark:text-gray-400 mt-2">&quot;{def.example}&quot;</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {meaning.synonyms && meaning.synonyms.length > 0 && (
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 mb-4">Synonyms</h3>
              <div className="flex flex-wrap gap-2">
                {meaning.synonyms.map((synonym, synIndex) => (
                  <span key={synIndex} className="text-purple-600 dark:text-purple-400 font-bold">
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {word.sourceUrls && word.sourceUrls.length > 0 && (
        <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Source</p>
          {word.sourceUrls.map((url, urlIndex) => (
            <a 
              key={urlIndex}
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm underline break-all hover:text-gray-700 dark:hover:text-gray-300"
            >
              {url}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordDefinition;