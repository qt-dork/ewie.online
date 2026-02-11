import { merge } from "lume/core/utils/object.ts";
import { readFile } from "lume/core/utils/read.ts";
import { insertContent } from "lume/core/utils/page_content.ts";
import { log } from "lume/core/utils/log.ts";

import {
  detectLanguage,
  highlight,
  loadGrammar,
  registerGrammar,
  ResolveArgs,
} from "@arborium/arborium";

import { readFile as nodeReadFile } from "node:fs/promises";

import * as htmlGrammar from "https://cdn.jsdelivr.net/npm/@arborium/html@2.13.0";
import * as cssGrammar from "https://cdn.jsdelivr.net/npm/@arborium/css@2.13.0";

import type Site from "lume/core/site.ts";
import type { Page } from "lume/core/file.ts";

export interface Options {
  /** The css selector to apply arborium */
  cssSelector?: string;

  /**
   * Whether to autoload languages when necessary.
   * If true, the autoloader plugin will be used and it will automatically load the
   * languages used in the page when they are not already loaded.
   */
  autoloadLanguages?: boolean;

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
  autoloadLanguages: false,
};

let languages: Record<string, unknown> = {
  html: htmlGrammar,
  css: cssGrammar,
};

const wasm: Record<string, unknown> = {
  html: await nodeReadFile("./helpers/arborium/html_grammar_bg.wasm"),
  css: await nodeReadFile("./helpers/arborium/css_grammar_bg.wasm"),
};

// window ;

/**
 * A plugin to syntax-highlight code using Arborium library
 * @see https://lume.land/plugins/prism/
 */
export function arborium(userOptions?: Options) {
  const options = merge(defaults, userOptions);

  // if (options.autoloadLanguages) {
  //   initAutoload();
  // }

  return (site: Site) => {
    if (site._data.codeHighlight) {
      log.error(
        `[arborium plugin] The plugin "${site._data.codeHighlight}" is already registered for the same purpose as "arborium". Registering "arborium" may lead to conflicts and unpredictable behavior.`,
      );
    }
    site._data.codeHighlight = "arborium";

    site.process([".html"], function processArborium(pages) {
      for (const page of pages) {
        arborium(page);
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

    function arborium(page: Page) {
      page.document.querySelectorAll(options.cssSelector!)
        .forEach(async (element: Element) => {
          const lang = language(element);
          if (lang === null) {
            return;
          }
          try {
            const grammar = await registerGrammar(
              languages[lang],
              wasm[lang] as any,
              {
                resolveJs: () => {
                  return import(`npm:@arborium/${language}`);
                },
              },
            );
            const highlighted = await grammar.highlight(lang);
            element.innerHTML = highlighted;
            log.info(highlighted);
          } catch (err) {
            log.error(
              `Error highlighting code block in ${page.sourcePath}: ${err}`,
            );
          }
        });
    }
  };
}

export default arborium;

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
  return detectLanguage(element.textContent);
}

// function getCssUrl(name: string) {
//   if (name === "default" || name === "prism") {
//     return `${themesPath}prism.min.css`;
//   }

//   return `${themesPath}prism-${name}.min.css`;
// }
