export const layout = "layouts/posts.vto";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=post", "date=desc");
  const options = {
    url: (n) => n === 1 ? `/posts/` : `/posts/${n}/`,
    size: 10,
  };

  for (const page of paginate(posts, options))
    yield page;
}

// {{> const pages = ({ search, paginate }) => { const posts = search.pages("type=post", "order date=desc"); const options = { url: (n) => `/posts/page/${n}`, size: 10 }; for (const page of paginate(posts, options)) { yield page; } } }}