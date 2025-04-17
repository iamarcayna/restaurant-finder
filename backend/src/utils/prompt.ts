import { SearchAction } from "../types";

export const createAssistantPrompt = (
  textPrompt: string,
  actions: SearchAction[]
) => {
  return `
      You are an AI that extracts structured data from user input.

      Instruction:
      Convert the text input into a JSON object with this exact structure:

      Example Input Text: "Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has atleast 4-start rating."
      Example JSON Output:
      {
        "action": "restaurant_search",
        "parameters": {
          "query": "sushi",
          "near": "downtown Los Angeles",
          "price": "1",
          "open_now": true,
        }
      }

      Input Text: ${textPrompt}
    
      NOTES:
      1. Fill in the values based on the meaning of the input text.
      2. Action enum (Dont provide action not included here)
        "action": [${actions.join(", ")}]
      3. Parameters to extract (Dont provide parameters not included here)
        "parameters": {
          query?: string;
          near?: string;
          price?: string;
          open_now?: boolean;
        }
      4. Respond with JSON only.
`;
};
