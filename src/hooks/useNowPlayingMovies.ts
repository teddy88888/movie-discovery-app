import { useInfiniteQuery } from "@tanstack/react-query";

import { getNowPlayingMovies } from "../services/movieService";

export const useNowPlayingMovies = () => {
  return useInfiniteQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: ({ pageParam }) => getNowPlayingMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
};
