// Note: You'll need to replace this with your actual TMDB API key
const API_KEY = '075f4a066cdd48ab37f7602b05c8349c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`);
  }
  return response.json();
};

export const tmdb = {
  API_KEY,
  BASE_URL,
  
  async getMovieDetails(movieId: number) {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    );
    return handleResponse(response);
  },

  async searchMovies(query: string) {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1`
    );
    return handleResponse(response);
  },

  async getNowPlaying() {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    return handleResponse(response);
  },

  async getMovieTrailer(movieId: number) {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await handleResponse(response);
    return data.results.find((video: any) => video.type === 'Trailer');
  },

  getPosterUrl(path: string, size: 'w500' | 'original' = 'w500') {
    return path ? `${IMAGE_BASE_URL}/${size}${path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
  },

  async getMovieCredits(movieId: number) {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    return handleResponse(response);
  }
};