const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeCompetitorContent(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);

    // Remove non-content elements
    $("script, style, nav, footer, header, aside").remove();

    // Collect paragraph text
    let text = "";
    $("p").each((_, el) => {
      const paragraph = $(el).text().trim();
      if (paragraph.length > 50) {
        text += paragraph + "\n\n";
      }
    });

    return text.trim();
  } catch (error) {
    console.error("Failed to scrape:", url);
    return "";
  }
}

module.exports = { scrapeCompetitorContent };
