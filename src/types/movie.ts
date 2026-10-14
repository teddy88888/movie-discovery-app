export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieDetail extends Movie {
  genres: MovieGenre[];
  runtime: number | null;
  tagline: string;
  status: string;
}

export interface MovieCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieCredits {
  id: number;
  cast: MovieCast[];
  crew: MovieCrew[];
}

export interface MovieSearchParams {
  query: string;
  page?: number;
}