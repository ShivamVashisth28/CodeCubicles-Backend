import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

// ✅ Use the new model name (Gemini 2.x)
const MODEL_NAME = "gemini-2.0-flash"; 
// or try "gemini-2.0-pro" if your key supports it

export const getResponseFromGoogle = async (prompt) => {
  try {
    // The new API uses ai.models.generateContent()
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // Extract the text safely
    const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    return text;

  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return "⚠️ Gemini API call failed. Please try again later.";
  }
};
