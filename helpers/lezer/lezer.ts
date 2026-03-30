import { classHighlighter, highlightTree } from "npm:@lezer/highlight";

import type { Element, Root, Text } from "npm:hast";
import type { Tree } from "npm:@lezer/common";

export { toHtml } from "npm:hast-util-to-html";

export function fromLezer(source: string, tree: Tree): Root {
  const children: (Element | Text)[] = [];
  let index = 0;

  highlightTree(tree, classHighlighter, (from, to, classes) => {
    if (from > index) {
      children.push({ type: "text", value: source.slice(index, from) });
    }

    children.push({
      type: "element",
      tagName: "span",
      properties: { className: classes },
      children: [{ type: "text", value: source.slice(from, to) }],
    });

    index = to;
  });

  if (index < source.length) {
    children.push({ type: "text", value: source.slice(index) });
  }

  return { type: "root", children };
}
