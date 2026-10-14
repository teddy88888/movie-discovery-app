import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { Footer } from "../components/layout/Footer";
import { useMovieStore } from "../store/movieStore";
import { searchSchema } from "../lib/validation";
import type { SearchFormData } from "../lib/validation";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function MovieDetailPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

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

  const movieQuery = useMovieDetail(id ?? "");
  const creditsQuery = useMovieCredits(id ?? "");

  const movie = movieQuery.data;
  const credits = creditsQuery.data;

  const trailerQuery = useMovieTrailer(movie?.title ?? "");

  const { favorites, addFavorite, removeFavorite } = useMovieStore();

  const isFavorite = favorites.some((item) => item.id === movie?.id);

  if (movieQuery.isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-zinc-400">Loading movie...</p>
      </main>
    );
  }

  if (movieQuery.isError || !movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
        <p className="text-red-400">Failed to load movie.</p>

        <Link
          to="/"
          className="rounded-full bg-[#961200] px-6 py-3 font-semibold"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  const releaseDate = movie.release_date
    ? new Date(`${movie.release_date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Unknown release date";

  const primaryGenre = movie.genres?.[0]?.name ?? "Unknown";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* =========================
          HERO / MOVIE DETAIL
      ========================== */}
      <section className="relative min-h-[810px] overflow-hidden">
        {/* Backdrop */}
        {movie.backdrop_path ? (
          <img
            src={`${IMAGE_BASE_URL}/original${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 h-[810px] w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 h-[810px] bg-zinc-900" />
        )}

        {/* Gradient */}
        <div
          className="absolute inset-0 h-[810px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 103.21%)",
          }}
        />

        {/* =========================
            HEADER
        ========================== */}
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
              className="px-2 py-2 text-base text-white transition hover:text-zinc-300"
            >
              Home
            </Link>

            <Link
              to="/favorites"
              className="px-2 py-2 text-base text-white transition hover:text-zinc-300"
            >
              Favorites
            </Link>
          </nav>

          {/* Search + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="relative hidden lg:block">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex h-14 w-[243px] items-center rounded-2xl border border-[#252B37] bg-[rgba(10,13,18,0.6)] px-4 backdrop-blur-xl transition focus-within:border-zinc-500"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="#717680"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M16.5 16.5L21 21"
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
                  className="w-full bg-transparent px-2 text-base text-white outline-none placeholder:text-[#717680]"
                />
              </form>

              {errors.query && (
                <p className="absolute right-0 top-[60px] w-[243px] text-xs text-red-400">
                  {errors.query.message}
                </p>
              )}
            </div>

            {/* Mobile Search */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center lg:hidden"
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

            {/* Mobile Hamburger */}
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
          <div className="absolute left-0 right-0 top-[90px] z-30 px-6 lg:hidden">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-14 w-full items-center rounded-2xl border border-zinc-700 bg-black/95 px-4 backdrop-blur-xl"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
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
                autoFocus
                placeholder="Search Movie"
                aria-label="Search Movie"
                {...register("query")}
                className="w-full bg-transparent px-3 text-base text-white outline-none placeholder:text-zinc-500"
              />
            </form>

            {errors.query && (
              <p className="mt-2 text-xs text-red-400">
                {errors.query.message}
              </p>
            )}
          </div>
        )}

        {/* =========================
    MOBILE FULL SCREEN MENU
========================== */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black md:hidden">
            <div className="flex h-[110px] items-center justify-between px-10">
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

                <span className="font-[Poppins] text-[32px] font-semibold tracking-[-0.04em]">
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

            <nav className="flex flex-col px-12 pt-16">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-[Poppins] text-[20px] leading-[4px] text-white"
              >
                Home
              </Link>

              <Link
                to="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className="mt-12 font-[Poppins] text-[20px] leading-[48px] text-white"
              >
                Favorites
              </Link>
            </nav>
          </div>
        )}

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black md:hidden">
            <div className="flex h-[90px] items-center justify-between px-4">
              {/* Logo */}
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center">
                  <img src="/tv.png" alt="Movie" />
                </span>

                <span className="font-[Poppins] text-[32px] font-semibold tracking-[-0.04em] text-white">
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

            {/* Menu */}
            <nav className="flex flex-col px-7 pt-8">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-[Poppins] text-[20px] font-normal leading-[48px] text-white"
              >
                Home
              </Link>

              <Link
                to="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 font-[Poppins] text-[20px] font-normal leading-[48px] text-white"
              >
                Favorites
              </Link>
            </nav>
          </div>
        )}

        {/* =========================
            MOVIE CONTENT
        ========================== */}
        <div className="relative z-10 mx-auto w-full max-w-[1160px] px-6 pt-[412px] lg:px-0">
          <div className="flex flex-col gap-12">
            {/* Poster + Information */}
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {/* Poster */}
              <div className="h-[384px] w-[260px] shrink-0 overflow-hidden rounded-xl">
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-zinc-900 text-zinc-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Movie Information */}
              <div className="flex flex-1 flex-col gap-6">
                {/* Title */}
                <h1 className="font-[Poppins] text-4xl font-bold leading-[56px] tracking-[-0.02em] text-[#FDFDFD] lg:text-[40px]">
                  {movie.title}
                </h1>

                {/* Release Date */}
                <div className="flex items-center gap-2 font-[Poppins] text-base text-white">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2"
                      stroke="#FDFDFD"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M8 3V7M16 3V7M3 10H21"
                      stroke="#FDFDFD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span>{releaseDate}</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (trailerQuery.data) {
                        navigate(`/trailer/${movie.id}`);
                      }
                    }}
                    disabled={trailerQuery.isLoading || !trailerQuery.data}
                    className="flex h-[52px] w-[220px] items-center justify-center gap-2 rounded-full bg-[#961200] font-[Poppins] text-base font-semibold text-white transition hover:bg-[#b51b05] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>
                      {trailerQuery.isLoading
                        ? "Loading..."
                        : trailerQuery.data
                          ? "Watch Trailer"
                          : "Trailer Unavailable"}
                    </span>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="white"
                        strokeWidth="2"
                      />

                      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                    onClick={() => {
                      if (isFavorite) {
                        removeFavorite(movie.id);
                      } else {
                        addFavorite(movie);
                      }
                    }}
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.6)] backdrop-blur-xl transition hover:bg-zinc-800/80"
                  >
                    <span
                      className={`text-2xl ${
                        isFavorite ? "text-red-500" : "text-white"
                      }`}
                    >
                      {isFavorite ? "♥" : "♡"}
                    </span>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Rating */}
                  <div className="flex h-[146px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#252B37] bg-black p-5">
                    <span className="text-3xl text-[#E4A802]">★</span>

                    <div className="text-center">
                      <p className="font-[Poppins] text-base text-[#D5D7DA]">
                        Rating
                      </p>

                      <p className="font-[Poppins] text-xl font-semibold text-white">
                        {movie.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                  </div>

                  {/* Genre */}
                  <div className="flex h-[146px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#252B37] bg-black p-5">
                    <span className="h-8 w-6">
                      <img src=" /Video.png" alt="video" />
                    </span>

                    <div className="text-center">
                      <p className="font-[Poppins] text-base text-[#D5D7DA]">
                        Genre
                      </p>

                      <p className="font-[Poppins] text-xl font-semibold text-white">
                        {primaryGenre}
                      </p>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="flex h-[146px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#252B37] bg-black p-5">
                    <span className="h-8 w-6">
                      <img src="/emoji.png" alt="emoji" />
                    </span>

                    <div className="text-center">
                      <p className="font-[Poppins] text-base text-[#D5D7DA]">
                        Age Limit
                      </p>

                      <p className="font-[Poppins] text-xl font-semibold text-white">
                        13
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================
                OVERVIEW
            ========================== */}
            <section>
              <h2 className="font-[Poppins] text-3xl font-bold tracking-[-0.02em] text-[#FDFDFD]">
                Overview
              </h2>

              <p className="mt-2 max-w-[1160px] font-[Poppins] text-base leading-[30px] text-[#A4A7AE]">
                {movie.overview || "No overview available."}
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* =========================
    CAST
