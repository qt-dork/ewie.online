import { css, html, LitElement } from "npm:lit@^3.0.0";

/**
 * <social-media-scroller>
 *
 * @summary A wrapper for one or more images to present them as you would on social media. On Twitter, this would be an image grid. Styled after the media scroller from Threads.
 *
 * @slot - Any number of `<img>`.
 */
export class SocialMediaMediaScroller extends LitElement {
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
