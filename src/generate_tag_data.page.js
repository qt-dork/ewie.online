export const layout = "layouts/tags.vto"

export default function* ({ search, paginate }, filters) {
  // Generate a page for each tag
  const tags = search.values("tags");
  console.log(tags);
  const pages = tags.map((tag) => ({ pages: search.pages(`'${tag}'`, "date=desc"), options: { url: (n) => n === 1 ? `/tags/${filters.slugify(tag)}/` : `/tags/${filters.slugify(tag)}/${n}/`, size: 10 } }));
  
    // yield {
    //   url: `/archive/${tag}/`,
    //   title: `“${tag}”`,
    //   type: "tag",
    //   search_query: `type=post '${tag}'`,
    //   tag,
    // };

  for (const tag of pages)
    for (const page of paginate(tag.pages, tag.options))
      yield page;
}