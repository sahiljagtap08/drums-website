import { EMAILS } from "@/lib/site";

const people = [
  {
    name: "Sahil Jagtap",
    email: EMAILS.sahil,
    bio: "Co-founded Airstitch (acquired), infrastructure for AI agents on remote Macs. Built AgentBudget, open source with 100K+ installs. Previously AI systems and infrastructure at Cerebras, Microsoft, and Trigent.",
  },
  {
    name: "Harun Khan",
    email: EMAILS.harun,
    bio: "Previously at Haladir, the US Securities & Exchange Commission, and Leidos. Time spent across ML and AI research and its applications in biology and math.",
  },
];

export function Founders() {
  return (
    <section id="founders" className="border-b hairline">
      <div className="mx-auto max-w-[1280px] px-5">
        <div className="py-3 label border-b hairline">Founders</div>
        <div className="grid md:grid-cols-2">
          {people.map((p, i) => (
            <div key={p.name} className={`py-10 ${i > 0 ? "md:pl-10 md:border-l hairline border-t md:border-t-0" : "md:pr-10"}`}>
              <h3 className="text-[22px] font-medium tracking-tight">{p.name}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2 max-w-[52ch]">{p.bio}</p>
              <a href={`mailto:${p.email}`} className="inline-block mt-4 font-mono text-[12px] border-b border-ink hover:text-ink-3 hover:border-ink-3">{p.email}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
