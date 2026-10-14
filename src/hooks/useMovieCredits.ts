import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../services/movieService";

export const useMovieCredits = (movieId: string) => {
  return useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => getMovieCredits(movieId),
    enabled: Boolean(movieId),
  });
};
