import { Request, Response } from "express";
import { textPromptToJSON } from "../utils/openAi";
import { OpenAiResponse, searchQuerySchema } from "../types";
import { SearchService } from "../services";
import { RestaurantFinderError } from "../errors";

export const search = async (request: Request, response: Response) => {
  const validatedBody = searchQuerySchema.safeParse(request.body);

  if (!validatedBody.success) {
    throw new RestaurantFinderError({
      error: validatedBody.error.flatten(),
      message: "Invalid request body",
      status: 400,
    });
  }

  const { message } = validatedBody.data;
  const jsonPrompt = await textPromptToJSON(message);

  if (!jsonPrompt) {
    throw new RestaurantFinderError({
      message: "Unabled to process message.",
      status: 400,
    });
  }

  const queryObject = JSON.parse(jsonPrompt) as OpenAiResponse;
  const isParametersEmpty = Object.keys(queryObject.parameters).length === 0;

  if (isParametersEmpty) {
    throw new RestaurantFinderError({
      message: "Unabled to process message.",
      status: 400,
    });
  }

  const results = await SearchService.searchFourSquare(queryObject);

  response.status(200).json(results);
};
