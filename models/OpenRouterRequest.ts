export type OpenRouterRequest = {
    model: string,
    messages: OpenRouterRequestMessage[]
}

export type OpenRouterRequestMessage = {
    role: 'user' | 'assistant',
    content: string
}

