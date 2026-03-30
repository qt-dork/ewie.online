import type { Marker, Paragraph, Root, Text } from "./types.ts";
import type { ParserPos, ParserState } from "./types.ts";

import { parse as parseYaml } from "jsr:@std/yaml@1.0.11";

export function parse(s: string): Root {
  let tree: Root = { type: "root", children: [] };
  let state: ParserState = {
    input: s,
    pos: {
      i: 0,
      row: 1,
      col: 1,
    },
  };
  // shallow copy lol
  let pos = state.pos;

  while (inRange(state)) {
    // REQUIRED: All branches consume until end of block
    if (state.pos.col !== 1) {
      consume(state);
      continue;
    }

    const cur = s[pos.i];
    if (cur === "{") {
      const start = structuredClone(state.pos);
      const metadataList = parseMetadata(state);
      if (metadataList === undefined) {
        // repair state, must be text
        state.pos = structuredClone(start);
        consumeParagraph(state);
        continue;
      }
      const metadata = metadataList.map((
        data,
      ) => (parseMetadataContents(data) as object))
        .reduce(
          (accum, cur) => {
            return { ...accum, ...cur };
          },
        );

      const marker = consumeMarker(state);
      if (marker === undefined) {
        // repair state. must be text
        state.pos = structuredClone(start);
        consumeParagraph(state);
        continue;
      }
      marker.position!.start = {
        line: start.row,
        column: start.col,
        offset: start.i,
      };
      marker.data = metadata;
      tree.children.push(marker);
    } else if (cur === "`") {
      const start = structuredClone(state.pos);
      const out = consumeCode(state);
      if (out === undefined) {
        state.pos = structuredClone(start);
        consumeParagraph(state);
      }
    } else {
      consumeParagraph(state);
    }
  }

  return tree;
}

function consume(state: ParserState): void {
  if (state.input[state.pos.i] === "\n") {
    state.pos.row += 1;
    state.pos.col = 1;
  } else {
    state.pos.col += 1;
  }
  state.pos.i += 1;
}

function peek(state: ParserState, offset: number = 1): string | undefined {
  return state.input[state.pos.i + offset];
}

function inRange(state: ParserState): boolean {
  return state.pos.i < state.input.length;
}

function consumeUntil(state: ParserState, char: string): number | undefined {
  while (inRange(state) && state.input[state.pos.i] !== char) {
    consume(state);
  }
  if (state.input[state.pos.i]) {
    return state.pos.i;
  } else {
    return undefined;
  }
}

function consumeWhitespace(state: ParserState): void {
  while (inRange(state) && /\s/.test(state.input[state.pos.i])) {
    consume(state);
  }
}

export function consumeParagraph(state: ParserState): Paragraph {
  let node: Paragraph = {
    type: "paragraph",
    children: [],
  };
  const start = structuredClone(state.pos);

  const text = nodeText(state);

  node.children.push(text);

  node.position = {
    start: {
      line: start.row,
      column: start.col,
      offset: start.i,
    },
    end: {
      line: state.pos.row,
      column: state.pos.col,
      offset: state.pos.i,
    },
  };

  // move to start of next block
  consumeWhitespace(state);

  return node;
}

/// mutates state
function nodeText(state: ParserState): Text {
  let node: Text = {
    type: "text",
    value: "",
  };
  const textStart = structuredClone(state.pos);
  while (inRange(state)) {
    const start = structuredClone(state.pos);
    const end = consumeUntil(state, "\n");
    node.value = node.value + state.input.substring(start.i, end) + "\n";
    consume(state);

    if (isEndOfBlock(state)) {
      break;
    }
  }
  // new block
  node.position = {
    start: {
      line: textStart.row,
      column: textStart.col,
      offset: textStart.i,
    },
    end: {
      line: state.pos.row,
      column: state.pos.col,
      offset: state.pos.i,
    },
  };
  return node;
}

