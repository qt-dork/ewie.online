import { Elena, html } from "npm:@elenajs/core@^1.0.0-rc.8";

/**
 * <social-embed>
 *
 * @summary Provides an appealing embed of a social media post. All the data must be provided for the post.
 *
 * @slot The post or posts inside. It must follow this structure:
 * 	- Any number of `<social-threaded-post>` *(optional)*
 * 	- Only if there is at least one `<social-threaded-post>` above it, a `<social-collapse-conversation>` which can contain any number of `<social-threaded-post>`. *(optional)*
 *  - Exactly one `<social-main-post>`. Must be the last or only post in the thread.
 *
 * @cssproperty --color-background-lighter - The background of the conversation.
 * @cssproperty --color-border - The color of the conversation's border.
 */
export default class SocialMediaEmbedWrapper extends Elena(HTMLElement) {
  static tagName = "social-embed";
  render() {
    return html`
      <slot></slot>
    `;
  }
}

SocialMediaEmbedWrapper.define();
