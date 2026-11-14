import { useCallback, useEffect, useRef, useState } from 'react'
import { askAssistant, RecommendationError } from '../api/recommendation'

export type Message =
  | { id: number; author: 'user'; text: string }
  | { id: number; author: 'assistant'; text: string }
  | { id: number; author: 'error'; text: string; retryOf: string }

let nextId = 1

/**
 * Holds one Conversation in memory. The server is stateless for now: each User
 * Message is sent on its own, without the earlier turns.
 */
export function useConversation() {
  const [messages, setMessages] = useState<Message[]>([])
  const [pending, setPending] = useState(false)
  const inFlight = useRef<AbortController | null>(null)

  useEffect(() => () => inFlight.current?.abort(), [])

  const ask = useCallback(async (text: string) => {
    inFlight.current?.abort()
    const controller = new AbortController()
    inFlight.current = controller
    setPending(true)
    try {
      const reply = await askAssistant(text, { signal: controller.signal })
      setMessages((m) => [...m, { id: nextId++, author: 'assistant', text: reply }])
    } catch (error) {
      if (controller.signal.aborted) return
      const reason = error instanceof RecommendationError ? error.message : 'Algo deu errado.'
      setMessages((m) => [...m, { id: nextId++, author: 'error', text: reason, retryOf: text }])
    } finally {
      if (inFlight.current === controller) {
        inFlight.current = null
        setPending(false)
      }
    }
  }, [])

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim()
      if (!text || pending) return
      setMessages((m) => [...m, { id: nextId++, author: 'user', text }])
      void ask(text)
    },
    [ask, pending],
  )

  const retry = useCallback(
    (errorId: number, text: string) => {
      if (pending) return
      setMessages((m) => m.filter((msg) => msg.id !== errorId))
      void ask(text)
    },
    [ask, pending],
  )

  const reset = useCallback(() => {
    inFlight.current?.abort()
    inFlight.current = null
    setPending(false)
    setMessages([])
  }, [])

  return { messages, pending, send, retry, reset }
}
