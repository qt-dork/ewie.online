function convertToSlug(text) {
	return text
		.toLowerCase()
		.replace(/[^\w ]+/g, "")
		.replace(/ +/g, "-");
}

function getSlugDate(asDate) {
	const td = new Date(asDate);
	const year = td.getFullYear();
	const month = (td.getMonth() + 1).toString().padStart(2, "0");
	const day = td.getDate().toString().padStart(2, "0");
	const slugDate = `${year}${month}${day}`;
	return slugDate;
}

function getSlugBody(title) {
	return convertToSlug(title).substring(0, 20);
}

export default {
	tags: ["posts"],
	layout: "layouts/post.njk",
	permalink: (data) => {
		const slugBody = getSlugBody(data.title);
		const slugDate = getSlugDate(data.date);
		return `/posts/${slugDate}-${slugBody}/index.html`;
	},
	eleventyComputed: {
		permalinkSlug({ title, date }) {
			const slugBody = getSlugBody(title);
			const slugDate = getSlugDate(date);
			return `${slugDate}-${slugBody}`;
		},
	},
};
