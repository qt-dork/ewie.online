export interface Node {
  type: string;
  data?: Data;
  position?: Position;
}

interface Data {}

export interface Position {
  start: Point;
  end: Point;
}

export interface Point {
  /// number >= 1
  line: number;
  /// number >= 1
  column: number;
  /// number >= 0?
  offset?: number;
}

export interface Parent extends Node {
  children: RootContent[];
}

export interface Literal extends Node {
  value: string;
}

export interface Root extends Parent {
  type: "root";
}

export interface Code extends Literal {
  type: "code";
}

export interface Paragraph extends Parent {
  type: "paragraph";
  children: Text[];
}

export interface Text extends Literal {
  type: "text";
}

/**
 * Syntax:
 *
 * ```
 * {meta: "data"}
 * :::
 * content
 * :::
 * ```
 */
export interface Marker extends Literal {
  type: "marker";
  label?: string;
  data?: any;
}

export interface BlockContentMap {
  marker: Marker;
  code: Code;
  paragraph: Paragraph;
}

export type BlockContent = BlockContentMap[keyof BlockContentMap];

export type PhrasingContent = Text;

export interface RootContentMap {
  marker: Marker;
  code: Code;
  paragraph: Paragraph;
  text: Text;
}

export type RootContent = RootContentMap[keyof RootContentMap];

export type Nodes = Root | RootContent;

export type ParserPos = {
  i: number;
  row: number;
  col: number;
};

export type ParserState = {
  input: string;
  pos: ParserPos;
};
