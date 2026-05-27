import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
    });

    const text = completion.choices[0].message.content;
    res.json({ reply: text });
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to fetch response from AI" });
  }
});

app.post("/api/explain", async (req, res) => {
  try {
    const { sentence, context } = req.body;
    if (!sentence) {
      return res.status(400).json({ error: "Sentence is required" });
    }

    const prompt = `Giải thích quy tắc định ngữ đa tầng trong tiếng Trung cho câu sau: "${sentence}".
    Bối cảnh: sinh viên đang học cách sắp xếp các thành phần định ngữ.
    Hãy giải thích tại sao thứ tự này là đúng dựa trên các quy tắc: Sở hữu + Số lượng + Trạng thái + Màu sắc/Chất liệu + Danh từ.
    Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ explanation: completion.choices[0].message.content });
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to fetch explanation from AI" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
