import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[#252B37] bg-black">
      <div className="mx-auto flex min-h-[120px] max-w-[1440px] items-center gap-2 px-6 py-2 lg:px-[140px]">
        {/* Logo */}
        <Link
          to="/"
          className="flex h-10 w-[129px] shrink-0 items-center gap-[7px]"
        >
          <span className="flex h-10 w-10 items-center justify-center text-3xl">
            <img src=" /tv.png" alt="box tv" />
          </span>

          <span className="font-[Poppins] text-[28px] font-semibold leading-9 tracking-[-0.04em] text-[#FDFDFD]">
            Movie
          </span>
        </Link>

        {/* Copyright */}
        <p className="flex-1 text-right font-[Poppins] text-base font-normal leading-[30px] text-[#535862]">
          Copyright ©2025&nbsp; Movie Explorer
        </p>
      </div>
    </footer>
  );
}
