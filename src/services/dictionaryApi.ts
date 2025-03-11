import { Word } from '@/types';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const fetchWordDefinition = async (word: string): Promise<Word[]> => {
  try {
    const response = await fetch(`${API_URL}${word}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Word not found');
      }
      throw new Error('Failed to fetch word definition');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};