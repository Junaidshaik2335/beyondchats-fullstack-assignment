require("dotenv").config();
const axios = require("axios");

const { searchTopArticles } = require("../src/services/googleSearch");
const {
  scrapeCompetitorContent,
} = require("../src/services/scrapeCompetitorArticle");
const { rewriteArticle } = require("../src/services/llmRewrite");

const API_BASE = "http://localhost:5000/api/articles";

async function run() {
  try {
    const response = await axios.get(API_BASE);
    const articles = response.data;

    for (const article of articles) {
      console.log("\nUpdating article:", article.title);

      // 1. Get competitor links
      const links = await searchTopArticles(article.title);

      // 2. Scrape competitor content
      const competitorContents = [];
      for (const link of links) {
        const content = await scrapeCompetitorContent(link);
        if (content.length > 300) {
          competitorContents.push(content);
        }
      }

      if (competitorContents.length === 0) {
        console.log("Skipping (no good competitor content)");
        continue;
      }

      // 3. Rewrite using LLM
      const updatedContent = await rewriteArticle(
        article.originalContent,
        competitorContents
      );

      if (!updatedContent) {
        console.log("LLM failed, skipping");
        continue;
      }

      // 4. Save updated article
      await axios.put(`${API_BASE}/${article._id}`, {
        updatedContent,
        referenceUrls: links,
      });

      console.log("Article updated successfully");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

run();
