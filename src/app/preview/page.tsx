import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { DeskComputer } from "@/components/desk/DeskComputer";
import { Mark } from "@/components/Mark";
import { CAL_URL, COMPANY } from "@/lib/site";
import "./preview.css";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500"], style: ["normal", "italic"] });

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export const metadata: Metadata = {
  title: "Drums",
  description: "Drums is being built to run many computer-use training attempts on one running operating system.",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <div className={`dk ${serif.variable}`}>
      <main>
        <h1 className="dk-lede">
          <Mark className="dk-mark" />
          Drums is being built to let AI labs run many computer-use training attempts on one running operating system, instead of giving each attempt its own virtual machine.
        </h1>

        <section className="dk-desk" aria-label="A desk computer you can type on">
          <DeskComputer />
        </section>

        <div className="dk-body">
          <p>
            The design shares the parts that never change, the operating system and its applications, while each attempt keeps its own files, browser
            session and application state. The aim is to cut the hardware these runs need, and with it the cost.
          </p>
          <p>
            <a className="dk-link" href={CAL_URL} target="_blank" rel="noopener noreferrer">
              Talk to us
            </a>
          </p>
        </div>
      </main>

      <footer className="dk-foot">
        <p>Copyright &copy; 2026 {COMPANY}</p>
        <p>
          <a href="https://drums.run/privacy">Privacy policy</a>
        </p>
        <p>
          <a href="https://drums.run/terms">Terms of use</a>
        </p>
      </footer>
    </div>
  );
}
