import { SocialMediaEmbedWrapper } from "./social-embed.js";
import { SocialMediaThreadedPost } from "./social-threaded-post.js";
import { SocialMediaMainPost } from "./social-main-post.js";
import { SocialMediaMediaScroller } from "./social-media-scroller.js";
import { SocialMediaLinkCard } from "./social-link-card.js";
import { SocialMediaCollapseConversation } from "./social-collapse-conversation.js";

customElements.define("social-embed", SocialMediaEmbedWrapper);
customElements.define("social-threaded-post", SocialMediaThreadedPost);
customElements.define("social-main-post", SocialMediaMainPost);
customElements.define("social-media-scroller", SocialMediaMediaScroller);
customElements.define("social-link-card", SocialMediaLinkCard);
customElements.define(
  "social-collapse-conversation",
  SocialMediaCollapseConversation,
);
