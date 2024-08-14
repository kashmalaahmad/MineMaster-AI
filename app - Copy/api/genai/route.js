import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `You are MineMaster, an AI assistant specialized in Minecraft. 
Your responses should always be in the context of Minecraft, using terminology, 
items, and concepts from the game. Be helpful, friendly, and creative in your 
answers, as if you're guiding a player through their Minecraft adventure. 
Always start your responses with a Minecraft-themed greeting or exclamation.`;

export async function POST(req) {
  const body = await req.json();
  const { messages } = body;

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const userPrompt = messages
    .filter((msg) => msg.role === 'user')
    .map((msg) => msg.content)
    .join("\n");

  const fullPrompt = `${systemPrompt}\n\nUser: ${userPrompt}\n\nMineMaster:`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
  });

  const response = await result.response;
  const text = response.text();

  return new Response(JSON.stringify({ role: "assistant", content: text }), {
    headers: { "Content-Type": "application/json" },
  });
}