export const url = "/posts.json";

export default function ({ search }) {
  const posts = search.pages("type=post", "date=desc").map((post) => ({
    path: post.url,
    title: [post.title, post.content_title, post.url]
      .find((value) => typeof value === "string" && value.trim() !== ""),
  }));
  return JSON.stringify({ posts });
}
