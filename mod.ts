import plugins, { Options } from "./plugins.ts";

import "lume/types.ts";

import type { Options } from "./plugins.ts";

export default function (options: Partial<Options> = {}) {
  return (site: Lume.Site) => {
    site.add("static", ".");
    site.add("styles");
    // TODO: Set up site to import from there instead
    // site.add("_include/css");
    site.add("assets/js");

    site.use(plugins(options));
  };
}
