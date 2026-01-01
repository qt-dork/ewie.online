import { css, html, LitElement } from "npm:lit@^3.0.0";

class QuoteBack extends LitElement {
  static properties = {
    href: {},
    src: {},
  };

  static styles = css`
    :host {
      display: block;
    }

    figure {
      margin: 0;
      border: 1px solid var(--color-border);
      border-radius: var(--space-s);
      background-color: var(--color-background-lighter);
      transition: 0.2s;

      &:hover {
        transform: translate(0, -0.25rem);
        box-shadow: var(--shadow-elevation-medium);
      }
    }

    blockquote {
      margin: 0;
      padding: var(--space-s);

      border-block-end: 1px dashed var(--color-border);
    }

    figcaption {
      display: flex;
      gap: var(--space-s);
      justify-content: start;
      align-items: stretch;

      container-type: inline-size;

      > *:first-child {
        margin-inline-start: var(--space-s);
      }
      > * {
        padding-block-end: var(--space-s);
        padding-block-start: var(--space-s);
      }
    }

    .favicon {
      align-self: center;
      justify-self: center;
    }

    .mini-favicon {
      width: 44px;
      aspect-ratio: 1;
      display: grid;
      place-content: center;
      border: 1px solid var(--color-border);
      border-radius: 100%;

      img {
        height: 22px;
        width: 22px;
      }
    }

    .link {
      margin-inline-start: auto;
      display: flex;
      gap: calc(var(--space-xs) / 2);
      align-items: center;
      color: var(--color-subtle);
      text-decoration: none;

      padding-inline: var(--space-s);
      border-inline-start: 1px dashed var(--color-border);

      &:hover {
        color: oklch(from var(--color-subtle) calc(l + 0.12) calc(c * 1.5) h);
      }
    }

    @container (max-width: 24rem) {
      .link {
        padding-inline: calc(var(--space-s) * 1.5);
      }
      .link-text {
        display: none;
      }
    }

    .cite {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      align-self: center;

      cite {
        font-style: normal;
        color: var(--color-subtle);
      }
    }

    .cite, .link {
      line-height: 1.3;
      font-size: var(--size-step--1);
    }

    ::slotted(*) {
      margin: 0;
    }
  `;

  getSrc() {
    if (this.src !== undefined) {
      return this.src;
    } else {
      return `https://s2.googleusercontent.com/s2/favicons?domain_url=${this.href}&sz=64`;
    }
  }

  render() {
    return html`
      <figure>
        <blockquote><slot></slot></blockquote>
        <figcaption>
          <div class="favicon">
            <div class="mini-favicon"><img src="${this.getSrc()}"></div>
          </div>
          <div class="cite">
            <div><slot name="author"></slot></div>
            <cite><slot name="title"></slot></cite>
          </div>
          <a
            class="link"
            target="_blank"
            aria-label="go to the full text of this quotation"
            rel="noopener"
            href="${this.href}"
          >
            <span class="link-text">
              Go to source
            </span>
            <span class="link-arrow">→</span>
          </a>
        </figcaption>
      </figure>
    `;
  }
}

customElements.define("quote-back", QuoteBack);
