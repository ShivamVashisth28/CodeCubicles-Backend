import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Initialize the client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

// ✅ Use the correct model identifier and latest API
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// You can also try "gemini-1.5-pro" for higher quality output

export const getResponseFromGoogle = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const data = result.response.text();
    return data;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return null;
  }
};
