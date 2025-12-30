const express = require("express");
const cors = require("cors");

const articleRoutes = require("./routes/articleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BeyondChats Backend Running");
});

// Article APIs
app.use("/api/articles", articleRoutes);

module.exports = app;
