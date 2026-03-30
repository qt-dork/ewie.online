import { css, html, LitElement } from "npm:lit@^3.0.0";

/**
 * <social-main-post>
 *
 * @summary The main post.
 *
 * @slot - The body of the post. Can contain any HTML, including a `<social-link-card>`, `<social-media-scroller>`, or `<social-embed>` element.
 * @slot avatar - An `<img>` (or other image) linking to the profile picture.
 * @slot name - The name of the account making the post.
 * @slot handle - The @handle of the account making the post.
 * @slot time - The timestamp of the post.
 * @slot [icon] - An `<a>` linking to the post. Must include a `data-source` of either "mastodon", "bluesky", or "twitter".
 *
 * @cssproperty --color-subtle - The text color of subtle text elements.
 */
export class SocialMediaMainPost extends LitElement {
  static properties = {
    _dataSource: {
      state: true,
    },
  };

  static styles = css`
    .post {
      display: grid;
      grid-template-columns: 48px minmax(0, 1fr);
      grid-template-rows: 36px 0 max-content max-content;
      grid-template-areas:
        "avatar header" "body body" "body body" "footer footer";
      /* deno-fmt-ignore */
    }

    .avatar {
      grid-area: avatar;
      padding-block-start: 4px;
    }

    .header {
      grid-area: header;

      width: 100%;

      display: grid;
      grid-template-rows: 16px 16px;
      grid-template-columns: 1fr;
      grid-template-areas: "name" "handle";

      gap: 4px;

      .icon[data-visible="invisible"] {
        display: none;
      }

      &:has(.icon[data-visible="visible"]) {
        grid-template-columns: 1fr 24px;
        /* deno-fmt-ignore */
        grid-template-areas: "name icon" "handle icon";
        import { css, html, LitElement } from "npm:lit@^3.0.0";
        /* deno-fmt-ignore */
      }

      & > span {
        height: 1.2em;
        align-self: start;
      }
    }

    .header, .footer {
      font-size: 16px;
    }

    .header .name {
      font-weight: bold;
    }

    span:has(> [name="name"]) {
      grid-area: name;
    }

    span:has(> [name="handle"]) {
      grid-area: handle;
    }

    .subtle {
      color: var(--color-subtle);
    }

    .metadata {
      white-space: nowrap;
      line-height: 1.2;
      align-content: center;
    }

    * {
      margin: 0;
    }

    .body {
      margin-block-start: 8px;
      font-size: 18px;
      grid-area: body;
    }

    .footer {
      grid-area: footer;
    }

    ::slotted(time) {
      display: block;
      margin-block-start: 8px;
    }

    ::slotted(*) {
      margin: unset;
    }

    .overflow-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon {
      grid-area: icon;
      width: 100%;
      aspect-ratio: 1;
      display: grid;
      grid-template-areas: "a";
      color: var(--color-subtle);

      & > * {
        grid-area: a;
      }

      svg {
        fill: currentColor;
      }

      slot {
        display: grid;
        place-content: center;
      }

      slot::slotted(a) {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        opacity: 0;
        transform: scale(1.5);
      }
    }

    svg[data-visible="visible"] {
      display: unset;
    }

    svg[data-visible="invisible"] {
      display: none;
    }
  `;

  firstUpdated() {
    const socials = ["mastodon", "bluesky", "twitter"];
    const dataSources = socials.map((social) => {
      const hasSocial =
        this.querySelector(`[slot="icon"][data-source="${social}"]`) !==
            null
          ? true
          : false;
      return {
        social: social,
        exists: hasSocial,
      };
    });
    const exists = dataSources.find((data) => (data.exists));
    this._dataSource = exists !== undefined ? exists.social : "";
  }

  render() {
    return html`
      <div class="post">
        <div class="avatar"><slot name="avatar"></slot></div>
        <div class="header">
          <span class="metadata name overflow-ellipsis">
            <slot name="name"></slot>
          </span>
          <span class="metadata subtle overflow-ellipsis">
            <slot name="handle"></slot>
          </span>
          <div data-visible="${this._dataSource !== ""
            ? "visible"
            : "invisible"}" class="icon">
            <slot name="icon"></slot>

            <svg
              data-visible="${this._dataSource === "mastodon"
                ? "visible"
                : "invisible"}"
              data-source="mastodon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                fill="currentColor"
                d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54-.6-4.6-.9-9.3-.9-13.9 85.6 20.9 158.7 9.1 178.7 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zM357.9 304.3l-46.6 0 0-114.2c0-49.7-64-51.6-64 6.9l0 62.5-46.3 0 0-62.5c0-58.5-64-56.6-64-6.9l0 114.2-46.7 0c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175l0 0z"
              />
            </svg>
            <svg
              data-visible="${this._dataSource === "bluesky"
                ? "visible"
                : "invisible"}"
              data-source="bluesky"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                fill="currentColor"
                d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z"
              />
            </svg>
          </div>
        </div>

        <div class="body">
          <slot></slot>
        </div>

        <slot class="metadata footer subtle" name="time"></slot>
      </div>
    `;
  }
}
