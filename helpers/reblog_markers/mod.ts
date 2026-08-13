import type Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";

import { extractMarkers } from "./parse_markers/mod.ts";

export interface Options {
  // TODO: (sorry)
}

export const defaults = {
  // TODO: (sorry)
} satisfies Options;

export function reblogMarkers(userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.preprocess([".md"], function processReblogs(pages) {
      for (const page of pages) {
        const content = page.data.content;
        if (content === undefined || content === null) {
          continue;
        }
        const markers = extractMarkers(content as string);
        if (markers.markers.length === 0) {
          continue;
        }

        page.data.reblogs = markers.markers.map((marker) => {
          return {
            ...marker.data,
            content: marker.value,
          };
        });

        page.data.content = markers.postBody;
      }
    });
  }
}

export default reblogMarkers;
