import { SearchAction, SearchParameter } from ".";

export interface OpenAiResponse {
  action: keyof typeof SearchAction;
  parameters: SearchParameter;
}
