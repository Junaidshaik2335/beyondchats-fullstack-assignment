require("dotenv").config();
const mongoose = require("mongoose");

const scrapeOldestArticles = require("./services/scrapeBeyondChats");
const { scrapeAndSaveArticles } = require("./controllers/articleController");

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Get 5 oldest articles (title + URL)
    const articlesMeta = await scrapeOldestArticles();

    // Scrape full content and save to DB
    await scrapeAndSaveArticles(articlesMeta);

    console.log("Articles scraped and saved successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
