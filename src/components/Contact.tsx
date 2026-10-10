import { CAL_URL, EMAILS } from "@/lib/site";

export function Contact() {
  return (
    <>
      <section id="contact" className="border-b hairline">
        <div className="mx-auto max-w-[1280px] px-5 py-20 md:py-28 grid md:grid-cols-[1fr_380px] gap-10">
          <div>
            <h2 className="text-[34px] md:text-[48px] leading-[1.02] font-medium tracking-tight max-w-[18ch]">
              Training agents to use computers? Talk to us.
            </h2>
            <p className="mt-5 text-[15px] text-ink-2 max-w-[52ch]">
              We want to hear how you run these workloads today, what they cost, and where you hit limits.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-2">
            <a href={CAL_URL} target="_blank" rel="noopener" className="label !text-white bg-ink px-4 py-3 text-center hover:bg-black">Book a call with the founders ›</a>
            <a href={`mailto:${EMAILS.sahil}`} className="label !text-ink border border-ink px-4 py-3 text-center hover:bg-neutral-50">{EMAILS.sahil}</a>
            <a href={`mailto:${EMAILS.harun}`} className="label !text-ink border border-ink px-4 py-3 text-center hover:bg-neutral-50">{EMAILS.harun}</a>
          </div>
        </div>
      </section>
    </>
  );
}
