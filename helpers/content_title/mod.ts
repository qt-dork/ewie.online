import { defaults as plainTextDefaults } from "@lumeland/plugin-plaintext";

import removeMd from "remove-markdown";

import type Site from "@lumeland/core/site.ts";

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

        const generated = removeMd(content as string, plainTextDefaults)
          .replaceAll(/\s+/g, " ")
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
