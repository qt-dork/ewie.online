import lume from "lume/mod.ts";

import plugins, { Options } from "./plugins.ts";

const site = lume(
  {
    src: "./src",
    location: new URL ("https://ewie.online/"),
    // server: {
    //   page404: "/404/",
    // },
  },
);

site.add("static", ".");
site.add("styles");
site.add("assets/js");

import { parser as jsParser } from "npm:@lezer/javascript@^1.0.0";
import { parser as cssParser } from "npm:@lezer/css@^1.0.0";
import { parser as htmlParser } from "npm:@lezer/html@^1.0.0";
import { parser as mdParser } from "npm:@lezer/markdown@^1.0.0";

import rehypeSlug from "https://esm.sh/rehype-slug@6";
import rehypeAutolinkHeadings from "https://esm.sh/rehype-autolink-headings@7";

const options: Options = {
  lezer: {
    parsers: {
      html: htmlParser,
      css: cssParser,
      js: jsParser,
      ts: jsParser,
      md: mdParser,
    },
  },
  remark: {
    rehypePlugins: [
      [rehypeSlug],
      [rehypeAutolinkHeadings],
    ],
  },
};

site.use(plugins(options));

export default site;
