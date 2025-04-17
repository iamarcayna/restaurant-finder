import { Request, Response } from "express";
import { textPromptToJSON } from "../utils/openAi";
import { OpenAiResponse, searchQuerySchema } from "../types";

export const search = async (request: Request, response: Response) => {
  const validatedBody = searchQuerySchema.safeParse(request.body);

  if (!validatedBody.success) {
    response.status(400).json({
      error: validatedBody.error.flatten(),
    });
    return;
  }

  const { message } = validatedBody.data;
  const jsonPrompt = await textPromptToJSON(message);

  if (!jsonPrompt) {
    response.status(400).json({
      error: "Unabled to process message.",
    });
    return;
  }

  const queryObject = JSON.parse(jsonPrompt) as OpenAiResponse;
  const isParametersEmpty = Object.keys(queryObject.parameters).length === 0;

  if (isParametersEmpty) {
    response.status(400).json({
      error: "Unabled to process message.",
    });
    return;
  }

  response.status(200).json(queryObject);
};
