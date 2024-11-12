import React, { useState } from 'react';
import { Film } from 'lucide-react';
import { MovieCard } from './components/MovieCard';
import { MovieSearch } from './components/MovieSearch';
import { MovieDetails } from './components/MovieDetails';
import { RecentMovies } from './components/RecentMovies';
import { useMovieStore } from './store/useMovieStore';

function App() {
  const { movies, addMovie, toggleWatched, removeMovie } = useMovieStore();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'genre' | 'director'>('title');

  const filteredMovies = movies.filter((movie) => {
    if (filter === 'watched') return movie.watched;
    if (filter === 'unwatched') return !movie.watched;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return b.year - a.year;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'genre':
        return a.genre.localeCompare(b.genre);
      case 'director':
        return a.director.localeCompare(b.director);
      default:
        return 0;
    }
  });

  const handleAddMovie = (movieData: any) => {
    const newMovie = {
      ...movieData,
      id: Date.now(),
      watched: false,
    };
    addMovie(newMovie);
  };

  return (
    <div className="min-h-screen bg-tea-green-800">
      <header className="bg-ucla-blue sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Film className="text-tea-green" size={32} />
            <h1 className="text-3xl font-bold text-tea-green">Movie Watchlist</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <MovieSearch onMovieSelect={setSelectedMovieId} />

        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-ucla-blue text-tea-green'
                  : 'bg-light-blue-600 text-ucla-blue-900 hover:bg-light-blue-500'
              }`}
            >
              All Movies
            </button>
            <button
              onClick={() => setFilter('watched')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'watched'
                  ? 'bg-ucla-blue text-tea-green'
                  : 'bg-light-blue-600 text-ucla-blue-900 hover:bg-light-blue-500'
              }`}
            >
              Watched
            </button>
            <button
              onClick={() => setFilter('unwatched')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'unwatched'
                  ? 'bg-ucla-blue text-tea-green'
                  : 'bg-light-blue-600 text-ucla-blue-900 hover:bg-light-blue-500'
              }`}
            >
              To Watch
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-ucla-blue-900">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border rounded-lg px-3 py-2 bg-light-blue-600 text-ucla-blue-900 border-light-blue-400"
            >
              <option value="title">Title</option>
              <option value="year">Year</option>
              <option value="genre">Genre</option>
              <option value="director">Director</option>
            </select>
          </div>
        </div>

        <RecentMovies onAddMovie={handleAddMovie} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ucla-blue-900 mb-6">Your Watchlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleWatched={toggleWatched}
                onRemove={removeMovie}
              />
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-ucla-blue-800 text-lg">
                No movies found. Add some movies to your watchlist!
              </p>
            </div>
          )}
        </div>
      </main>

      {selectedMovieId && (
        <MovieDetails
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          onAddMovie={handleAddMovie}
        />
      )}
    </div>
  );
}

export default App;