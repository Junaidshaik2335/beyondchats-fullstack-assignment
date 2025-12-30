const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://beyondchats.com";
const LAST_PAGE = 15;

async function scrapeOldestArticles() {
  const articles = [];

  // Loop from last page backwards
  for (let page = LAST_PAGE; page >= 1 && articles.length < 5; page--) {
    const pageUrl = `${BASE_URL}/blogs/page/${page}/`;
    const response = await axios.get(pageUrl);
    const $ = cheerio.load(response.data);

    $("article").each((_, element) => {
      if (articles.length >= 5) return;

      const title = $(element).find("h2 a").text().trim();
      const relativeUrl = $(element).find("h2 a").attr("href");

      if (title && relativeUrl) {
        articles.push({
          title,
          url: relativeUrl.startsWith("http")
            ? relativeUrl
            : `${BASE_URL}${relativeUrl}`,
        });
      }
    });
  }

  return articles;
}

module.exports = scrapeOldestArticles;
