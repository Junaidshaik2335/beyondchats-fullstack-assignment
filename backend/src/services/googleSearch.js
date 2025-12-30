const axios = require("axios");

const SERP_API_URL = "https://serpapi.com/search.json";

async function searchTopArticles(query) {
  try {
    const response = await axios.get(SERP_API_URL, {
      params: {
        q: query,
        api_key: process.env.SERPAPI_KEY,
        engine: "google",
        num: 10,
      },
    });

    const results = response.data.organic_results || [];

    // Filter out BeyondChats and social media links
    const filtered = results.filter(
      (r) =>
        r.link &&
        !r.link.includes("beyondchats.com") &&
        !r.link.includes("youtube.com") &&
        !r.link.includes("facebook.com") &&
        !r.link.includes("linkedin.com") &&
        !r.link.includes("instagram.com")
    );

    // Return top 2 competitor article links
    return filtered.slice(0, 2).map((r) => r.link);
  } catch (error) {
    console.error("Google search failed:", error.message);
    return [];
  }
}

module.exports = { searchTopArticles };
