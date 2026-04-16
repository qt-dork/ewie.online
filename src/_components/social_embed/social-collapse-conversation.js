import { Elena, html } from "npm:@elenajs/core@^1.0.0-rc.8";

/**
 * <social-collapse-conversation>
 *
 * @summary Collapses the conversation. Used for very long threads where context is useful but not mandatory.
 *
 * @slot - The posts being hidden, which are any number of `<social-threaded-post>`.
 *
 * @cssproperty [--collapse-border-color] - The border color of the "Expand/Collapse Conversation" button.
 * @cssproperty [--collapse-background-color] - The background stripe color of the "Expand/Collapse Conversation" button.
 * @cssproperty [--collapse-text-color] - The text color of the "Expand/Collapse Conversation" button.
 * @cssproperty --color-border - The color of the connecting line.
 */
export default class SocialMediaCollapseConversation
  extends Elena(HTMLElement) {
  static tagName = "social-collapse-conversation";
  render() {
    return html`
      <details>
        <summary>
          <div class="divider">
            <svg
              class="line"
              width="21"
              height="36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- I stole this from a codepen and I have no idea how to use only the path or any of that. svgs are black magic to me -->
              <symbol
                id="swirl"
                width="21"
                height="25"
                viewBox="0 0 21 25"
                preserveAspectRatio="xMidYMax"
                fill="none"
              >
                <path
                  d="M16 21.5C16 19.25 16 18.6 16 15C16 7 11.75 3 7.5 3C3.2503 3 2 6.5 2 8C2 9.5 3.2503 13 7.5 13C10.5 13 16 12 16 2V0"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </symbol>
              <use
                class="svg-swirl"
                href="#swirl"
                x="0"
                y="0"
                width="21"
                height="100%"
              >
              </use>
              <rect
                class="svg-line"
                x="15"
                y="0"
                width="2"
                height="100%"
                rx="1"
                fill="currentColor"
              >
              </rect>
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

SocialMediaCollapseConversation.define();
