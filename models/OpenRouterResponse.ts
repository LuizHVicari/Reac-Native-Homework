export type OpenRouterMessage = {
    role: string;
    content: 'user' | 'assistant';
    refusal: string;
};

export type OpenRouterChoice = {
    logprobs: null | object;
    finish_reason: string;
    index: number;
    message: OpenRouterMessage;
};

type OpenRouterUsage = {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
};

export type OpenRouterResponse = {
    id: string;
    provider: string;
    model: string;
    object: string;
    created: number;
    choices: OpenRouterChoice[];
    system_fingerprint: null | string;
    usage: OpenRouterUsage;
};