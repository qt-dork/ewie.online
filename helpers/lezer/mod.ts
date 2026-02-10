import { merge } from "lume/core/utils/object.ts";
import { readFile } from "lume/core/utils/read.ts";
import { insertContent } from "lume/core/utils/page_content.ts";
import { log } from "lume/core/utils/log.ts";

import type Site from "lume/core/site.ts";
import type { Page } from "lume/core/file.ts";

import type { LRParser } from "npm:@lezer/lr";

export type Parsers = Record<string, LRParser | MarkdownParser>;

import { parser as javascriptParser } from "npm:@lezer/javascript@^1.0.0";
import { parser as cssParser } from "npm:@lezer/css@^1.0.0";
import { parser as htmlParser } from "npm:@lezer/html@^1.0.0";
import {
  type MarkdownParser,
  parser as mdParser,
} from "npm:@lezer/markdown@^1.0.0";

import { fromLezer, toHtml } from "./lezer.ts";

export interface Options {
  /** The css selector to apply arborium */
  cssSelector?: string;

  parsers?: Parsers;

  // /**
  //  * The theme or themes to download
  //  * @see https://cdn.jsdelivr.net/npm/prismjs/themes/
  //  */
  // theme?: Theme | Theme[];
}

// interface Theme {
//   /** The name of the theme */
//   name: string;

//   /** The CSS file to output the font-face rules */
//   cssFile?: string;

//   /** A placeholder to replace with the generated CSS (only for cssFile) */
//   placeholder?: string;
// }

// Default options
export const defaults: Options = {
  cssSelector: "pre code",

  parsers: {
    javascript: javascriptParser,
    css: cssParser,
    html: htmlParser,
    md: mdParser,
  },
  // autoloadLanguages: false,
};

/**
 * A plugin to syntax-highlight code using Lezer library
 * @see https://lume.land/plugins/prism/
 */
export function lezer(userOptions?: Options) {
  const options = merge(defaults, userOptions);

  // if (options.autoloadLanguages) {
  //   initAutoload();
  // }

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

    // if (options.theme) {
    //   const themes = Array.isArray(options.theme)
    //     ? options.theme
    //     : [options.theme];

    // for (
    //   const { name, cssFile = site.options.cssFile, placeholder } of themes
    // ) {
    //   site.process(async () => {
    //     const cssCode = await readFile(getCssUrl(name));
    //     const page = await site.getOrCreatePage(cssFile);
    //     page.text = insertContent(page.text, cssCode, placeholder);
    //   });
    // }
    // }

    function lezer(page: Page) {
      page.document.querySelectorAll(options.cssSelector!)
        .forEach((element: Element) => {
          const lang = language(element);
          if (lang === null) {
            return;
          }
          if (options.parsers[lang] === undefined) {
            return;
          }
          const parser = options.parsers[lang];

          let fragment;

          try {
            const parsedTree = parser.parse(element.textContent);
            fragment = fromLezer(element.textContent, parsedTree);
            element.innerHTML = toHtml(fragment);
            log.info(`Successfully parsed ${page.sourcePath}`);
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
  // @ts-ignore: Just trust me bro
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

// function getCssUrl(name: string) {
//   if (name === "default" || name === "prism") {
//     return `${themesPath}prism.min.css`;
//   }

//   return `${themesPath}prism-${name}.min.css`;
// }
