import { rehypeStringify, unified } from "lume/deps/remark.ts";
import rehypeParse from "https://esm.sh/rehype-parse@9.0.1";

interface RehypeTruncateParameters {
  disable?: boolean;
  ellipses?: string;
  ignoreTags?: string[];
  maxChars: number;
}

// Taken straight from https://github.com/luk707/rehype-truncate/
function rehypeTruncate({
  disable = false,
  ellipses = "\u2026",
  ignoreTags = [],
  maxChars,
}: RehypeTruncateParameters) {
  return truncator;

  // deno-lint-ignore no-explicit-any
  function truncator(tree: any) {
    if (!disable) {
      truncateNode(tree);
    }
  }

  // deno-lint-ignore no-explicit-any
  function truncateNode(node: any, tf = 0) {
    let foundText = tf;

    if (node.type === "text") {
      foundText += node.value.length;
      if (foundText >= maxChars) {
        node.value = `${
          node.value.slice(
            0,
            node.value.length - (foundText - maxChars),
          ).trimEnd()
        }${ellipses}`;
        return maxChars;
      }
    }

    if (node.type === "root" || node.type === "element") {
      if (node.type === "element" && ignoreTags.includes(node.tagName)) {
        return foundText;
      }
      for (let i = 0; i < node.children.length; i++) {
        if (foundText === maxChars) {
          node.children.splice(i, 1);
          i--;
          continue;
        }
        foundText = truncateNode(node.children[i], foundText);
      }
    }

    return foundText;
  }
}

export default function truncate(
  value: string,
  ellipses = "\u2026",
): string {
  const engine = unified.unified();
  return (engine
    .use(rehypeParse)
    .use(rehypeTruncate, {
      maxChars: 1000,
      ignoreTags: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "style",
        "script",
        "figure",
        "figcaption",
        "img",
        "picture",
        "table",
        "thead",
        "tbody",
        "tr",
        "td",
        "video",
        "media-controller",
        "media-control-bar",
        "media-play-button",
        "media-mute-button",
        "media-volume-range",
        "media-time-range",
        "media-pip-button",
        "media-fullscreen-button",
      ],
      ellipses: ellipses,
    })
    .use(rehypeStringify)
    // slices off <html> stuff
    .processSync(value).toString().slice(25, -14).trim());
}
