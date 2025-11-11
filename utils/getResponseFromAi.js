import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

// Initialize with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

// ✅ Use the latest model name (v1)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
// You can also try "gemini-1.5-pro-latest" for more accuracy (slightly slower)

export const getResponseFromGoogle = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const data = result.response.text();
    return data;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return "Error: Unable to fetch response from Gemini AI.";
  }
};
