import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WatchlistMovie } from '../types/movie';

interface WatchlistStore {
  movies: WatchlistMovie[];
  addMovie: (movie: WatchlistMovie) => void;
  removeMovie: (movieId: number) => void;
  toggleWatched: (movieId: number) => void;
  updateStreamingPlatforms: (movieId: number, platforms: string[]) => void;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      movies: [],
      addMovie: (movie) =>
        set((state) => ({
          movies: [...state.movies, movie],
        })),
      removeMovie: (movieId) =>
        set((state) => ({
          movies: state.movies.filter((m) => m.id !== movieId),
        })),
      toggleWatched: (movieId) =>
        set((state) => ({
          movies: state.movies.map((m) =>
            m.id === movieId ? { ...m, watched: !m.watched } : m
          ),
        })),
      updateStreamingPlatforms: (movieId, platforms) =>
        set((state) => ({
          movies: state.movies.map((m) =>
            m.id === movieId ? { ...m, streaming_platforms: platforms } : m
          ),
        })),
    }),
    {
      name: 'watchlist-storage',
    }
  )
);