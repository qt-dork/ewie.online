import { Elena, html } from "npm:@elenajs/core@^1.0.0-rc.8";

/**
 * <social-media-scroller>
 *
 * @summary A wrapper for one or more images to present them as you would on social media. On Twitter, this would be an image grid. Styled after the media scroller from Threads.
 *
 * @slot - Any number of `<img>`.
 */
export default class SocialMediaMediaScroller extends Elena(HTMLElement) {
  static tagName = "social-media-scroller";
  render() {
    return html`
      <div class="image-wrapper">
        <slot></slot>
      </div>
    `;
  }
}

SocialMediaMediaScroller.define();
