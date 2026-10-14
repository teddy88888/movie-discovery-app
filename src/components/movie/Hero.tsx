import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import type { Movie } from "../../types/movie";
import { searchSchema } from "../../lib/validation";
import type { SearchFormData } from "../../lib/validation";

interface HeroProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export function Hero({ movie }: HeroProps) {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

    if (!trimmedQuery) {
      return;
    }

    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <section className="relative min-h-[810px] w-full overflow-hidden bg-black">
      {/* =========================
          BACKGROUND
      ========================== */}
      {movie.backdrop_path ? (
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-900" />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

      {/* =========================
          HEADER
      ========================== */}
      <header className="absolute left-1/2 top-0 z-20 flex h-[90px] w-full max-w-[1440px] -translate-x-1/2 items-center justify-between px-6 lg:px-[140px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="flex h-10 w-10 items-center justify-center">
            <img
              src="/tv.png"
              alt="Movie Explorer"
              className="h-10 w-10 object-contain"
            />
          </span>

          <span className="font-[Poppins] text-[28px] font-semibold tracking-[-0.04em]">
            Movie
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="px-2 py-2 text-base font-normal text-white transition hover:text-zinc-300"
          >
            Home
          </Link>

          <Link
            to="/favorites"
            className="px-2 py-2 text-base font-normal text-white transition hover:text-zinc-300"
          >
            Favorites
          </Link>
        </nav>

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="flex items-center gap-3">
          {/* =========================
              DESKTOP SEARCH
          ========================== */}
          <div className="relative hidden lg:block">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-14 w-[243px] items-center rounded-2xl border border-zinc-700 bg-zinc-950/60 backdrop-blur-xl transition focus-within:border-zinc-500"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="ml-4 shrink-0"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="#717680"
                  strokeWidth="1.5"
                />

                <path
                  d="M16 16L21 21"
                  stroke="#717680"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="search"
                placeholder="Search Movie"
                aria-label="Search Movie"
                {...register("query")}
                className="w-full bg-transparent px-2 text-base text-white outline-none placeholder:text-zinc-500"
              />
            </form>

            {errors.query && (
              <p className="absolute right-0 top-[60px] w-[243px] text-xs text-red-400">
                {errors.query.message}
              </p>
            )}
          </div>

          {/* =========================
              MOBILE SEARCH BUTTON
          ========================== */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center md:flex lg:hidden"
          >
            {isSearchOpen ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 7L25 25M25 7L7 25"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="17.5"
                  cy="17.5"
                  r="14"
                  stroke="white"
                  strokeWidth="2.5"
                />

                <path
                  d="M28 28L36 36"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {/* =========================
              MOBILE HAMBURGER
          ========================== */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-12 w-12 items-center justify-center md:hidden"
          >
            {isMenuOpen ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 7L25 25M25 7L7 25"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 8H27M5 16H27M5 24H27"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* =========================
          MOBILE SEARCH
      ========================== */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-[90px] z-30 px-6 md:hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-14 w-full items-center rounded-2xl border border-zinc-700 bg-black/95 px-4 backdrop-blur-xl"
          >
            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="#717680"
                strokeWidth="1.5"
              />

              <path
                d="M16 16L21 21"
                stroke="#717680"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg> */}
            {/* <img src=" /search.png" alt="seach" className="h-24 w-24 " /> */}

            <input
              type="search"
              autoFocus
              placeholder="Search Movie"
              aria-label="Search Movie"
              {...register("query")}
              className="w-full bg-transparent px-3 text-base text-white outline-none placeholder:text-zinc-500"
            />
          </form>

          {errors.query && (
            <p className="mt-2 text-xs text-red-400">{errors.query.message}</p>
          )}
        </div>
      )}

      {/* =========================
          MOBILE FULL SCREEN MENU
      ========================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black md:hidden">
          {/* Menu Header */}
          <div className="mt-6 flex h-[30px] items-center justify-between px-5">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center">
                <img
                  src="/tv.png"
                  alt="Movie Explorer"
                  className="h-10 w-10 object-contain"
                />
              </span>

              <span className="font-[Poppins] text-[28px] font-semibold tracking-[-0.04em]">
                Movie
              </span>
            </Link>

            {/* Close */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-12 w-12 items-center justify-center"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 7L25 25M25 7L7 25"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col px-7 pt-16">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="font-[Poppins] text-[20px] font-normal leading-[30px]  text-white"
            >
              Home
            </Link>

            <Link
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="mt-6 font-[Poppins] text-[20px] font-normal leading-[48px] text-white"
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}

      {/* =========================
          HERO CONTENT
      ========================== */}
      <div className="absolute left-1/2 top-[298px] z-10 w-full max-w-[1160px] -translate-x-1/2 px-6 lg:px-0">
        <div className="flex max-w-full flex-col gap-12">
          {/* Title + Description */}
          <div className="flex flex-col gap-4">
            <h1 className="font-[Poppins] text-4xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-5xl lg:text-[48px] lg:leading-[60px]">
              {movie.title}
            </h1>

            <p className="font-[Poppins] text-base font-normal leading-[30px] text-zinc-400">
              {movie.overview ||
                "Discover amazing movies and explore your favorite stories."}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Watch Trailer */}
            <Link
              to={`/movie/${movie.id}`}
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#961200] px-4 text-base font-semibold text-white transition hover:bg-[#b51b05] sm:w-[230px]"
            >
              <span>Watch Trailer</span>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" fill="white" />
                <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="black" />
              </svg>
            </Link>

            {/* See Details */}
            <Link
              to={`/movie/${movie.id}`}
              className="flex h-[52px] w-full items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 px-4 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-zinc-800/70 sm:w-[230px]"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
