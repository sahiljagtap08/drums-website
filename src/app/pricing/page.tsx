import type { Metadata } from "next";
import { Page } from "@/components/Shell";
import { Button, Arrow } from "@/components/ui";
import { CAL_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Pricing — Drums", description: "Drums is priced per machine. Book a call for a quote." };

const includes = [
  "Dedicated hardware, priced per machine",
  "Shared running macOS, loaded once",
  "Isolated per-attempt files, sessions, and state",
  "Instant reset between attempts",
  "Direct line to the team",
];

export default function Pricing() {
  return (
    <Page title="Pricing" lede="Priced per machine, sized to your training workload. Tell us your attempt volume and we'll quote it on the call." wide>
      <div className="md-card is-raised-lg max-w-[560px] p-7 md:p-9">
        <div className="label !text-ink-2">Teams</div>
        <div className="h-mono text-[48px] md:text-[64px] leading-none mt-3">Custom</div>
        <p className="mt-3 text-[16px] text-ink-2">Per machine · monthly</p>
        <div className="mt-6"><Button href={CAL_URL} external>Talk to us <Arrow /></Button></div>
        <hr className="my-7 border-t-2 border-ink/15" />
        <ul className="space-y-3 text-[15.5px]">
          {includes.map((i) => (
            <li key={i} className="flex gap-3"><span className="text-teal font-semibold">✓</span>{i}</li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
