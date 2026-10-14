import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block overflow-hidden rounded-xl bg-zinc-900 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[2/3] overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-800 text-zinc-500">
            No Image
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="truncate font-semibold text-white">
          {movie.title}
        </h3>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-yellow-400">
            ★ {movie.vote_average.toFixed(1)}
          </span>

          <span className="text-zinc-400">
            {movie.release_date?.slice(0, 4) || "N/A"}
          </span>
        </div>
      </div>
    </Link>
  );
}