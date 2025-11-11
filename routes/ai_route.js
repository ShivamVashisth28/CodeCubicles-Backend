import { Router } from "express";
import axios from "axios";
import { getResponseFromGoogle } from "../utils/getResponseFromAi.js";


const router = Router();

const setTextFromTopic = async (topic) => {
  const prompt = `Explain this ${topic} in easy language like you would explain this to a layman with some example and give the response in simple english paragraphs.`;
  const response = await axios.post('https://codecubicles-backend.onrender.com/api/v1/ai/chat', { prompt });
  const data = response.data;
  return data.data;
};

router.post("/audio", async (req, res) => {
  try {
    const topic = req.body.text;
    const text = await setTextFromTopic(topic);

    // Call Murf.ai API to generate speech
    const murfPayload = {
      text: text,
      voiceId: "en-US-natalie"
    };

    const murfConfig = {
      method: 'post',
      url: 'https://api.murf.ai/v1/speech/generate',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': 'ap2_aef50a38-d7e6-4d49-9710-ba4ebe7ee165' // Replace with your actual Murf API key
      },
      data: JSON.stringify(murfPayload)
    };

    const murfResponse = await axios(murfConfig);
    console.log(murfResponse)
    const audioUrl = murfResponse.data.audioFile; // Make sure Murf returns this

    // Fetch the generated audio
    const audioStream = await axios({
      method: 'get',
      url: audioUrl,
      responseType: 'stream'
    });

    res.setHeader("Content-Type", "audio/mpeg");
    audioStream.data.pipe(res);

    audioStream.data.on("end", () => {
      res.end();
    });

  } catch (error) {
    console.error("Error in generating or sending audio:", error);
    res.status(500).send("Error in generating or sending audio");
  }
});

export default router;


router.post("/chat", async (req, res) => {
  const body = req.body;
  
  const data = await getResponseFromGoogle(body.prompt);

  res.json({
    success: true,
    data,
  });
});

export const aiRouter = router;
