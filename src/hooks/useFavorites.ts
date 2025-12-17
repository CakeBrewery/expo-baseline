import { useState, useEffect, useCallback } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoritesService';

const DEMO_USER_ID = '3d5a7a38-20a2-4c17-9aec-5259b25dfa83';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFavorites(DEMO_USER_ID);
      setFavorites(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  const toggleFavorite = async (symbol: string) => {
    const isFav = favorites.includes(symbol);

    // Optimistic update
    const previousFavorites = [...favorites];

    try {
      if (isFav) {
        setFavorites(prev => prev.filter(s => s !== symbol));
        await removeFavorite(DEMO_USER_ID, symbol);
      } else {
        setFavorites(prev => [...prev, symbol]);
        await addFavorite(DEMO_USER_ID, symbol);
      }
    } catch (err: any) {
      // Revert on error
      setFavorites(previousFavorites);
      setError(err.message || 'Failed to update favorite');
      console.error(err);
    }
  };

  const isFavorite = (symbol: string) => favorites.includes(symbol);

  return {
    favorites,
    loading,
    error,
    toggleFavorite,
    isFavorite,
    refreshFavorites
  };
};
