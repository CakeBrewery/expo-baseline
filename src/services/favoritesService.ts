import { UsersService, OpenAPI } from '../generated/api';
import { API_BASE_URL } from '../constants/config';

// Configure the API Client
OpenAPI.BASE = API_BASE_URL;

export const getFavorites = async (userId: string): Promise<string[]> => {
  const favorites = await UsersService.getUserFavorites(userId);
  return favorites
    .map((f) => f.symbol)
    .filter((s): s is string => !!s);
};

export const addFavorite = async (userId: string, symbol: string): Promise<void> => {
  await UsersService.addFavorite(userId, { symbol });
};

export const removeFavorite = async (userId: string, symbol: string): Promise<void> => {
  await UsersService.removeFavorite(userId, symbol);
};