import createSlugifier, {
	defaults as slugifierDefaults
} from "lume/core/slugifier.ts";
import { format } from "lume/deps/date.ts";

import { plainText } from "lume/deps/remove-markdown.ts";
import { defaults as plainTextDefaults } from "lume/plugins/plaintext.ts";

import type { MetaData } from "lume/plugins/metas.ts";

const slugify = createSlugifier(slugifierDefaults);
let postDescription: string | undefined = undefined;

// TODO: make its own file
interface PostData extends Lume.Data {
	description: string;
	type: string;
	account?: {
		username: string;
		displayName: string;
		avatar: string;
	}
	metas: MetaData;
}

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
	return postDescription!;
}

const ogIcon = (data: PostData): string => {
	let avatar: string;
	if (data.account) {
		avatar = data.account.avatar;
	} else {
		avatar = "https://cdn.ewie.online/ewie-pfp.png";
	}
	return avatar;
}

const metaRobots = (data: PostData): string[] => {
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
	url: function ({data: {date, title, content, permalink}}: { data: PostData}): string {
		const slugDate = format(date, "yyyyMMdd");
		const slugBody = slugify(
			title ?? (
				(content as string | undefined) ?? "undefined"
			).substring(0, 40)
		).substring(0,20);
		let url = permalink ?? `/posts/${slugDate}-${slugBody}/`;
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
		"article:tag": "=tags",
		robots: metaRobots,
	},
};
