import { Elena, html } from "npm:@elenajs/core@^1.0.0-rc.8";

/**
 * <social-link-card>
 *
 * @summary A media/link card, which displays an article or other link in a card with opengraph metadata of the link.
 *
 * @property href - The url of the link.
 *
 * @slot - The body of the post. Can contain any HTML, including a `<social-link-card>` or `<social-media-scroller>` element.
 * @slot img - An `<img>` (or other image) of the opengraph image.
 * @slot domain - The name of the domain (e.g. ewie.online or discourse.julialang.org).
 * @slot time - The opengraph date uploaded, or such.
 * @slot title - The opengraph title of the link.
 * @slot description - The opengraph description of the link.
 *
 * @cssproperty --space-s - Just used for the border radius.
 * @cssproperty --color-border - The border of the link card.
 * @cssproperty --color-text - The text color of the link card.
 * @cssproperty --color-subtle - The text color of subtle text elements.
 * @cssproperty --primary - The primary theme color.
 */
export default class SocialMediaLinkCard extends Elena(HTMLElement) {
  static tagName = "social-link-card";
  static props = ["href"];
  href = "";

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
          <slot class="body subtle" name="description"></slot>
        </div>
      </a>
    `;
  }
}

SocialMediaLinkCard.define();
