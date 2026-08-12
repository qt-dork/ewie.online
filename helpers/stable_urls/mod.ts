import { merge } from "lume/core/utils/object.ts";
import { log } from "lume/core/utils/log.ts";

import type Site from "lume/core/site.ts";
import { Option } from "lume/cms/types.ts";

export interface Options {
  file?: string;

  throw?: boolean;

  ignore?: string[];
}

export const defaults = {
  file: "./_stable-urls.json",
  throw: true,
  ignore: [],
} satisfies Options;

export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.options.watcher.ignore.push(options.file);

    function getUrls(pages: { outputPath: string }[]): string[] {
      return pages
        .map((page) => page.outputPath)
        .filter((url) => !options.ignore.includes(url))
        .sort();
    }

    function saveUrls(urls: string[]): void {
      Deno.writeTextFileSync(options.file, JSON.stringify(urls, null, 2) + "\n");
    }

    function checkUrls({ pages }: { pages: { outputPath: string}[] }): void {
      const urls = getUrls(pages);
      const current = new Set(urls);

      let previous: string[] = [];
      try {
        previous = JSON.parse(Deno.readTextFileSync(options.file));
      } catch {
        // No snapshot. Save one
        saveUrls(urls);
        log.info(`[stable_urls plugin] Created ${options.file} (${urls.length} URLs). Please commit this file.`);
        return;
      }

      const missing = previous.filter((url) => !current.has(url));

      if (missing.length > 0) {
        const message =
          `[stable_urls plugin] ${missing.length} previously published URL(s) have been removed or changed:\n` +
          missing.map((url) => `  - ${url}`).join("\n") +
          `\nIf this change is intentional, please delete ${options.file} and rebuild to update ` +
          `the list, then you can verify with "git diff", and then commit it.`;

        if (options.throw) {
          throw new Error(message);
        }
        log.warn(message);
        return;
      }

      if (urls.join("\n") !== previous.join("\n")) {
        saveUrls(urls);
        log.info(`[stable_urls plugin] Updated ${options.file} (${urls.length} URLs). Please commit this change.`);
      } else {
        log.info(`[stable_urls plugin] All ${urls.length} URLs are stable.`);
      }
    }

    site.addEventListener("afterBuild", checkUrls);
  };
}
