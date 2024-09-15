import { Router } from "express";
import { getResponseFromGoogle } from "../utils/getResponseFromAi.js";
import * as PlayHT from "playht"; // Import PlayHT SDK
import axios from "axios";

const router = Router();

PlayHT.init({
  apiKey: process.env.PLAYHT_SECRET_KEY,
  userId: process.env.PLAYHT_USERID,
});



const setTextFromTopic = async (topic) => {
  const prompt = `Explain this ${topic} in easy language like you would explain this to a layman with some example and give the response in simple engish paragraphs.`;
  const response = await axios.post('http://localhost:5000/api/v1/ai/chat', { prompt });
  const data = await response.data
  return data.data
  
}

router.post("/audio", async (req, res) => {
  try {
    const topic = req.body.text


    const text = await setTextFromTopic(topic);
    const streamingOptions = {
      voiceEngine: "PlayHT1.0",
      voiceId: "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
      sampleRate: 44100,
      outputFormat: "mp3",
      speed: 1,
    };

    // Generate the audio asynchronously and get the audio URL
    const response = await PlayHT.generate(text, streamingOptions);
    const audioUrl = response.audioUrl;

    // Fetch the generated audio from the PlayHT API using axios
    const audioStream = await axios({
      method: "get",
      url: audioUrl,
      responseType: "stream", // Stream the response data
    });

    // Set headers to indicate an audio file is being sent
    res.setHeader("Content-Type", "audio/mpeg");

    // Stream the audio data from PlayHT API directly to the client
    audioStream.data.pipe(res);

    audioStream.data.on("end", () => {
      res.end(); // End the response once the streaming is done
    });

  } catch (error) {
    console.error("Error in generating or sending audio:", error);
    res.status(500).send("Error in generating or sending audio");
  }
});

router.post("/chat", async (req, res) => {
  const body = req.body;
  
  const data = await getResponseFromGoogle(body.prompt);

  res.json({
    success: true,
    data,
  });
});

export const aiRouter = router;
