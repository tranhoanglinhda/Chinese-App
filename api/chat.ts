import OpenAI from "openai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error: any) {
    console.error("OpenAI Error:", error?.message || error);
    res.status(500).json({ error: error?.message || "Failed to fetch response from AI" });
  }
}
