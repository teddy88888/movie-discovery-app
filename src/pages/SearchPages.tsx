import { useSearchParams } from "react-router-dom";
import { MovieCard } from "../components/movie/MovieCard";
import { useSearchMovies } from "../hooks/useSearchMovies";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const { data, isLoading, isError } = useSearchMovies(query);

  return (
    <main className="min-h-screen bg-black px-6 py-10 lg:px-[140px]">
      <div className="mx-auto max-w-[1160px]">
        <h1 className="text-3xl font-bold text-white">Search Results</h1>

        {query && (
          <p className="mt-2 text-zinc-400">
            Results for: <span className="text-white">{query}</span>
          </p>
        )}

        {!query && (
          <p className="mt-8 text-zinc-400">Enter a movie title to search.</p>
        )}

        {isLoading && <p className="mt-8 text-zinc-400">Searching movies...</p>}

        {isError && (
          <p className="mt-8 text-red-400">Failed to search movies.</p>
        )}

        {data && data.results.length === 0 && (
          <p className="mt-8 text-zinc-400">No movies found.</p>
        )}

        {data && data.results.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
