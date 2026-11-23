import removeMd from "remove-markdown";
import { defaults as plainTextDefaults } from "@lumeland/plugin-plaintext";

import type Site from "@lumeland/core/site.ts";

export interface Options {
  type?: string;
}

export const defaults = {
  type: "post",
} satisfies Options;

/// If a post has no description, make one from the content. Strips out all the markdown and html to get only pure plain text.
export function contentDescription(userOptions?: Options) {
  const options = { ...defaults, ...userOptions };

  return (site: Site) => {
    site.preprocess([".md"], function processDescriptions(pages) {
      for (const page of pages) {
        const { type, description, content } = page.data;

        if (type !== options.type) {
          continue;
        }

        if (typeof description === "string" && description.trim() !== "") {
          continue;
        }

        if (typeof content !== "string") {
          continue;
        }

        page.data.description = removeMd(content, plainTextDefaults)
          .replaceAll(/\s+/g, " ")
          .trim();
      }
    });
  };
}

export default contentDescription;
