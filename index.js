import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { aiRouter } from "./routes/ai_route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Set up CORS first
app.use(
  cors()
);

app.use(express.json({ limit: "16kb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

// ✅ Use routes AFTER middleware
app.use("/api/v1/ai", aiRouter);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