========================== */}
      <section className="mx-auto w-full max-w-[1160px] px-6 py-12 lg:px-0">
        <h2 className="mb-6 font-[Poppins] text-3xl font-bold tracking-[-0.02em] text-[#FDFDFD]">
          Cast
        </h2>

        {creditsQuery.isLoading && (
          <p className="text-[#A4A7AE]">Loading cast...</p>
        )}

        {creditsQuery.isError && (
          <p className="text-red-400">Failed to load cast.</p>
        )}

        {credits?.cast && credits.cast.length > 0 && (
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {credits.cast.slice(0, 6).map((person) => (
              <div
                key={`${person.id}-${person.character}`}
                className="flex h-[104px] w-full max-w-[360px] items-center gap-4"
              >
                {/* Actor Image */}
                <div className="h-[104px] w-[69px] shrink-0 overflow-hidden rounded-[10px] bg-zinc-900">
                  {person.profile_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}/w185${person.profile_path}`}
                      alt={person.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-center text-xs text-zinc-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Actor Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-[Poppins] text-base font-semibold leading-[30px] text-[#FDFDFD]">
                    {person.name}
                  </h3>

                  <p className="truncate font-[Poppins] text-base leading-[30px] text-[#A4A7AE]">
                    {person.character || "Unknown character"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {credits?.cast?.length === 0 && (
          <p className="text-[#A4A7AE]">No cast information available.</p>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
