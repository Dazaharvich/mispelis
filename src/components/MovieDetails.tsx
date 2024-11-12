import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader, Plus, X } from 'lucide-react';
import { tmdb } from '../lib/tmdb';

interface MovieDetailsProps {
  movieId: number;
  onClose: () => void;
  onAddMovie: (movieData: any) => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movieId,
  onClose,
  onAddMovie,
}) => {
  const { data: movie, isLoading } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => tmdb.getMovieDetails(movieId),
  });

  const { data: credits } = useQuery({
    queryKey: ['movieCredits', movieId],
    queryFn: () => tmdb.getMovieCredits(movieId),
  });

  const { data: trailer } = useQuery({
    queryKey: ['movieTrailer', movieId],
    queryFn: () => tmdb.getMovieTrailer(movieId),
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-ucla-blue-900/50 flex items-center justify-center">
        <Loader className="animate-spin text-tea-green" size={32} />
      </div>
    );
  }

  if (!movie) return null;

  const director = credits?.crew?.find((person: any) => person.job === 'Director');

  const handleAddMovie = () => {
    onAddMovie({
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      genre: movie.genres?.[0]?.name || 'Unknown',
      director: director?.name || 'Unknown',
      platform: 'Not specified',
      posterUrl: tmdb.getPosterUrl(movie.poster_path),
      trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '',
      overview: movie.overview,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-ucla-blue-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-light-blue-600 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-tea-green bg-ucla-blue-900/50 p-2 rounded-full hover:bg-ucla-blue-900/70 transition-colors"
          >
            <X size={20} />
          </button>
          <img
            src={tmdb.getPosterUrl(movie.poster_path, 'original')}
            alt={movie.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-ucla-blue-900">{movie.title}</h2>
              <p className="text-ucla-blue-800">
                {new Date(movie.release_date).getFullYear()} • {movie.genres?.map((g: any) => g.name).join(', ')}
              </p>
              {director && (
                <p className="text-ucla-blue-800 mt-1">Director: {director.name}</p>
              )}
            </div>
            <button
              onClick={handleAddMovie}
              className="bg-ucla-blue text-tea-green px-4 py-2 rounded-lg hover:bg-ucla-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add to Watchlist
            </button>
          </div>
          <p className="text-ucla-blue-800 mb-4">{movie.overview}</p>
          {trailer && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};