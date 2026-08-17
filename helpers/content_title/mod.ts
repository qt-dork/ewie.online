import { plainText } from "lume/deps/remove-markdown.ts";
import { defaults as plainTextDefaults } from "lume/plugins/plaintext.ts";

import type Site from "lume/core/site.ts";

export interface Options {
  type?: string;
  maxLength?: number;
}

export const defaults = {
  type: "post",
  maxLength: 60,
} satisfies Options;

export function contentTitle(userOptions?: Options) {
  const options = { ...defaults, ...userOptions };

  return (site: Site) => {
    site.preprocess([".html"], (pages) => {
      for (const page of pages) {
        const { title, content_title, type, content } = page.data;

        if (
          type !== options.type || title || content_title ||
          typeof content !== "string"
        ) {
          continue;
        }

        const generated = plainText(content, plainTextDefaults)
          .replace(/\s+/g, " ")
          .trim()
          .substring(0, options.maxLength);

        if (generated) {
          page.data.content_title = generated;
        }
      }
    })
  }
}

export default contentTitle;
