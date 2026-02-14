import { css, html, LitElement } from "npm:lit";

class MediaCard extends LitElement {
  static properties = {
    href: { type: String },
  };

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
      margin-inline: auto;
    }

    @container (width >= 430px) {
      a.media-card {
        max-width: 80%;
      }
    }

    a:visited {
      --primary: #551a8b;
    }

    a.media-card:hover, a.media-card:focus {
      --color-border: light-dark(
        oklch(from var(--primary) 40% calc(c * 2) h),
        oklch(from var(--primary) 70% calc(c * 2) h)
      );
      box-shadow: 0 0 0 2px
        light-dark(
          oklch(from var(--primary) 40% calc(c * 2) h / 0.33),
          oklch(from var(--primary) 70% calc(c * 2) h / 0.33)
        );
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
        color: light-dark(
          oklch(from var(--primary) 40% calc(c * 2) h),
          oklch(from var(--primary) 70% calc(c * 2) h)
        );
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
        <a
          href="${this.href}"
          target="_blank"
          rel="nofollow noopener"
          class="media-card"
        >
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

  customElements.define("media-card", MediaCard);
