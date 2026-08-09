import createSlugifier, { defaults as SlugifierDefaults } from "lume/core/slugifier.ts";
import { format } from "lume/deps/date.ts";

import { plainText } from "lume/deps/remove-markdown.ts";
import { defaults as plainTextDefaults } from "lume/plugins/plaintext.ts";

import type { MetaData } from "lume/plugins/metas.ts";

const slugify = createSlugifier(SlugifierDefaults);
let postDescription: string | undefined = undefined;

// TODO: make its own file
interface PostData extends Lume.Data {
  description: string;
  type: string;
  author?: {
    username: string;
    displayName: string;
    avatar: string;
  }
  metas: MetaData;
}

// TODO: Test this function because it feels like it's not working correctly
/// If a post has no description, make one from the content. Strips out all the markdown and html to get only pure plain text.
const generateDescriptionFromContent = ({ description, content }: PostData): string => {
  // bro wtf is this
  if (postDescription !== undefined) {
    return postDescription;
  }
  if (description !== undefined) {
    postDescription = plainText(content as string, plainTextDefaults);
  } else {
    postDescription = description;
  }
  return postDescription;
}

const ogIcon = (data: PostData): string => {
  let avatar: string;
  if (data.author) {
    avatar = data.author.avatar;
  } else {
    avatar = "https://cdn.ewie.online/ewie-pfp.png";
  }
  return avatar;
}

const metaRobots = (data: PostData): string[] => {
  // deno-lint-ignore prefer-const -- array is pushed
  let robots = ["noai, noimageai"];
  if ((data.index && data.index === false) || (data.post_draft && data.post_draft === true)) {
    robots.push("noindex, nofollow");
  }
  return robots;
}

export default {
  type: "post",
  layout: "layouts/post.vto",
  index: true,
  description: generateDescriptionFromContent,
  url: function ({ data: {date, title, content, permalink} }: { data: PostData}): string {
    const slugDate = new Date(date).toISOString().slice(0, 10).replaceAll("-", "");

    const slugBody = slugify(
      title ?? (
        (content as string | undefined) ?? "undefined"
        ).substring(0, 40)
    ).substring(0, 20);
    const url = permalink ?? `/posts/${slugDate}-${slugBody}/`;
    return url;
  },
  author: {
    username: "ewie",
    displayName: "Evie Finch",
    avatar: "https://cdn.ewie.online/ewie-pfp.png",
  },
  metas: {
    type: "article",
    title: "=title",
    description: generateDescriptionFromContent,
    icon: ogIcon,
    image: ogIcon,
    "article:tag": "=tags",
    robots: metaRobots
  }
}
