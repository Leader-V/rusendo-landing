// Загружаем переменные окружения из .env на этапе сборки.
require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
};
