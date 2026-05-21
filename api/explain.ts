import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sentence } = req.body;
  if (!sentence) {
    return res.status(400).json({ error: "Sentence is required" });
  }

  const prompt = `Giải thích quy tắc định ngữ đa tầng trong tiếng Trung cho câu sau: "${sentence}".
  Bối cảnh: sinh viên đang học cách sắp xếp các thành phần định ngữ.
  Hãy giải thích tại sao thứ tự này là đúng dựa trên các quy tắc: Sở hữu + Số lượng + Trạng thái + Màu sắc/Chất liệu + Danh từ.
  Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu.`;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error("Gemini Error:", error?.message || error);
    res.status(500).json({ error: error?.message || "Failed to fetch explanation from AI" });
  }
}
