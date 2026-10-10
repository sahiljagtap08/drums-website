import type { Metadata } from "next";
import { Page } from "@/components/Shell";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = { title: "Research — Drums", description: "Measurements and write-ups from Drums on training computer-use agents." };

export default function Research() {
  return (
    <Page title="Research" lede="Benchmarks and write-ups on concurrency, memory, throughput, and isolation for computer-use training." wide>
      <PostList kind="research" empty="Our first benchmark report compares Drums with one virtual machine per attempt on identical hardware. It publishes here when it lands." />
    </Page>
  );
}
