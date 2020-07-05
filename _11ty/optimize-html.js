const purify = require("../third_party/purify-css/purify-css");
const minify = require("html-minifier").minify;
const AmpOptimizer = require("@ampproject/toolbox-optimizer");
const ampOptimizer = AmpOptimizer.create({
  blurredPlaceholders: true,
  imageBasePath: "./_site/",
  //verbose: true,
});

const purifyCss = (rawContent, outputPath) => {
  let content = rawContent;
  if (
    outputPath.endsWith(".html") &&
    !isAmp(content) &&
    !/data-style-override/.test(content)
  ) {
    let before = require("fs").readFileSync("css/bahunya.css", {
      encoding: "utf-8",
    });

    before = before.replace(/@font-face {/g, "@font-face {font-display:swap;");

    const after = purify(rawContent, before, {
      minify: true,
    });
    content = content.replace("</head>", `<style>${after}</style></head>`);
  }
  return content;
};

const minifyHtml = (rawContent, outputPath) => {
  let content = rawContent;
  if (outputPath.endsWith(".html") && !isAmp(content)) {
    content = minify(content, {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true,
      sortClassName: true,
      sortAttributes: true,
    });
  }
  return content;
};

const optimizeAmp = async (rawContent, outputPath) => {
  let content = rawContent;
  if (outputPath.endsWith(".html") && isAmp(content)) {
    content = await ampOptimizer.transformHtml(content);
  }
  return content;
};

module.exports = {
  initArguments: {},
  configFunction: async (eleventyConfig, pluginOptions = {}) => {
    eleventyConfig.addTransform("purifyCss", purifyCss);
    eleventyConfig.addTransform("minifyHtml", minifyHtml);
    eleventyConfig.addTransform("optimizeAmp", optimizeAmp);
  },
};

function isAmp(content) {
  return /\<html amp/i.test(content);
}
