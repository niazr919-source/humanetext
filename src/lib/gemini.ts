import { GoogleGenAI } from "@google/genai";

let cachedClient: GoogleGenAI | null = null;

function getClient() {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }
  cachedClient = new GoogleGenAI({ apiKey });
  return cachedClient;
}

const HUMANIZE_SYSTEM_PROMPT = `You rewrite text so it reads naturally, the way a thoughtful human would write it.

Rules:
- Preserve the original meaning, facts, and intent exactly. Never add claims, statistics, or details that weren't implied by the source.
- Vary sentence length and rhythm. Break up repetitive patterns and overly uniform structure.
- Replace stiff, generic, or overly formal phrasing with natural, direct language.
- Remove filler transitions and hedging that read as templated (e.g. "In today's world", "It is important to note that").
- Keep the tone appropriate to the content — don't add jokes or casualness to formal or technical text.
- Do not add commentary, headers, or notes about the rewrite. Return only the rewritten text.`;

export async function humanizeText(input: string): Promise<string> {
  const client = getClient();
  const response = await client.models.generateContent({
    model: "gemini-3.6-flash",
    contents: `Rewrite the following text:\n\n${input}`,
    config: {
      systemInstruction: HUMANIZE_SYSTEM_PROMPT,
      maxOutputTokens: 4096,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Unexpected response format from Gemini API.");
  }
  return text.trim();
}
