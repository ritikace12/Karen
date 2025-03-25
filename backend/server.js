// ========================== IMPORTS ==========================
// Express: Backend framework for handling requests
import express from "express";

// CORS: Allows requests from different frontend origins
import cors from "cors";

// Node-fetch: Used to send API requests
import fetch from "node-fetch";

// FormData: Handles form data submission (needed for ClipDrop API)
import FormData from "form-data";

// Dotenv: Loads environment variables from .env file
import dotenv from "dotenv";
dotenv.config(); // Load .env file

// ========================== SERVER CONFIGURATION ==========================
const app = express(); // Initialize Express
const port = process.env.PORT || 8080; // Define server port
const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY; // API key from environment variables

// ========================== CORS MIDDLEWARE ==========================
// Allow multiple frontend origins (modify as needed)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json()); // Enable JSON body parsing

// ========================== IMAGE GENERATION ENDPOINT ==========================
app.post("/api/generate-image", async (req, res) => {
  try {
    // Extract the prompt from the request body
    const { prompt } = req.body;

    // Validate the prompt (must be a non-empty string)
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({ error: "Invalid prompt format" });
    }

    console.log("🔹 Generating image for prompt:", prompt);

    // Create form data to send to the ClipDrop API
    const form = new FormData();
    form.append("prompt", prompt);

    // ========================== API REQUEST TO CLIPDROP ==========================
    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: { "x-api-key": CLIPDROP_API_KEY }, // Attach API key
      body: form, // Send form data with the prompt
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text(); // Get error response from API
      console.error("❌ API Error:", errorText);
      throw new Error(`Failed to generate image: ${errorText}`);
    }

    // Convert API response to a binary image
    const buffer = await response.arrayBuffer();

    // ========================== SEND IMAGE RESPONSE ==========================
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow cross-origin requests
    res.setHeader("Content-Type", "image/png"); // Set response as PNG image
    res.send(Buffer.from(buffer)); // Send image data
  } catch (error) {
    console.error("❌ Error generating image:", error);
    
    // Send error response
    res.status(500).json({
      error: "Image generation failed",
      details: error.message,
    });
  }
});

// ========================== START SERVER ==========================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
