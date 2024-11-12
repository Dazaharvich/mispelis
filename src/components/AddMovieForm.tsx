import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddMovieFormProps {
  onAdd: (movie: {
    title: string;
    genre: string;
    year: number;
    platform: string;
    posterUrl: string;
    trailerUrl?: string;
  }) => void;
}

export const AddMovieForm: React.FC<AddMovieFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: new Date().getFullYear(),
    platform: '',
    posterUrl: '',
    trailerUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      title: '',
      genre: '',
      year: new Date().getFullYear(),
      platform: '',
      posterUrl: '',
      trailerUrl: '',
    });
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        <Plus size={20} />
        Add Movie
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Genre"
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Streaming Platform"
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="url"
              placeholder="Poster URL"
              value={formData.posterUrl}
              onChange={(e) =>
                setFormData({ ...formData, posterUrl: e.target.value })
              }
              className="p-2 border rounded"
              required
            />
            <input
              type="url"
              placeholder="Trailer URL (optional)"
              value={formData.trailerUrl}
              onChange={(e) =>
                setFormData({ ...formData, trailerUrl: e.target.value })
              }
              className="p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Movie
          </button>
        </form>
      )}
    </div>
  );
};