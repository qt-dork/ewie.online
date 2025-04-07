import lume from "lume/mod.ts";

import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import feed from "lume/plugins/feed.ts";
import fff from "lume/plugins/fff.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import remark from "lume/plugins/remark.ts";
import robots from "lume/plugins/robots.ts";
import sitemap from "lume/plugins/sitemap.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";

import truncate from "./helpers/truncate_html.ts";

const site = lume(
  {
    src: "./src",
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
    }
  }
});

site.filter(
  "trimToLineBreak",
  (value: string) => (value.split("\n---\n")[0].trimEnd()),
);

site.filter("truncate", truncate);

export default site;
