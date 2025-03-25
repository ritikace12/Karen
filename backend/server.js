import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;

app.use(cors({ origin: ["http://localhost:5173", process.env.FRONTEND_URL], credentials: true }));
app.use(express.json());

app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({ error: "Invalid prompt format" });
    }

    console.log("🔹 Generating image for prompt:", prompt);

    const form = new FormData();
    form.append("prompt", prompt);

    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: { "x-api-key": CLIPDROP_API_KEY },
      body: form,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      throw new Error(`Failed to generate image: ${errorText}`);
    }

    const buffer = await response.arrayBuffer();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("❌ Error generating image:", error);
    res.status(500).json({ error: "Image generation failed", details: error.message });
  }
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
