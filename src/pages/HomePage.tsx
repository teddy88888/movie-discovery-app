import { usePopularMovies } from "../hooks/usePopularMovies";
import { MovieCard } from "../components/movie/MovieCard";
import { Hero } from "../components/movie/Hero";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { Footer } from "../components/layout/Footer";

export function HomePage() {
  const { data, isLoading, isError, error } = usePopularMovies();

  const nowPlayingQuery = useNowPlayingMovies();

  if (isLoading || nowPlayingQuery.isLoading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="p-8">
          <p>Loading movies...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="p-8">
          <p className="text-red-400">Failed to load movies: {error.message}</p>
        </div>
      </main>
    );
  }

  const featuredMovie = data?.results[0];

  const nowPlayingMovies =
    nowPlayingQuery.data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {featuredMovie && <Hero movie={featuredMovie} />}

      {/* Trending Now */}
      <section
        id="popular"
        className="relative mx-auto max-w-7xl overflow-hidden px-8 py-12"
      >
        <h2 className="relative z-10 mb-6 text-3xl font-bold">Trending Now</h2>

        <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[496px] w-screen -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) -124.9%, #000000 79.44%)",
          }}
        />
      </section>

      {/* New Release */}
      <section className="mx-auto max-w-7xl px-8 pb-12">
        <h2 className="mb-6 text-3xl font-bold">New Release</h2>

        {nowPlayingQuery.isError && (
          <p className="text-red-400">Failed to load now playing movies.</p>
        )}

        {nowPlayingMovies.length > 0 && (
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {nowPlayingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div
              className="pointer-events-none absolute bottom-0 left-1/2 h-[800px] w-screen -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
              }}
            />

            <div className="absolute bottom-[150px] left-1/2 z-10 -translate-x-1/2">
              <button
                type="button"
                onClick={() => nowPlayingQuery.fetchNextPage()}
                disabled={
                  !nowPlayingQuery.hasNextPage ||
                  nowPlayingQuery.isFetchingNextPage
                }
                className="flex h-[52px] w-[230px] items-center justify-center rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.6)] px-2 text-base font-semibold text-[#FDFDFD] backdrop-blur-xl transition hover:bg-zinc-800/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {nowPlayingQuery.isFetchingNextPage
                  ? "Loading..."
                  : nowPlayingQuery.hasNextPage
                    ? "Load More"
                    : "No More Movies"}
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
