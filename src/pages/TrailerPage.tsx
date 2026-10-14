import { Link, useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useMovieVideos } from "../hooks/useMoviesVideos";

export function TrailerPage() {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading: movieLoading } = useMovieDetail(id ?? "");
  const { data: videos, isLoading: videosLoading } = useMovieVideos(id ?? "");

  const youtubeVideos =
    videos?.results?.filter(
      (video) => video.site === "YouTube" && Boolean(video.key),
    ) ?? [];

  const trailer =
    youtubeVideos.find((video) => video.type === "Trailer" && video.official) ??
    youtubeVideos.find((video) => video.type === "Trailer") ??
    youtubeVideos.find((video) => video.type === "Teaser") ??
    youtubeVideos[0];

  if (movieLoading || videosLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-lg">Loading trailer...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
        <p className="mb-6 text-xl">Movie not found.</p>

        <Link
          to="/"
          className="rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex h-[90px] items-center justify-between border-b border-white/10 px-5 sm:px-8">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-white sm:text-2xl"
        >
          Movie Explorer
        </Link>

        <Link
          to="/"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
        >
          Back to Home
        </Link>
      </header>

      {/* Trailer */}
      <main className="flex min-h-[calc(100vh-180px)] flex-col items-center justify-center px-10 py-6 sm:px-6">
        <div className="mb-6 w-full px-5 sm:w-[65%] sm:px-0">
          <h1 className="text-xl font-bold sm:text-2xl">
            {movie.title} - Trailer
          </h1>
        </div>

        {trailer ? (
          <div className="relative aspect-video w-full overflow-hidden bg-black sm:w-[65%] sm:rounded-xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&playsinline=1&rel=0`}
              title={`${movie.title} Trailer`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : (
          <div className="mx-5 w-full rounded-xl bg-zinc-900 p-10 text-center sm:w-[65%]">
            <p className="mb-5 text-lg">
              Trailer tidak tersedia untuk film ini.
            </p>

            <Link
              to="/"
              className="inline-block rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
