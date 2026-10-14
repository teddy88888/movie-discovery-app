import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../services/movieService";

export function useMovieVideos(movieId: string) {
  return useQuery({
    queryKey: ["movie-videos", movieId],

    queryFn: () => getMovieVideos(movieId),

    enabled: Boolean(movieId),
  });
}
