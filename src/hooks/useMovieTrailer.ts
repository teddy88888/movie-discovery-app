import { useQuery } from "@tanstack/react-query";

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeVideo[];
}

export function useMovieTrailer(movieTitle: string) {
  return useQuery<string | null>({
    queryKey: ["movie-trailer", movieTitle],

    queryFn: async () => {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

      if (!apiKey) {
        throw new Error("YouTube API key is missing");
      }

      const query = `${movieTitle} official trailer`;

      const params = new URLSearchParams({
        part: "snippet",
        q: query,
        type: "video",
        maxResults: "5",
        key: apiKey,
      });

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch YouTube trailer");
      }

      const data: YouTubeSearchResponse = await response.json();

      if (data.items.length === 0) {
        return null;
      }

      return data.items[0].id.videoId;
    },

    enabled: Boolean(movieTitle),
  });
}
