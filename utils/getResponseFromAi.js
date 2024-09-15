import {GoogleGenerativeAI} from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config({path:'./.env'})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY );
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getResponseFromGoogle = async (prompt) => {

    const result = await model.generateContent(prompt);
    const data = result.response.text();
    return data;

}