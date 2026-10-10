export type Post = { slug: string; title: string; date: string; summary: string; kind: "blog" | "research" };
// Add posts here as they publish. Newest first.
export const posts: Post[] = [];
