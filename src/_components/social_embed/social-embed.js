import { css, html, LitElement } from "npm:lit@^3.0.0";

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
export class SocialMediaEmbedWrapper extends LitElement {
  static styles = css`
    :host {
      display: block;

      background-color: var(--color-background-lighter);
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
