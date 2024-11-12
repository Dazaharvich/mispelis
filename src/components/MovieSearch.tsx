import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../lib/tmdb';

interface MovieSearchProps {
  onMovieSelect: (movieId: number) => void;
}

export const MovieSearch: React.FC<MovieSearchProps> = ({ onMovieSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['movieSearch', searchTerm],
    queryFn: () => tmdb.searchMovies(searchTerm),
    enabled: false,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      await refetch();
      setIsSearching(false);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="w-full p-2 pl-10 border rounded-lg bg-light-blue-600 text-ucla-blue-900 border-light-blue-400 placeholder-ucla-blue-700"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ucla-blue-700" size={20} />
        </div>
        <button
          type="submit"
          className="bg-ucla-blue text-tea-green px-4 py-2 rounded-lg hover:bg-ucla-blue-600 transition-colors flex items-center gap-2"
          disabled={isLoading || isSearching}
        >
          {isLoading || isSearching ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            'Search'
          )}
        </button>
      </form>

      {data?.results && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.results.map((movie: any) => (
            <div
              key={movie.id}
              className="bg-light-blue-600 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onMovieSelect(movie.id)}
            >
              <img
                src={tmdb.getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-ucla-blue-900">{movie.title}</h3>
                <p className="text-sm text-ucla-blue-800">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};