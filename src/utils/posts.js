import metadata from "@/assets/json/blog.json";

// Vite inlines every Markdown file in this folder at build time, so publishing
// a post means dropping a .md file there and adding its entry to blog.json.
// The file name (without ".md") is the slug that ties the two together.
const sources = import.meta.glob("../assets/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const bodies = {};
for (const path of Object.keys(sources)) {
  bodies[path.split("/").pop().replace(/\.md$/, "")] = sources[path];
}

// ISO dates (YYYY-MM-DD) sort correctly as plain strings. Newest first.
export const posts = [...metadata]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post) => ({ ...post, body: bodies[post.slug] || "" }));

export function findPost(slug) {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
