import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader, AlertCircle } from 'lucide-react';
import { tmdb } from '../lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface RecentMovieCardProps {
  title: string;
  posterPath: string;
  releaseDate: string;
  onAdd: () => void;
}

const RecentMovieCard: React.FC<RecentMovieCardProps> = ({
  title,
  posterPath,
  releaseDate,
  onAdd,
}) => (
  <div className="relative bg-white rounded-lg shadow-md overflow-hidden group">
    <img
      src={tmdb.getPosterUrl(posterPath)}
      alt={title}
      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm mb-3">Released: {new Date(releaseDate).toLocaleDateString()}</p>
        <button
          onClick={onAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  </div>
);

export const RecentMovies: React.FC<{ onAddMovie: (movie: any) => void }> = ({ onAddMovie }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['recentMovies'],
    queryFn: tmdb.getNowPlaying,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
        <AlertCircle className="shrink-0" />
        <div>
          <p className="font-semibold">Unable to load recent movies</p>
          <p className="text-sm text-red-600">Please check your API key configuration</p>
        </div>
      </div>
    );
  }

  const handleAddMovie = async (movie: Movie) => {
    try {
      const [movieDetails, trailerData] = await Promise.all([
        tmdb.getMovieDetails(movie.id),
        tmdb.getMovieTrailer(movie.id)
      ]);

      const director = movieDetails.credits?.crew?.find((person: any) => person.job === 'Director');
      const trailerUrl = trailerData ? `https://www.youtube.com/watch?v=${trailerData.key}` : '';

      onAddMovie({
        title: movie.title,
        year: new Date(movie.release_date).getFullYear(),
        genre: movieDetails.genres?.[0]?.name || 'Unknown',
        director: director?.name || 'Unknown',
        platform: 'Not specified',
        posterUrl: tmdb.getPosterUrl(movie.poster_path),
        trailerUrl,
        overview: movieDetails.overview,
      });
    } catch (error) {
      console.error('Error adding movie:', error);
      // You could add a toast notification here
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Releases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.results?.slice(0, 8).map((movie: Movie) => (
          <RecentMovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            onAdd={() => handleAddMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
};