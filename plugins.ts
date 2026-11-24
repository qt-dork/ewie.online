import contentDescription, { Options as ContentDescriptionOptions } from "./helpers/content_description/mod.ts";
import contentTitle, { Options as ContentTitleOptions } from "./helpers/content_title/mod.ts";
import date, { Options as DateOptions } from "@lumeland/plugin-date";
import esbuild from "@lumeland/plugin-esbuild";
import feed, { Options as FeedOptions } from "@lumeland/plugin-feed";
import hash from "./helpers/hash/mod.ts";
import lezer, { Options as LezerOptions } from "./helpers/lezer/mod.ts";
import lightningCSS from "@lumeland/plugin-lightningcss";
import metas from "@lumeland/plugin-metas";
import pagefind, { Options as PagefindOptions } from "@lumeland/plugin-pagefind";
import redirects from "@lumeland/plugin-redirects";
import reblogMarkers from "./helpers/reblog_markers/mod.ts";
import remark, { Options as RemarkOptions } from "@lumeland/plugin-remark";
import robots, { Options as RobotsOptions } from "@lumeland/plugin-robots";
import sitemap from "@lumeland/plugin-sitemap";
import slugifyUrls from "@lumeland/plugin-slugify-urls";
import stableUrls, { Options as StableUrlsOptions } from "./helpers/stable_urls/mod.ts";


import { merge } from "@lumeland/core/utils/object.ts";

import "@lumeland/core/types.ts";

export interface Options {
  content_description?: ContentDescriptionOptions,
  content_title?: ContentTitleOptions;
  date?: DateOptions;
  feed?: FeedOptions;
  lezer: LezerOptions; // TODO: Make optional
  pagefind?: PagefindOptions;
  remark?: RemarkOptions;
  robots?: RobotsOptions;
  stable_urls?: StableUrlsOptions;
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
      title: "=metas.title",
      description: "=metas.description",
      authorName: "Evie Finch",
      authorUrl: "https://ewie.online", // TODO: remove hard reference to site name
    },
    items: {
      title: "=title",
      // image: "=cover",
      authorName: "=author.displayName",
      authorUrl: "https://ewie.online", // TODO: remove hard reference to site
    },
  },
  lezer: {
    parsers: {},
  },
};

export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site
      .use(date(options.date))
      .use(esbuild())
      .use(lightningCSS())
      .use(slugifyUrls())
      .use(hash())
      .use(metas())
      .use(feed(options.feed))
      .use(pagefind(options.pagefind))
      .use(redirects())
      .use(reblogMarkers())
      .use(contentTitle(options.content_title))
      .use(contentDescription(options.content_description))
      .use(remark(options.remark))
      .use(lezer(options.lezer))
      .use(robots())
      .use(sitemap())
      .use(stableUrls(options.stable_urls))
  };
}
