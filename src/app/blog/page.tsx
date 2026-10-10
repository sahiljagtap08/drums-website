import type { Metadata } from "next";
import { Page } from "@/components/Shell";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = { title: "Blog — Drums", description: "Engineering notes and product updates from Drums." };

export default function Blog() {
  return (
    <Page title="Blog" lede="Engineering notes and product updates from the team building shared-state virtual computers." wide>
      <PostList kind="blog" empty="First posts are in the works: how attempts share one running macOS, what resets really cost, and what we see in training workloads today." />
    </Page>
  );
}
