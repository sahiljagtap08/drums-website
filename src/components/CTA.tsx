import { Reveal } from "./Reveal";
import { Button, Arrow } from "./ui";
import { Mark } from "./Mark";
import { CAL_URL, EMAILS } from "@/lib/site";

export function CTA() {
  return (
    <section id="contact" className="relative bg-yellow border-y-2 border-ink overflow-hidden">
      <div className="absolute -right-6 top-8 w-[150px] md:w-[220px] bob" aria-hidden>
        <Mark className="w-full" />
      </div>
      <div className="relative mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <Reveal>
          <h2 className="h-mono text-[32px] md:text-[44px] max-w-[18ch]">Training agents to use computers?</h2>
          <p className="mt-4 text-[18px] max-w-[58ch] leading-relaxed">
            We&apos;re talking with researchers and teams running reinforcement learning, large evaluations, or repeated rollouts in real desktop environments. Tell us how you run these workloads today, what they cost, and where you hit limits.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-8 md-card p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center max-w-[860px]">
          <div>
            <div className="label !text-ink-2 mb-2">Fastest path</div>
            <div className="h-mono text-[22px]">Book 20 minutes with the founders</div>
            <div className="mt-3 text-[15px]">
              Or email <a className="underline decoration-2 decoration-sky underline-offset-4 hover:decoration-ink" href={`mailto:${EMAILS.sahil}`}>{EMAILS.sahil}</a>{" "}
              or <a className="underline decoration-2 decoration-sky underline-offset-4 hover:decoration-ink" href={`mailto:${EMAILS.harun}`}>{EMAILS.harun}</a>.
            </div>
          </div>
          <Button href={CAL_URL} external>Talk to us <Arrow /></Button>
        </Reveal>
      </div>
    </section>
  );
}
