export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  director: string;
  platform: string;
  posterUrl: string;
  trailerUrl?: string;
  overview?: string;
  watched: boolean;
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
}