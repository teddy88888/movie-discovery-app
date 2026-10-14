import type { MovieCast } from "../../types/movie";

interface CastSectionProps {
  cast: MovieCast[];
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export function CastSection({ cast }: CastSectionProps) {
  const visibleCast = cast.slice(0, 10);

  if (visibleCast.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h2 className="mb-6 font-[Poppins] text-3xl font-semibold text-white">
        Cast
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
        {visibleCast.map((person) => (
          <div key={`${person.id}-${person.character}`} className="min-w-0">
            <div className="aspect-[2/3] overflow-hidden rounded-xl bg-zinc-900">
              {person.profile_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${person.profile_path}`}
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

            <h3 className="mt-3 truncate text-sm font-semibold text-white">
              {person.name}
            </h3>

            <p className="truncate text-xs text-zinc-500">{person.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
