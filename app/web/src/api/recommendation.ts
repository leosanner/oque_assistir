// Client for the server's recommendation endpoint (RecommendationController).
// Requests go to /api, which Vite (dev) and nginx (prod) proxy to the Spring Boot server.

const RECOMMENDATION_URL = '/api/v1/recommendation/'

export type Provider = 'OLLAMA'

type RecommendationResponse = { modelResponse: string }

export class RecommendationError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'RecommendationError'
    this.status = status
  }
}

export async function askAssistant(
  message: string,
  { provider = 'OLLAMA', signal }: { provider?: Provider; signal?: AbortSignal } = {},
): Promise<string> {
  let response: Response
  try {
    response = await fetch(RECOMMENDATION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, provider }),
      signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new RecommendationError('Não foi possível falar com o servidor.')
  }

  if (!response.ok) {
    throw new RecommendationError(`O servidor respondeu com erro (${response.status}).`, response.status)
  }

  const body = (await response.json()) as RecommendationResponse
  return body.modelResponse
}
