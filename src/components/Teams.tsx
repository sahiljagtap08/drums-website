import Image from "next/image";

export function Teams() {
  return (
    <section id="teams" className="border-b hairline">
      <div className="mx-auto max-w-[1280px] px-5 text-center pt-20 pb-14">
        <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-5 text-red" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx={12 + 9 * Math.cos((i / 12) * Math.PI * 2)} cy={12 + 9 * Math.sin((i / 12) * Math.PI * 2)} r="1.3" fill="currentColor" />
          ))}
        </svg>
        <h2 className="text-[28px] md:text-[34px] font-medium tracking-tight">Built for teams training agents.</h2>
        <p className="mt-3 text-[15px] text-ink-2 max-w-[52ch] mx-auto">
          From research groups to agent startups, Drums is for anyone running reinforcement learning, large-scale evaluations, or repeated rollouts in real desktop environments.
        </p>
        <div className="mt-8 text-red text-[10px] font-mono leading-none">▼</div>
      </div>
      <div className="mx-auto max-w-[1280px] px-5 flex justify-between label pb-2">
        <span>Used by</span>
        <span>Early design partners</span>
      </div>
      <div className="border-t hairline">
        <div className="mx-auto max-w-[1280px] grid grid-cols-2 md:grid-cols-4">
          <div className="h-24 flex items-center justify-center gap-2.5 border-r hairline px-4">
            <Image src="/logos/twentyfour26-mark.svg" alt="" width={26} height={26} />
            <span className="text-[19px] font-semibold tracking-tight">twentyfour26</span>
          </div>
          <div className="h-24 flex items-center justify-center md:border-r hairline px-4">
            <span className="text-[22px] font-semibold tracking-tight" style={{ fontFamily: "ui-rounded, 'SF Pro Rounded', var(--font-sans)" }}>Layman</span>
          </div>
          <div className="hidden md:flex h-24 items-center justify-center border-r hairline label">You?</div>
          <div className="hidden md:flex h-24 items-center justify-center label">
            <a href="#contact" className="hover:text-ink">Get in touch ›</a>
          </div>
        </div>
      </div>
    </section>
  );
}
