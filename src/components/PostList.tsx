import { posts, type Post } from "@/lib/posts";
import { Button } from "./ui";
import { CAL_URL } from "@/lib/site";

export function PostList({ kind, empty }: { kind: Post["kind"]; empty: string }) {
  const list = posts.filter((p) => p.kind === kind);
  if (list.length === 0) {
    return (
      <div className="md-card p-6 md:p-8 bg-yellow-2 max-w-[640px]">
        <div className="label !text-ink-2 mb-2">Coming soon</div>
        <p className="text-[17px] leading-relaxed">{empty}</p>
        <div className="mt-6"><Button href={CAL_URL} external variant="paper">Talk to us</Button></div>
      </div>
    );
  }
  return (
    <ul className="grid gap-5">
      {list.map((p) => (
        <li key={p.slug}>
          <a href={`/${p.kind}/${p.slug}`} className="md-card block p-6">
            <div className="label !text-ink-2">{p.date}</div>
            <div className="h-mono text-[22px] mt-2">{p.title}</div>
            <p className="mt-2 text-[15px] leading-relaxed">{p.summary}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
