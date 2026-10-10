import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}

/** Narrow text page: title, lede, then prose children. */
export function Page({ title, lede, children, wide = false }: { title: string; lede?: string; children?: React.ReactNode; wide?: boolean }) {
  return (
    <Shell>
      <div className={`mx-auto px-5 pt-14 pb-24 ${wide ? "max-w-[1240px]" : "max-w-[760px]"}`}>
        <h1 className="h-mono text-[36px] md:text-[52px]">{title}</h1>
        {lede && <p className="mt-5 text-[18px] md:text-[20px] leading-relaxed max-w-[60ch]">{lede}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </Shell>
  );
}
