import lume from "@lumeland/lume";

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

site.copy("static", ".");
site.add("styles");
site.add("assets/js");

import { parser as jsParser } from "@lezer/javascript";
import { parser as cssParser } from "@lezer/css";
import { parser as htmlParser } from "@lezer/html";
import { parser as mdParser } from "@lezer/markdown";

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
