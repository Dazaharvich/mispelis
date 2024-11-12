import React from 'react';
import { Check, Trash2, Youtube } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onToggleWatched: (id: number) => void;
  onRemove: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onToggleWatched,
  onRemove,
}) => {
  return (
    <div className="relative bg-light-blue-600 rounded-lg shadow-md overflow-hidden group">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-64 object-cover transition-transform group-hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-ucla-blue-900">{movie.title}</h3>
        <div className="space-y-1 text-sm text-ucla-blue-800">
          <p>Year: {movie.year}</p>
          <p>Genre: {movie.genre}</p>
          <p>Director: {movie.director}</p>
          <p>Platform: {movie.platform}</p>
        </div>
        {movie.overview && (
          <p className="mt-2 text-sm text-ucla-blue-800 line-clamp-2">{movie.overview}</p>
        )}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => onToggleWatched(movie.id)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
              movie.watched
                ? 'bg-tea-green text-ucla-blue-900'
                : 'bg-air-blue-200 text-air-blue-900'
            }`}
          >
            <Check size={16} />
            {movie.watched ? 'Watched' : 'Mark as watched'}
          </button>
          {movie.trailerUrl && (
            <a
              href={movie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ucla-blue-700 hover:text-ucla-blue-900 transition-colors"
              title="Watch Trailer"
            >
              <Youtube size={20} />
            </a>
          )}
          <button
            onClick={() => onRemove(movie.id)}
            className="text-ucla-blue-700 hover:text-ucla-blue-900 transition-colors"
            title="Remove from Watchlist"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};