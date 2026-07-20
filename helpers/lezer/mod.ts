import { merge } from "lume/core/utils/object.ts";
import { log } from "lume/core/utils/log.ts";

import type Site from "lume/core/site.ts";
import type { Page } from "lume/core/file.ts";

import type { LRParser } from "npm:@lezer/lr@1.4.10";

import { fromLezer, toHtml } from "./lezer.ts";

export interface Options {
  /** The css selector to apply Lezer */
  cssSelector?: string;

  parsers: Parsers;

  // theme?: Theme | Theme[];
}

type Parsers = Record<string, unknown>;

// Defaults
export const defaults: Options = {
  cssSelector: "pre code",

  parsers: {},
};

/**
 * A plugin to syntax-highlight code using the Lezer library
 * @see https://lume.land/plugins/prism/
 */
export function lezer(userOptions: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    if (site._data.codeHighlight) {
      log.error(
        `[lezer plugin] The plugin "${site._data.codeHighlight}" is already registered for the same purpose as "lezer". Registering "lezer" may lead to conflicts and unpredictable behavior.`,
      );
    }
    site._data.codeHighlight = "lezer";

    site.process([".html"], function processLezer(pages) {
      for (const page of pages) {
        lezer(page);
      }
    });

    function lezer(page: Page) {
      page.document.querySelectorAll(options.cssSelector)
        .forEach((element: Element) => {
          const lang = language(element);
          if (lang === null) {
            return;
          }
          if (options.parsers[lang] === undefined) {
            return;
          }
          const parser = options.parsers[lang] as LRParser;

          let fragment;

          try {
            const parsedTree = parser.parse(element.textContent);
            fragment = fromLezer(element.textContent, parsedTree);
            element.innerHTML = toHtml(fragment);
            log.info(`Successfully parsed code blocks in ${page.sourcePath}`);
          } catch (err) {
            log.error(
              `Error highlighting code block in ${page.sourcePath}: ${err}`,
            );
          }
        });
    }
  };
}

export default lezer;

function language(element: Element): string | null {
  const datasetLang = element.getAttribute("data-lang");
  if (datasetLang) {
    return datasetLang;
  }
  const classLang = element.className.replace("language-", "");
  if (classLang !== "") {
    return classLang;
  }
  return null;
}
