import type { Metadata } from "next";
import Link from "next/link";
import { AsciiApparatus } from "@/components/preview/AsciiApparatus";
import { BayFigure } from "@/components/preview/BayFigure";
import "@/components/preview/preview.css";

export const metadata: Metadata = {
  title: "Drums visual studies (preview)",
  description: "Experimental visual studies for Drums. Not the production site.",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <div className="pv">
      <div className="pv-banner">
        <span>Experimental preview. Two visual studies, not a launch or a settled redesign.</span>
        <Link href="/">Back to the homepage</Link>
      </div>

      <section className="pv-hero" aria-labelledby="study-1">
        <div className="pv-hero-copy">
          <p className="pv-eyebrow">Study 01 · Dark hero</p>
          <h1 id="study-1">
            Many rollouts.
            <br />
            <span>One running OS.</span>
          </h1>
          <p className="pv-lede">
            Drums is a prototype for training computer-use agents. Instead of one virtual machine per attempt, rollouts share the parts of a running OS that do
            not change, and each keeps its own files, browser session and app state.
          </p>
          <ul className="pv-tags" aria-label="Status">
            <li>Prototype</li>
            <li>Starting with macOS</li>
            <li>No measured results yet</li>
          </ul>
        </div>
        <AsciiApparatus />
        <p className="pv-hero-note">
          Illustration of the intended design, not a benchmark. Blue is the shared base; the amber and blue cells inside each pod stand for that rollout&rsquo;s
          private state.
        </p>
      </section>

      <section className="pv-fig" aria-labelledby="study-2">
        <div className="pv-fig-head">
          <p className="pv-eyebrow pv-eyebrow-ink">Study 02 · Editorial figure</p>
          <h2 id="study-2">One shared runtime. Separate rollout cartridges.</h2>
          <p>
            Spread the figure to see where the sharing stops. The blue machine is one copy of the read-only OS image, system frameworks and applications. Each
            amber cartridge plugs into it and carries only what a rollout changes.
          </p>
        </div>
        <BayFigure />
        <p className="pv-caption">
          This visualizes the intended sharing and private-state boundary of the design. It is not a measurement, and it does not describe a finished
          implementation, a cost saving or a security guarantee.
        </p>
        <p className="pv-source">
          Drawn with the isometric kit from the open-source{" "}
          <a href="https://github.com/wheresryan22/anatomy">Anatomy skill</a> (MIT, &copy; 2026 Ryan; license kept in{" "}
          <code>src/components/anatomy</code>). An exploration of that approach, not a claim to have any creator&rsquo;s private files.
        </p>
      </section>
    </div>
  );
}
