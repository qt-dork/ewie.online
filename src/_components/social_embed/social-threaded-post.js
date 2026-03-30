import { css, html, LitElement } from "npm:lit@^3.0.0";

/**
 * <social-threaded-post>
 *
 * @summary A threaded post. Intended to show the post (or posts) that the main post is replying to. Can be followed by a `<social-threaded>`, `<social-collapse-conversation>`, or `<social-main>`.
 *
 * @slot - The body of the post. Can contain any HTML, including a `<social-link-card>`, `<social-media-scroller>`, or `<social-embed>` element.
 * @slot avatar - An `<img>` (or other image) linking to the profile picture.
 * @slot name - The name of the account making the post.
 * @slot handle - The @handle of the account making the post.
 * @slot time - The timestamp of the post.
 * @slot [icon] - An `<a>` linking to the post. Must include a `data-source` of either "mastodon", "bluesky", or "twitter".
 *
 * @cssproperty --color-subtle - The text color of subtle text elements.
 * @cssproperty --color-border - The color of the connecting line.
 */
export class SocialMediaThreadedPost extends LitElement {
  static styles = css`
    .post {
      display: grid;
      column-gap: 1rem;
      grid-template-columns: 36px minmax(0, 1fr);
      grid-template-rows: 21px 19px max-content;
      grid-template-areas: "avatar header" "avatar body" "line body";
    }

    .avatar {
      grid-area: avatar;
      padding-block-start: 4px;
    }

    .header {
      grid-area: header;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 4px;

      & > span {
        height: 1.2em;
        align-self: start;
      }
    }

    .header .name {
      font-weight: bold;
    }

    .header .subtle {
      color: var(--color-subtle);
    }

    .header .metadata {
      white-space: nowrap;
    }

    .metadata {
      line-height: 1.2;
    }

    * {
      margin: 0;
    }

    .body {
      font-size: 16px;
      grid-area: body;
    }

    .line {
      grid-area: line;
      overflow: visible;
      margin-block-start: 4px;
      margin-inline-start: 1px;
      color: var(--color-border);
      height: 100%;
    }

    .line > * {
      position: relative;

      height: calc(100% + 4px);
      color: var(--color-border);
    }

    .overflow-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ::slotted(*) {
      margin: unset;
    }

    slot[name="icon"] {
      margin-inline-end: auto;

      &:has(::slotted([data-source="mastodon"])) {
        background-image: url("/mastodon.svg");
      }
    }
  `;
  render() {
    return html`
      <article class="post">
        <div class="avatar"><slot name="avatar"></slot></div>
        <div class="header">
          <span class="metadata name overflow-ellipsis">
            <slot
              name="name"
            ></slot>
          </span>
          <span class="metadata subtle overflow-ellipsis">
            <slot
              name="handle"
            ></slot>
          </span>
          <span class="subtle">·</span>
          <span class="metadata subtle"><slot name="time"></slot></span>
          <slot name="icon"></slot>
        </div>
        <div class="body"><slot></slot></div>

        <svg
          class="line"
          width="21"
          height="2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            class="svg-line"
            x="15"
            y="0"
            width="2"
            height="100%"
            rx="1"
            fill="currentColor"
          />
        </svg>
      </article>
    `;
  }
}
