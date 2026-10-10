import { CAL_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="border-b hairline">
      <div className="mx-auto max-w-[1280px] grid md:grid-cols-[1fr_380px]">
        <div className="px-5 pt-28 pb-14 md:pt-40 md:pb-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-red inline-block" />
            <span className="label !text-ink">Infrastructure for computer-use training</span>
          </div>
          <h1 className="text-[44px] leading-[0.98] sm:text-[64px] md:text-[80px] lg:text-[92px] font-medium tracking-[-0.035em] max-w-[11ch]">
            More computer-use training on less hardware.
          </h1>
        </div>
        <aside className="relative border-t md:border-t-0 md:border-l hairline px-5 py-8 md:py-10 flex flex-col">
          <div className="font-mono text-[13px] tracking-wide">
            DRUMS <span className="blink">_</span>
          </div>
          <div className="mt-auto pt-16 md:pt-40">
            <div className="flex flex-col items-start gap-1 mb-5 text-red text-[10px] leading-none font-mono">
              <span className="opacity-40">▲</span><span className="opacity-70">▲</span><span>▼</span>
            </div>
            <p className="text-[15px] leading-snug text-ink-2 max-w-[30ch]">
              lets researchers run more independent training attempts on the same machine by sharing what&apos;s identical and isolating what&apos;s different. Starting with macOS.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <a href={CAL_URL} target="_blank" rel="noopener" className="label !text-white bg-ink px-4 py-2.5 hover:bg-black">
                Talk to us ›
              </a>
              <a href="#approach" className="label !text-ink border border-ink px-4 py-2.5 hover:bg-neutral-50">
                Our approach
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
