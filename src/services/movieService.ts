import api from "../lib/axios";
import type { MovieCredits, MovieDetail, MovieResponse } from "../types/movie";
export const getPopularMovies = async (): Promise<MovieResponse> => {
  try {
    const response = await api.get<MovieResponse>("/movie/popular", {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("TMDB ERROR:", error.response?.data || error);
    throw error;
  }
};

export const getNowPlayingMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/now_playing", {
    params: {
      language: "en-US",
      page,
    },
  });

  return response.data;
};

export const getMovieDetail = async (movieId: string): Promise<MovieDetail> => {
  const response = await api.get<MovieDetail>(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
};

export const getMovieCredits = async (
  movieId: string,
): Promise<MovieCredits> => {
  const response = await api.get<MovieCredits>(`/movie/${movieId}/credits`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
};

export const searchMovies = async (
  query: string,
  page = 1,
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/search/movie", {
    params: {
      query,
      language: "en-US",
      page,
      include_adult: false,
    },
  });

  return response.data;
};

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieVideosResponse {
  results: MovieVideo[];
}

export const getMovieVideos = async (
  movieId: string,
): Promise<MovieVideosResponse> => {
  const response = await api.get<MovieVideosResponse>(
    `/movie/${movieId}/videos`,
    {
      params: {
        language: "en-US",
      },
    },
  );

  return response.data;
};
