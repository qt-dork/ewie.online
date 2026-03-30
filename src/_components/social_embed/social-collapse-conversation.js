import { css, html, LitElement } from "npm:lit@^3.0.0";

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
export class SocialMediaCollapseConversation extends LitElement {
  static styles = css`
    .divider {
      display: grid;
      column-gap: 1rem;
      grid-template-columns: 36px minmax(0, 1fr);
      grid-template-areas: "line body";
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
      --collapse-border-color: orange;
      --collapse-background-color: light-dark(
        rgba(255, 166, 0, 0.12549),
        rgba(255, 166, 0, 0.0902)
      );
      --collapse-text-color: light-dark(#b36200, orange);
    }

    .notice {
      padding: 4px;
      border: 1px solid var(--collapse-border-color);
      border-radius: 4px;
      color: var(--collapse-text-color);
      background-image: repeating-linear-gradient(
        -70deg,
        transparent,
        transparent 3px,
        var(--collapse-background-color) 3px,
        var(--collapse-background-color) 4px
      );
    }
  `;

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
