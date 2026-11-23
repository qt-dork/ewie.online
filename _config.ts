import lume from "@lumeland/lume";
import lumeCms from "@lumeland/plugin-cms";
import cms from "./_cms.ts";

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

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

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

site.use(plugins(options))
  .use(lumeCms({ cms }));

export default site;
