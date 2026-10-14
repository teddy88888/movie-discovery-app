import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../services/movieService";

export const useMovieDetail = (movieId: string) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: Boolean(movieId),
  });
};
