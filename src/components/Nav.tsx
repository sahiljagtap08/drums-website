import { Mark } from "./Mark";
import { Button } from "./ui";
import { CAL_URL } from "@/lib/site";

const links = [
  ["How it works", "#how"],
  ["What we measure", "#measure"],
  ["Contact", "#contact"],
];

export function Nav() {
  return (
    <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur border-b-2 border-ink">
      <div className="mx-auto max-w-[1240px] px-5 h-[72px] flex items-center gap-8">
        <a href="#top" className="flex items-center gap-2.5 wiggle">
          <Mark className="w-8 h-8" />
          <span className="font-semibold text-[22px] tracking-tight">Drums</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 ml-4">
          {links.map(([t, h]) => (
            <a key={t} href={h} className="md-link !text-[13px]"><span>{t}</span></a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <a href="#contact" className="hidden sm:inline md-link !text-[13px]"><span>Email us</span></a>
          <Button href={CAL_URL} external>Talk to us</Button>
        </div>
      </div>
    </header>
  );
}
