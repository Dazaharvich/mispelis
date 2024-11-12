import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  platform: string;
  posterUrl: string;
  trailerUrl: string;
  watched: boolean;
}

interface MovieStore {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id' | 'watched'>) => void;
  toggleWatched: (id: number) => void;
  removeMovie: (id: number) => void;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set) => ({
      movies: [],
      addMovie: (movie) =>
        set((state) => ({
          movies: [
            ...state.movies,
            { ...movie, id: Date.now(), watched: false },
          ],
        })),
      toggleWatched: (id) =>
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.id === id ? { ...movie, watched: !movie.watched } : movie
          ),
        })),
      removeMovie: (id) =>
        set((state) => ({
          movies: state.movies.filter((movie) => movie.id !== id),
        })),
    }),
    {
      name: 'movie-storage',
    }
  )
);