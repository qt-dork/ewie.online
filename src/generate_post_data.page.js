export const layout = "layouts/timeline.vto";

/**
 * Paginates posts
 */
export default function* ({ search, paginate }) {
  // this is all from the documentation but uh
  // grabs all the posts
  const posts = search.pages("type=post", "date=desc");
  const options = {
    url: (n) => n === 1 ? `/` : `/${n}/`, // page 1 gets the index
    size: 10,
  };

  // dumps everything out
  for (const page of paginate(posts, options)) { // paginates that shit
    yield page;
  }
}
