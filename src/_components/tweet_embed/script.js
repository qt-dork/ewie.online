import { css, html, LitElement } from "npm:lit";

class TweetEmbed extends LitElement {
  static styles = css`
    :host {
      display: block;
      
      background-color: var(--color-bg-post);
      border: 1px solid var(--color-border);

      margin-block: 1rem;
      padding: 16px;
      border-radius: 16px;
    }
  `;

  render() {
    return html`
      <slot></slot>
    `;
  }
}

class SharedTweet extends LitElement {
  static styles = css`

    .post {
      display: grid;
      column-gap:1rem;
      grid-template-columns: 36px minmax(0, 1fr);
      grid-template-rows: 21px 19px max-content;
      grid-template-areas:
        "avatar header"
        "avatar body"
        "line body";
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
          background-image: url('/mastodon.svg');
        }
      }
    `;
    render() {
      return html`
        <article class="post">
          <div class="avatar"><slot name="avatar"></slot></div>
          <div class="header">
            <span class="metadata name overflow-ellipsis"><slot name="name"></slot></span>
            <span class="metadata subtle overflow-ellipsis"><slot name="handle"></slot></span>
            <span class="subtle">·</span>
            <span class="metadata subtle">
              <slot name="time">
            </span>
            <slot name="icon"></slot>
          </div>

          <div class="body">
            <slot></slot>
          </div>
          <svg class="line" width="21" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect class="svg-line" x="15" y="0" width="2" height="100%" rx="1" fill="currentColor"/>
          </svg>
        </article>
    `;
  }
}

class MainTweet extends LitElement {
  static properties = {
    _dataSource: {
      state: true,
    },
  };
  
  static styles = css`

    .post {
      /* background-color: var(--color-bg-post); */
      /* border: 1px solid var(--color-border); */

      /* margin-block: 1rem; */
      /* padding: 16px; */
      /* border-radius: 16px; */

      display: grid;
      grid-template-columns: 48px minmax(0, 1fr);
      grid-template-rows: 36px 0 max-content max-content;
      grid-template-areas:
        "avatar header"
        "body body"
        "body body"
        "footer footer";
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
        grid-template-areas: 
          "name" "handle";
        
        gap: 4px;

        .icon[data-visible="invisible"] {
          display: none;
        }

        &:has(.icon[data-visible="visible"]) {
          grid-template-columns: 1fr 24px;
          grid-template-areas:
            "name icon"
            "handle icon";
        }

        & > span {
          height: 1.2em;
          align-self: center;
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
        const hasSocial = this.querySelector(`[slot="icon"][data-source="${social}"]`) !== null ? true : false;
        return {
          social: social,
          exists: hasSocial
        }
      });
      const exists = dataSources.find((data) => (data.exists));
      this._dataSource = exists !== undefined ? exists.social : "";
    }

   
    render() {
      return html`
        <div class="post">
          <div class="avatar"><slot name="avatar"></slot></div>
          <div class="header">
            <span class="metadata name overflow-ellipsis"><slot
              name="name"
            ></slot></span>
            <span class="metadata subtle overflow-ellipsis">
              <slot name="handle"></slot>
            </span>
            <div data-visible="${this._dataSource !== "" ? "visible" : "invisible"}" class="icon">
              <slot name="icon"></slot>

              <svg data-visible="${this._dataSource === "mastodon" ? "visible" : "invisible"}" data-source="mastodon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="currentColor" d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54-.6-4.6-.9-9.3-.9-13.9 85.6 20.9 158.7 9.1 178.7 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zM357.9 304.3l-46.6 0 0-114.2c0-49.7-64-51.6-64 6.9l0 62.5-46.3 0 0-62.5c0-58.5-64-56.6-64-6.9l0 114.2-46.7 0c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175l0 0z"/></svg>
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

class MediaContainer extends LitElement {
  static styles = css`
    .image-wrapper {
      display: flex;
      overflow: scroll;
      gap: 4px;
    }
  `;
  render() {
    return html`
      <div class="image-wrapper">
      <slot></slot>
      </div>
    `;
  }
  
}

class ExpandableTweet extends LitElement {
  static styles = css`
    .divider {
      display: grid;
      column-gap:1rem;
      grid-template-columns: 36px minmax(0, 1fr);
      grid-template-areas:
        "line body";
    }

    .notice {
      font-size: 16px;
      align-self: center;
    }

    details summary {
      list-style: none;
      height: 2rem;
      margin-block-end: 2px;
      padding-block: 4px;

      cursor: pointer;
    }
    details summary::-webkit-details-marker,
    details summary::marker {
      display: none;
    }

    .line {
      margin-block-start: 2px;
      margin-inline-start: 1px;
      width: 21px;

      height: calc(100% + 8px);
      color: var(--color-border);

      .svg-line {
        height: calc(100% - 24px);
      }
    }

    .expanded {
      display: none;
    }

    details[open] {

      .collapsed {
        display: none;
      }

      .expanded {
        display: unset;
      }

      .svg-swirl {
        display: none;
      }

      .svg-line {
        height: calc(100% - 2px);
      }
    }

    .notice-wrapper {
      display: flex;
    }

    :host {
      --reply-to-faded-color: light-dark(rgba(255,166,0,.12549), rgba(255,166,0,.0902));
      --reply-to-color: orange;
      --reply-to-text-color: light-dark(#b36200, orange);
    }

    .notice {
      padding: 4px;
      border: 1px solid var(--reply-to-color);
      border-radius: 4px;
      color: var(--reply-to-text-color);
      background-image: repeating-linear-gradient(-70deg,transparent,transparent 3px,var(--reply-to-faded-color) 3px,var(--reply-to-faded-color) 4px);
    }
  `;
  
