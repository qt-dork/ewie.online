import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";
import feed from "lume/plugins/feed.ts";
import fff from "lume/plugins/fff.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import remark from "lume/plugins/remark.ts";
import robots from "lume/plugins/robots.ts";
import sitemap from "lume/plugins/sitemap.ts";

// import cache_busting from "./plugins/cache_busting.ts";

import truncate from "./helpers/truncate_html.ts";

const site = lume(
  {
    src: "./src",
  },
);

site.copy("static", ".");
site.use(esbuild());
site.use(feed());
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
site.use(remark());
site.use(robots());
site.use(sitemap());
// site.use(cache_busting());

site.filter(
  "trimToLineBreak",
  (value: string) => (value.split("\n---\n")[0].trimEnd()),
);

site.filter("truncate", truncate);

export default site;
