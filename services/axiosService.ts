import HttpError from "@/errors/HttpError"
import { OpenRouterRequest, OpenRouterRequestMessage } from "../models/OpenRouterRequest"
import { OpenRouterChoice, OpenRouterMessage, OpenRouterResponse } from "../models/OpenRouterResponse"
import axios from "axios"

export class AxiosService {

  private readonly apiKey = process.env.EXPO_PUBLIC_OPEN_ROUTER_KEY
  private readonly baseUrl = 'https://openrouter.ai/api/v1/chat/'
  private readonly api = axios.create({ baseURL: this.baseUrl })

  constructor() {
    this.configHeaders()
  }

  private configHeaders() {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${this.apiKey}`
    this.api.defaults.headers.common['Content-Type'] = 'application/json'
  }

  async sendMessage(content: string): Promise<OpenRouterMessage> {
    const requestBody = this.createRequestBody(content);
    const response = await this.sendRequest(requestBody);

    if (!this.isRequestSuccessful(response.status)) {
      throw this.createHttpError(response);
    }

    return this.extractBestChoice(response.data.choices);
  }

  private createRequestBody(content: string): OpenRouterRequest {
    const message: OpenRouterRequestMessage = { content, role: 'user' };
    return {
      model: "openai/gpt-3.5-turbo",
      messages: [message],
    };
  }

  private async sendRequest(requestBody: OpenRouterRequest) {
    return await this.api.post<OpenRouterResponse>('completions', requestBody);
  }

  private isRequestSuccessful(status: number): boolean {
    return status === axios.HttpStatusCode.Ok;
  }

  private createHttpError(response: { status: number, data: any }): HttpError {
    return new HttpError('Request failed', response.status, {
      responseData: response.data,
      requestBody: response.data,
    });
  }

  private extractBestChoice(choices: OpenRouterChoice[]): OpenRouterMessage {
    if (choices.length === 0) {
      throw new Error('No choices available');
    }

    const bestChoice = choices.sort(
      (a, b) => (Number(a.logprobs) || 0) - (Number(b.logprobs) || 0)
    )[0];
    return bestChoice.message;
  }

}