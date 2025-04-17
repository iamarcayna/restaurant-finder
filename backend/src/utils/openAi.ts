import OpenAI from "openai";
import dotenv from "dotenv";
import { createAssistantPrompt } from "./prompt";
import { SearchAction } from "../types";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const textPromptToJSON = async (textPrompt: string) => {
  const searchActions = [SearchAction.Restaurant];
  const prompt = createAssistantPrompt(textPrompt, searchActions);

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_API_MODEL || "gpt-4o-mini",
    messages: [
      {
        role: "assistant",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  return completion.choices[0].message.content;
};
