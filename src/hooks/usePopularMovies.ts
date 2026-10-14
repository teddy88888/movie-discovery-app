import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/movieService";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
  });
};
