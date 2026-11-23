import createSlugifier, { defaults as SlugifierDefaults } from "@lumeland/core/slugifier.ts";

import type { MetaData } from "@lumeland/plugin-metas";

const slugify = createSlugifier(SlugifierDefaults);

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
    title: "=title || =content_title",
    description: "=description",
    "twitter:description": "=description",
    icon: ogIcon,
    image: ogIcon,
    "article:tag": "=tags",
    robots: metaRobots
  }
}
