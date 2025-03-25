import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;
const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware
app.use(cors({ origin: [FRONTEND_URL], credentials: true }));
app.use(express.json());

// 🔹 Test API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// 🔹 Image Generation API
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({ error: "Invalid prompt format" });
    }

    console.log("🔹 Generating image for prompt:", prompt);

    // Setup FormData
    const form = new FormData();
    form.append("prompt", prompt);

    // Make API request
    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: { "x-api-key": CLIPDROP_API_KEY },
      body: form,
    });

    // Handle API response errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      return res.status(500).json({ error: "Failed to generate image", details: errorText });
    }

    // Convert response to image buffer
    const buffer = await response.arrayBuffer();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("❌ Error generating image:", error);
    res.status(500).json({ error: "Image generation failed", details: error.message });
  }
});

// Start Server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
