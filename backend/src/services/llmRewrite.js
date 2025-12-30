const axios = require("axios");

async function rewriteArticle(originalContent, competitorContents) {
  const prompt = `
You are a professional content writer.

Rewrite the following article to improve:
- Structure
- Readability
- Depth
- Formatting

Use the competitor articles ONLY as inspiration.
DO NOT copy sentences.
DO NOT mention competitor brands.

Original Article:
${originalContent}

Competitor References:
${competitorContents.join("\n\n")}

Return ONLY the rewritten article content.
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("LLM rewrite failed");
    return "";
  }
}

module.exports = { rewriteArticle };
