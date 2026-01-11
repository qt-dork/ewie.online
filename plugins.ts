import date, { Options as DateOptions } from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import feed, { Options as FeedOptions } from "lume/plugins/feed.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import metas from "lume/plugins/metas.ts";
import pagefind, { Options as PagefindOptions } from "lume/plugins/pagefind.ts";
import remark, { Options as RemarkOptions } from "lume/plugins/remark.ts";
import robots from "lume/plugins/robots.ts";
import sitemap from "lume/plugins/sitemap.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";

import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

export interface Options {
  date?: DateOptions;
  feed?: FeedOptions;
  pagefind?: PagefindOptions;
  remark?: RemarkOptions;
}

export const defaults: Options = {
  date: {
    // Check https://date-fns-interactive.netlify.app/ for syntax
    // TODO: add link to date-fns docs
    formats: {
      "ISO": "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
      "TITLE": "iiii, MMMM d, y, ppp",
      "HUMAN": "MMMM d, y 'at' h:mm aaa",
    },
  },
  feed: {
    output: ["/feed.xml", "/feed.json", "/feed/feed.xml", "/feed/feed.json"],
    query: "type=post",
    sort: "date=desc",
    limit: 50,
    info: {
      title: "=metas.site",
      description: "=metas.description",
      authorName: "=author.displayName",
      authorUrl: "https://ewie.online", // TODO: remove hard reference to website
    },
    items: {
      title: "=title",
      // image: "=cover",
      authorName: "author.displayName",
      authorUrl: "https://ewie.online/", // TODO: remove hard reference to site
    },
  },
};

export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site
      .use(date(options.date))
      .use(esbuild())
      .use(lightningcss())
      .use(slugifyUrls())
      .use(metas())
      .use(feed(options.feed))
      // .use(fff())
      .use(pagefind(options.pagefind))
      .use(remark(options.remark))
      .use(robots())
      .use(sitemap());
  };
}
