import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;

if (!CLIPDROP_API_KEY) {
  console.error("CLIPDROP_API_KEY is not set in .env file");
  process.exit(1);
}

// Test endpoint to verify server is running
app.get("/test", (req, res) => {
  res.json({ message: "Server is running" });
});

app.post("/generate", async (req, res) => {
  console.log("Received generate request with prompt:", req.body.prompt);
  
  const { prompt } = req.body;
  if (!prompt) {
    console.error("No prompt provided");
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    console.log("Making request to ClipDrop API...");
    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      { prompt },
      {
        headers: { 
          "x-api-key": CLIPDROP_API_KEY,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer",
      }
    );

    console.log("Received response from ClipDrop API");
    const imageBase64 = Buffer.from(response.data, "binary").toString("base64");
    res.json({ image: `data:image/png;base64,${imageBase64}` });
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : 'No response',
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        headers: error.config.headers
      } : 'No config'
    });
    
    res.status(500).json({ 
      error: "Failed to generate image",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("API Key present:", !!CLIPDROP_API_KEY);
});
