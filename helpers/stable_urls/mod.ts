import { merge } from "lume/core/utils/object.ts";
import { log } from "lume/core/utils/log.ts";
import { matchExtension, type Extensions } from "lume/core/utils/path.ts";

import type Site from "lume/core/site.ts";

export interface Options {
  /** Path to the JSON snapshot of urls that need to remain stable. */
  file?: string;
  /** Crash if stable URLs are missing (default true). */
  throw?: boolean;
  /** File extensions to track (default [".html"]). */
  extensions?: Extensions;
  /** URLs to ignore. */
  ignore?: string[];
  /** Strict mode will consider redirected URLs to be broken. Off by default. */
  strict?: boolean;
}

export const defaults = {
  file: "./_stable-urls.json",
  throw: true,
  extensions: [".html"],
  ignore: [],
  strict: false,
} satisfies Options;

type PageLike = {
  outputPath: string;
  isCopy: boolean;
  data: { oldUrl?: string | string[] };
}

export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    if (Array.isArray(options.extensions)) {
      options.extensions.forEach((extension) => {
        if (extension.charAt(0) !== ".") {
          throw new Error(
            `Invalid extension ${extension}. It must start with '.'`
          )
        }
      })
    }
    site.options.watcher.ignore.push(options.file);

    function getUrls(pages: PageLike[]): string[] {
      return pages
        .filter((page) => !page.isCopy)
        .map((page) => page.outputPath)
        .filter((url) => matchExtension(options.extensions, url))
        .filter((url) => !options.ignore.includes(url))
        .sort();
    }

    function getRedirects(pages: PageLike[]): Set<string> {
      const redirects = new Set<string>();
      if (options.strict) {
        return redirects;
      }

      for (const page of pages) {
        const oldUrl = page.data.oldUrl;
        if (!oldUrl) {
          continue;
        }
        const list = Array.isArray(oldUrl) ? oldUrl : [oldUrl];
        for (const url of list) {
          redirects.add(url.endsWith("/") ? url + "index.html" : url);
        }
      }

      return redirects;
    }

    function getBaseline(urls: string[], redirects: Set<string>): string[] {
      return [...new Set([...urls, ...redirects])].sort();
    }

    function saveUrls(urls: string[]): void {
      Deno.writeTextFileSync(options.file, JSON.stringify(urls, null, 2) + "\n");
    }

    function checkUrls({ pages }: { pages: PageLike[] }): void {
      const urls = getUrls(pages);
      const current = new Set(urls);
      const redirects = getRedirects(pages);

      let previous: string[] = [];
      try {
        previous = JSON.parse(Deno.readTextFileSync(options.file));
      } catch {
        // No snapshot. Save one
        saveUrls(getBaseline(urls, redirects));
        log.info(`[stable_urls] Created ${options.file} (${urls.length} URLs). Please commit this file.`);
        return;
      }

      const missing = previous.filter((url) => !current.has(url) && !redirects.has(url));

      if (missing.length > 0) {
        const message =
          `[stable_urls] ${missing.length} previously published URL(s) have been removed or changed:\n` +
          missing.map((url) => `  - ${url}`).join("\n") +
          `\nIf this change is intentional, you may set it up as a redirect with the "redircts" plugin. ` +
          `Otherwise, you can delete ${options.file} and rebuild to update ` +
          `the list, then verify with "git diff", and finally commit it.`;

        if (options.throw) {
          throw new Error(message);
        }
        log.warn(message);
        return;
      }

      const baseline = getBaseline(urls, redirects);
      if (baseline.join("\n") !== previous.join("\n")) {
        saveUrls(baseline);
        log.info(`[stable_urls] Updated ${options.file} (+${baseline.length - previous.length} URL(s)). Please commit this change.`);
      } else {
        log.info(`[stable_urls] All ${baseline.length} URLs are stable.`);
      }
    }

    site.addEventListener("afterBuild", checkUrls);
  };
}
