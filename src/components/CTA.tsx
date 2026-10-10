import { Reveal } from "./Reveal";
import { Button, Arrow } from "./ui";
import { Mark } from "./Mark";
import { CAL_URL, CAL_EMBED_URL } from "@/lib/site";

export function CTA() {
  return (
    <section id="contact" className="relative bg-yellow border-y-2 border-ink overflow-hidden">
      <div className="relative mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          <Reveal>
            <h2 className="h-mono text-[32px] md:text-[44px] max-w-[18ch]">Training agents to use computers?</h2>
            <p className="mt-4 text-[18px] max-w-[48ch] leading-relaxed">
              We work with teams running reinforcement learning, large evaluations, and repeated rollouts in real desktop environments. Pick a slot and tell us how you run these workloads today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={CAL_URL} external variant="paper">Talk to us <Arrow /></Button>
            </div>
            <p className="mt-4 label !text-ink-2">20 minutes · Pricing is discussed on the call</p>
            <div className="hidden lg:block mt-14 w-[150px] bob" aria-hidden><Mark className="w-full" /></div>
          </Reveal>
          <Reveal delay={120}>
            <div className="md-card is-raised overflow-hidden">
              <div className="flex items-center gap-2 px-4 h-10 border-b-2 border-ink bg-cream">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-coral" />
                <span className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-yellow" />
                <span className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-teal-2" />
                <span className="ml-2 label !text-ink-2">Book a call</span>
              </div>
              <iframe
                src={CAL_EMBED_URL}
                title="Book a call with Drums"
                loading="lazy"
                className="block w-full h-[640px] bg-paper"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
