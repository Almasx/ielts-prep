import { OpenAIChatApi } from "llm-api";
import { env } from "~/env.mjs";

export const openai = new OpenAIChatApi(
  { apiKey: env.OPENAI_API_KEY },
  { model: "gpt-4-1106-preview" },
);
