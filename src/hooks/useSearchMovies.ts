import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movieService";

export const useSearchMovies = (query: string, page = 1) => {
  return useQuery({
    queryKey: ["movies", "search", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.trim().length > 0,
  });
};
