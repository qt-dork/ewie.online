import lume from "lume/mod.ts";

import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import feed from "lume/plugins/feed.ts";
import fff from "lume/plugins/fff.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import pagefind from "lume/plugins/pagefind.ts";
import remark from "lume/plugins/remark.ts";
import robots from "lume/plugins/robots.ts";
import sitemap from "lume/plugins/sitemap.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";

import withShiki from "npm:@leafac/rehype-shiki";
import { codeToHtml } from "npm:shiki";

import truncate from "./helpers/truncate_html.ts";

const site = lume(
  {
    src: "./src",
    location: new URL("https://ewie.online/"),
    // server: {
    //   page404: "/404/",
    // },
  },
);

site.copy("static", ".");

site.use(date({
  formats: {
    "ISO": "yyyy-MM-dd'T'HH:mm:ss'Z'",
    "TITLE": "iii, MMM d, y, ppp",
    "HUMAN": "MMMM d, y 'at' h:mm aaa",
  },
}));
site.use(esbuild());
site.use(feed({
  output: ["/feed/feed.xml", "/feed/feed.json"], // The file or files that must be generated
  query: "type=post", // Select only pages of type=post
  sort: "date=desc", // To sort by date in descending order
  limit: 20, // To show only the 10 first results
  info: {
    title: "Evie On-Line", // The feed title
    description: "Just some posts and stuff", // The feed subtitle
    published: new Date(), // The publishing date
    lang: "en", // The language of the feed
    // hubs: undefined, // The WebSub hubs for the feed
    generator: true, // Set `true` to automatically generate the "Lume {version}"
    authorName: "Evie Finch", // The author of the site
    authorUrl: "https://evie.online/", // The URL of the author
  },
  items: {
    title: "=title", // The title of every item
    description: "=excerpt", // The description of every item
    published: "=date", // The publishing date of every item
    // updated: undefined, // The last update of every item
    content: "=children", // The content of every item
    // lang: "=lang", // The language of every item
    image: "=cover", // The image of the item
    authorName: "=author.name", // The author of the article
    authorUrl: "=author.url", // The URL of the author
  },
}));
site.use(fff());
site.use(lightningcss(
  // {
  //   options: {
  //     include: Features.Nesting,
  //     drafts: {
  //       customMedia: true
  //     }
  //   }
  // }
));
site.use(pagefind(/* Options */));

// const highlighter = await codeToHtml;
// site.use(remark({
//   rehypePlugins: [
//     [withShiki, { highlighter }],
//   ],
// }));
site.use(robots());
site.use(sitemap());
site.use(slugifyUrls());
// site.use(cache_busting());

// Bad code here
import createSlugifier, {
  defaults as slugifierDefaults,
} from "lume/core/slugifier.ts";
import { format } from "lume/deps/date.ts";
site.preprocess([".md"], (pages) => {
  const slugify = createSlugifier(slugifierDefaults);
  for (const page of pages) {
    if (page.data.type === "post") {
      const slugDate = format(new Date(page.data.date), "yyyyMMdd");
      const slugBody = slugify(
        page.data.title ??
          ((page.data.content as string | undefined) ?? "undefined").substring(
            0,
            40,
          ),
      ).substring(0, 20);
      page.data.url = `/posts/${slugDate}-${slugBody}/`;
      if (page.data.permalink) {
        page.data.url = page.data.permalink;
      }
    }
  }
});

site.filter(
  "trimToLineBreak",
  (value: string) => (value.split("\n---\n")[0].trimEnd()),
);

site.filter("truncate", truncate);

site.filter(
  "hash",
  (value: string) => {
    const cyrb53 = (str: string, seed = 0) => {
      let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
      for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
      h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
      h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

      return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };
    return cyrb53(value).toString(16);
  },
);

export default site;
