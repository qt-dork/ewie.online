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

        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .header, .footer {
        font-size: 16px;
      }

      .header .name {
        font-weight: bold;
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
      `
      
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
        </div>

        <div class="body">
          <slot></slot>
        </div>

          <slot class="metadata footer subtle" name="time">
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

customElements.define("tweet-embed", TweetEmbed);
customElements.define("shared-tweet", SharedTweet);
customElements.define("main-tweet", MainTweet);
customElements.define("media-container", MediaContainer);
customElements.define("expandable-tweet", ExpandableTweet);
