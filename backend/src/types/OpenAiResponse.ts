import { SearchAction, SearchParameter } from ".";

export interface OpenAiResponse {
  action: SearchAction;
  parameters: SearchParameter;
}