  render() {
    return html`
      <details>
        <summary>
          <div class="divider">
            <svg class="line" width="21" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- I stole this from a codepen and I have no idea how to use only the path or any of that. svgs are black magic to me -->
              <symbol id="swirl" width="21" height="25" viewBox="0 0 21 25" preserveAspectRatio="xMidYMax" fill="none">
			          <path d="M16 21.5C16 19.25 16 18.6 16 15C16 7 11.75 3 7.5 3C3.2503 3 2 6.5 2 8C2 9.5 3.2503 13 7.5 13C10.5 13 16 12 16 2V0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
		            </symbol>
              <use class="svg-swirl" href="#swirl" x="0" y="0" width="21" height="100%"></use>
              <rect class="svg-line" x="15" y="0" width="2" height="100%" rx="1" fill="currentColor"></rect>
            </svg>
            <div class="notice-wrapper">
              <span class="notice collapsed">Expand conversaton</span>
              <span class="notice expanded">Collapse conversaton</span>
            </div>
          </div>
        </summary>
        <slot></slot>
      </details>
    `;
  }
}

class MediaCard extends LitElement {
  static properties = {
    href: { type: String },
  }

  static styles = css`
    :host {
      display: block;
      container-type: inline-size;
    }
    a.media-card {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      overflow: hidden;

      container: inline-size;

      border-radius: var(--space-s);
      border: 1px solid var(--color-border);

      text-decoration: none;
      color: var(--color-text);
      margin-block-start: 8px;
    }

    @container (width >= 430px) {
      a.media-card {
        max-width: 80%;
      }
    }

    a:visited {
      --primary: #551A8B;
    }

    a.media-card:hover, a.media-card:focus {
      --color-border: light-dark(oklch(from var(--primary) 40% calc(c * 2) h), oklch(from var(--primary) 70% calc(c * 2) h));
      box-shadow: 0 0 0 2px light-dark(oklch(from var(--primary) 40% calc(c * 2) h / 0.33), oklch(from var(--primary) 70% calc(c * 2) h / 0.33));
    }

    a.media-card > div:first-child {
      border-block-end: 1px solid var(--color-border);
    }

    .meta-container {
      padding: 8px;
      min-width: 0;
    }

    p.meta {
      margin: 0;
    }

    .subtle {
      color: var(--color-subtle);
      font-size: smaller;
    }
    
    [name="domain"] {
      color: light-dark(oklch(from var(--primary) 40% calc(c * 2) h),
      oklch(from var(--primary) 70% calc(c * 2) h));
    }

    .body, [name="title"] {
      display: -webkit-box;
      display: box;
      -webkit-box-orient: vertical;
      box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: balance;
    }

    ::slotted(*) {
      margin: 0;
    }
  `;

  render() {
    return html`
      <a href="${this.href}" target="_blank" rel="nofollow noopener" class="media-card">
        <div>
          <slot name="img"></slot>
        </div>
        <div class="meta-container">
          <p class="meta subtle">
            <slot name="domain"></slot>
            ·
            <slot name="time"></slot>
          </p>
          <slot name="title"></slot>
          <slot class="body subtle"></slot>
        </div>
      </a>
    `;
  }
}

customElements.define("tweet-embed", TweetEmbed);
customElements.define("shared-tweet", SharedTweet);
customElements.define("main-tweet", MainTweet);
customElements.define("media-container", MediaContainer);
customElements.define("media-card", MediaCard);
customElements.define("expandable-tweet", ExpandableTweet);
