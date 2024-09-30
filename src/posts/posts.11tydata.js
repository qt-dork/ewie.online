/** Converts string to a slug form. */
export const slugifyString = (str) => {
	return slugify(str, {
		replacement: "-",
		remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
		lower: true,
	});
};

export default {
	tags: ["posts"],
	layout: "post",
	permalink: (data) => {
		return `/posts/${data.fileSlug}/index.html`;
	},
};
