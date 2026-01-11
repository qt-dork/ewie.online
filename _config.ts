import lume from "lume/mod.ts";
import plugins, { Options } from "./plugins.ts";

import truncate from "./helpers/truncate_html.ts";

const site = lume({
  src: "./src",
  // server: { page404: "/404/" }
});

site.add("static", ".");
site.add("styles");
// TODO: Set up site to import from there instead
// site.add("_include/css");
site.add("assets/js");

import { rehypeLezer } from "./helpers/rehype-lezer/highlight.js";
import { parser as javascriptParser } from "npm:@lezer/javascript@^1.0.0";
import { parser as cssParser } from "npm:@lezer/css@^1.0.0";
import { parser as htmlParser } from "npm:@lezer/html@^1.0.0";
import { parser as mdParser } from "npm:@lezer/markdown@^1.0.0";

import rehypeSlug from "https://esm.sh/rehype-slug@6";
import rehypeAutolinkHeadings from "https://esm.sh/rehype-autolink-headings@7";

const remarkOptions: Options = {
  remark: {
    rehypePlugins: [
      [rehypeSlug],
      [rehypeLezer, {
        parsers: [
          { lang: "js", parser: javascriptParser },
          { lang: "css", parser: cssParser },
          { lang: "html", parser: htmlParser },
          { lang: "md", parser: mdParser },
        ],
      }],
      [rehypeAutolinkHeadings],
    ],
  },
};

site.use(plugins(remarkOptions));

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
