import { classHighlighter, highlightTree } from "@lezer/highlight";

import type { Tree } from "@lezer/common";
import type { Element, Root, Text } from "hast";

export { toHtml } from "hast-util-to-html";

export function fromLezer(source: string, tree: Tree): Root {
  // deno-lint-ignore prefer-const -- children contents is modified
  let children: (Element | Text)[] = [];
  let index = 0;

  highlightTree(tree, classHighlighter, (from, to, classes) => {
    if (from > index) {
      children.push({ type: "text", value: source.slice(index, from) });
    }

    children.push({
      type: "element",
      tagName: "span",
      properties: { className: classes.split(" ") },
      children: [{ type: "text", value: source.slice(from, to) }],
    });

    index = to;
  });

  if (index < source.length) {
    children.push({ type: "text", value: source.slice(index) });
  }

  return { type: "root", children };
}
