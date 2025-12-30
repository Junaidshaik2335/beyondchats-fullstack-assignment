const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

async function scrapeAndSaveArticles(articlesMeta) {
  for (const article of articlesMeta) {
    const response = await axios.get(article.url);
    const $ = cheerio.load(response.data);

    // Extract main article text
    const content = $("article").find("p").text().trim();

    if (!content) continue;

    // Avoid saving duplicate articles
    const alreadyExists = await Article.findOne({
      sourceUrl: article.url,
    });

    if (alreadyExists) continue;

    await Article.create({
      title: article.title,
      originalContent: content,
      sourceUrl: article.url,
    });
  }
}

module.exports = { scrapeAndSaveArticles };
