import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { searchSchema } from "../../lib/validation";
import type { SearchFormData } from "../../lib/validation";

export function Navbar() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const trimmedQuery = data.query.trim();

   

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-white"
        >
          Movie Explorer
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Home
          </Link>

          <a
            href="/#popular"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Popular
          </a>

          <Link
            to="/favorites"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Favorites
          </Link>
        </nav>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
          <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-900">
            <span className="pl-3 text-zinc-500">🔍</span>

            <input
              type="search"
              placeholder="Search movies..."
              aria-label="Search movies"
              {...register("query")}
              className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          {errors.query && (
            <p className="mt-1 text-xs text-red-400">{errors.query.message}</p>
          )}
        </form>
      </div>
    </header>
  );
}
