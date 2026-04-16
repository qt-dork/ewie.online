import { Elena, html } from "npm:@elenajs/core@^1.0.0-rc.8";

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
export default class SocialMediaThreadedPost extends Elena(HTMLElement) {
  static tagName = "social-threaded-post";
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

SocialMediaThreadedPost.define();
