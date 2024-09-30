function convertToSlug(text) {
	return text
		.toLowerCase()
		.replace(/[^\w ]+/g, "")
		.replace(/ +/g, "-");
}

export default {
	tags: ["posts"],
	layout: "layouts/post.njk",
	permalink: (data) => {
		const slugBody = convertToSlug(data.title).substring(0, 20);
		const td = new Date(data.date);
		const year = td.getFullYear();
		const month = (td.getMonth() + 1).toString().padStart(2, "0");
		const day = td.getDate().toString().padStart(2, "0");
		const slugDate = `${year}${month}${day}`;
		return `/posts/${slugDate}-${slugBody}`;
	},
};
