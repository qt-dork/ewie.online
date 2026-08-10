export const layout = "layouts/timeline.vto";

/**
 * Generates a page for each tag. Those pages also support pagination (because I didn't know any other way to make this work.)
 */
export default function* ({ search, paginate }, filters) {
  // Grabs every tag
  const tags = search.values("tags");

  // This part's annoying and it didn't work for a bit until i figured it out
  const pages = tags.map((tag) => ({
    // searches for a specific tag (for every tag)
    pages: search.pages(`'${tag}'`, "date=desc"), // the 'tag' part matters cos otherwise it treats them as separate
    options: {
      // page 1 gets /tags/tagName while everyone else gets numbers
      url: (n) =>
        n === 1
          ? `/tags/${filters.slugify(tag)}/`
          : `/tags/${filters.slugify(tag)}/${n}/`,
      size: 10,
    },
  }));

  // dumps everything out
  for (const tag of pages) {
    for (const page of paginate(tag.pages, tag.options)) {
      yield page;
    }
  }
}
