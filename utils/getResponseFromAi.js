import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// ✅ Initialize Gemini client with your API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

// ✅ Use the newest model
const MODEL_NAME = "gemini-2.5-flash"; 
// or "gemini-2.5-pro" if your API tier supports it

export const getResponseFromGoogle = async (prompt) => {
  try {
    // ✅ Generate content using the new method
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // ✅ Safely extract plain text
    const text =
      response.output_text ||
      response.text ||
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return text;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return "⚠️ Gemini API call failed. Please try again later.";
  }
};
