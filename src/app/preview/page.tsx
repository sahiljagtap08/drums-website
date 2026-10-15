import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { DeskComputer } from "@/components/desk/DeskComputer";
import { Mark } from "@/components/Mark";
import { CAL_URL } from "@/lib/site";
import "./preview.css";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Drums",
  description: "Drums is being built to run many computer-use training attempts on one running operating system.",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <div className={`dk ${serif.variable}`}>
      <header className="dk-head">
        <Mark className="dk-mark" />
        <span>Drums</span>
      </header>

      <main>
        <h1 className="dk-lede">
          Drums lets AI labs run many computer-use training attempts on one running operating system, instead of giving each attempt its own virtual machine.
        </h1>

        <section className="dk-desk" aria-label="A desk computer you can type on">
          <DeskComputer />
        </section>

        <div className="dk-body">
          <p>
            The attempts share the parts that never change, the operating system and its applications. Each one keeps its own files, browser session and
            application state. The aim is to cut the hardware these runs need, and with it the cost.
          </p>
          <p>Drums is a prototype. We have no measurements to share yet.</p>
          <p>
            <a className="dk-link" href={CAL_URL} target="_blank" rel="noopener noreferrer">
              Talk to us
            </a>
          </p>
        </div>
      </main>

      <footer className="dk-foot">
        <p>
          Review copy, not indexed. The desk computer is adapted from{" "}
          <a href="https://github.com/wheresryan22/anatomy" target="_blank" rel="noopener noreferrer">
            Anatomy
          </a>{" "}
          by Ryan (MIT license). No affiliation with any other company is implied.
        </p>
      </footer>
    </div>
  );
}
