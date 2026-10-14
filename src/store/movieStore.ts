import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Movie } from "../types/movie";

interface MovieStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) =>
        set((state) => {
          const alreadyExists = state.favorites.some(
            (item) => item.id === movie.id,
          );

          if (alreadyExists) {
            return state;
          }

          return {
            favorites: [...state.favorites, movie],
          };
        }),

      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== movieId),
        })),

      isFavorite: (movieId) =>
        get().favorites.some((movie) => movie.id === movieId),
    }),
    {
      name: "movie-explorer-favorites",
    },
  ),
);
