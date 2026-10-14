import { Link } from "react-router-dom";
import { MovieCard } from "../components/movie/MovieCard";
import { useMovieStore } from "../store/movieStore";

export function FavoritesPage() {
  const { favorites } = useMovieStore();

  return (
    <main className="min-h-screen bg-black px-6 py-10 lg:px-[140px]">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My Favorites</h1>
            <p className="mt-2 text-zinc-400">
              {favorites.length} movie{favorites.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Link
            to="/"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
          >
            Back to Home
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="text-center">
              <p className="text-xl font-semibold text-white">
                No favorites yet
              </p>
              <p className="mt-2 text-zinc-500">
                Add movies to your favorites to see them here.
              </p>

              <Link
                to="/"
                className="mt-6 inline-block rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
              >
                Explore Movies
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
