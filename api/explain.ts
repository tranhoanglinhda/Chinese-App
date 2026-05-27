import OpenAI from "openai";

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
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ explanation: completion.choices[0].message.content });
  } catch (error: any) {
    console.error("OpenAI Error:", error?.message || error);
    res.status(500).json({ error: error?.message || "Failed to fetch explanation from AI" });
  }
}
