import Link from "next/link";
import { Mark } from "./Mark";
import { CAL_URL } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b hairline">
      <div className="mx-auto max-w-[1280px] px-5 flex items-center h-12">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-[15px]">
          <Mark className="w-3.5 h-3.5 text-red" /> Drums
        </Link>
        <nav className="hidden md:flex gap-6 ml-10 text-[12.5px] text-ink-2">
          <a href="#approach" className="hover:text-ink">Approach</a>
          <a href="#research" className="hover:text-ink">Research</a>
          <a href="#teams" className="hover:text-ink">Teams</a>
          <a href="#founders" className="hover:text-ink">Founders</a>
        </nav>
        <div className="ml-auto flex items-stretch h-12">
          <a href="#contact" className="hidden sm:flex items-center px-5 border-l hairline label !text-ink hover:bg-neutral-50">Contact</a>
          <a href={CAL_URL} target="_blank" rel="noopener" className="flex items-center gap-2 px-5 bg-red text-white label !text-white hover:bg-red-deep">
            Talk to us <span aria-hidden>›</span>
          </a>
        </div>
      </div>
    </header>
  );
}
