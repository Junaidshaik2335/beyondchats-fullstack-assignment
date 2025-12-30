import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Segoe UI, Arial, sans-serif",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        color: "#1f2933", 
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        BeyondChats Knowledge Articles
      </h1>

      {!selectedArticle && (
        <ul style={{ padding: 0, listStyle: "none", maxWidth: "700px" }}>
          {articles.map((article) => (
            <li
              key={article._id}
              onClick={() => setSelectedArticle(article)}
              style={{
                background: "#ffffff",
                padding: "14px 18px",
                borderRadius: "8px",
                marginBottom: "12px",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                color: "#111827", 
              }}
            >
              {article.title}
            </li>
          ))}
        </ul>
      )}

      {selectedArticle && (
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            maxWidth: "900px",
            marginTop: "20px",
            color: "#111827", 
          }}
        >
          <button
            onClick={() => setSelectedArticle(null)}
            style={{
              marginBottom: "16px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            ← Back to list
          </button>

          <h2>{selectedArticle.title}</h2>

          <h3 style={{ marginTop: "20px" }}>Original Article</h3>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
            {selectedArticle.originalContent}
          </p>

          {selectedArticle.updatedContent && (
            <>
              <h3 style={{ marginTop: "24px" }}>Updated Article</h3>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                {selectedArticle.updatedContent}
              </p>
            </>
          )}

          {selectedArticle.referenceUrls?.length > 0 && (
            <>
              <h3 style={{ marginTop: "24px" }}>References</h3>
              <ul>
                {selectedArticle.referenceUrls.map((url, index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noreferrer">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