/// returns undefined if text
export function parseMetadata(state: ParserState): string[] | undefined {
  let metadataList: string[] = [];
  const start = structuredClone(state.pos);

  const consumeThenCheckIfText = (state: ParserState) => {
    const end = consumeUntil(state, "}");
    if (end == undefined) {
      return undefined;
    }
    return end;
  };
  // There's only 3 possible states after gobbling the block attribute section:
  // 1. There's another block attribute on the next line, which should also be parsed.
  // 2. The marker is on the next line, which means we're done with metadata.
  // 3. None of the above and this is actually some fucked up text.
  let newStart: number | undefined = undefined;
  let end = consumeThenCheckIfText(state);
  while (inRange(state)) {
    if (end == undefined) {
      // case 3
      return undefined;
    } else {
      const restOfString = state.input.substring(end);
      if (/^\}[\t\f\v ]*?\r?\n\{/.test(restOfString)) {
        // case 1
        consume(state); // skip close brace
        metadataList.push(state.input.substring(newStart ?? start.i, end + 1));
        consumeWhitespace(state);
        newStart = state.pos.i;
        end = consumeThenCheckIfText(state);
        continue;
      } else if (/^}[\t\f\v ]*?\r?\n::::*/.test(restOfString)) {
        // case 2
        consume(state); // skip close brace
        metadataList.push(state.input.substring(newStart ?? start.i, end + 1));
        consumeWhitespace(state);
        return metadataList;
      } else {
        // case 3
        return undefined;
      }
    }
  }
  // end of string this is case 3
  return undefined;
}

/// if you are at a newline and followed by a blank line, or eof, return true.
function isEndOfBlock(state: ParserState): boolean {
  const restOfString = state.input.substring(state.pos.i);
  return /^\r?\n[\t\f\v ]*\r?\n*?/.test(restOfString) ||
    restOfString.length === 0;
}

export function consumeCode(state: ParserState) {
  consumeUntil(state, "\n");
  const fenceLength = state.pos.col;
  while (inRange(state)) {
    if (state.pos.col === 1) {
      const rest = state.input.substring(state.pos.i);
      if (!/^````*/.test(rest)) {
        consume(state);
        continue;
      } else {
        consumeUntil(state, "\n");
        if (state.pos.col !== fenceLength) {
          continue;
        }
        consume(state);
        return state.pos.i;
      }
    } else {
      consume(state);
    }
  }
  return undefined;
}

export function consumeMarker(state: ParserState): Marker | undefined {
  let marker: Marker = {
    type: "marker",
    value: "",
  };
  let fenceLength = 3;
  if (/::::* \w[\w-_]*\s+/.test(state.input.substring(state.pos.i))) {
    // capture label
    consumeUntil(state, " ");
    fenceLength = state.pos.col;
    // gobble label space
    consume(state);
    const labelStart = state.pos.i;
    consumeUntil(state, "\n");
    const label = state.input.substring(labelStart, state.pos.i);
    marker.label = label;
  } else {
    consumeUntil(state, "\n");
    fenceLength = state.pos.col;
  }

  consumeWhitespace(state);
  // position should be the line after the ::: fence
  const contentsStart = state.pos.i;
  let contentsEnd: number;
  while (inRange(state)) {
    if (state.pos.col === 1) {
      const rest = state.input.substring(state.pos.i);
      if (/^````*/.test(rest)) {
        // we've entered a code block
        const start = structuredClone(state.pos);
        const endPos = consumeCode(state);
        if (endPos === undefined) {
          state.pos = start;
          consume(state);
          continue;
        }
      } else if (/^::::*/.test(rest)) {
        contentsEnd = state.pos.i;
        consumeUntil(state, "\n");
        if (state.pos.col !== fenceLength) {
          continue;
        }
        consume(state);
        marker.value = state.input.substring(contentsStart, contentsEnd!);
        marker.position = {
          // bogus data
          start: {
            line: 0,
            column: 0,
          },
          end: {
            line: state.pos.row,
            column: state.pos.col,
            offset: state.pos.i,
          },
        };

        consumeWhitespace(state);
        return marker;
      } else {
        consume(state);
      }
    } else {
      consume(state);
    }
  }
  return undefined;
}

export function parseMetadataContents(s: string) {
  const body = s.substring(1, s.length - 2);
  return parseYaml(body);
}

export function deleteMarkers(s: string, tree: Root): string {
  let out = "";

  let currentStart = 0;
  for (const marker of tree.children) {
    out = out + s.substring(currentStart, marker.position?.start.offset);
    currentStart = marker.position!.end.offset!;
  }
  out = out + s.substring(currentStart);
  return out;
}

export function extractMarkers(input: string) {
  const tree = parse(input);
  const newBody = deleteMarkers(input, tree);

  return {
    markers: tree.children as Marker[],
    postBody: newBody,
  };
}
