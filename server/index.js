const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api/block-info", async (req, res) => {
  try {
    const response = await axios.get(
      "https://mempool.space/api/blocks/tip/height",
    );
    const blockHeight = parseInt(response.data);

    if (isNaN(blockHeight)) {
      throw new Error("Invalid block height received from API");
    }

    const countdown = 1000000 - blockHeight;

    res.json({
      "block height": blockHeight,
      countdown: countdown,
    });
  } catch (error) {
    console.error("Error fetching block height:", error.message);
    res.status(500).json({ error: "Failed to fetch block height" });
  }
});

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
