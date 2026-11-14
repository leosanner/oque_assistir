import { useEffect, useRef } from 'react'
import { Composer } from './Composer'
import type { Message } from './useConversation'
import './conversation.css'

const SUGGESTIONS = [
  'Uma ficção científica que faça pensar',
  'Comédia leve para ver em família',
  'Um suspense curto, menos de 2h',
  'Filme brasileiro recente',
]

type Props = {
  messages: Message[]
  pending: boolean
  onSend: (text: string) => void
  onRetry: (errorId: number, text: string) => void
}

export function Conversation({ messages, pending, onSend, onRetry }: Props) {
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, pending])

  const empty = messages.length === 0

  return (
    <>
      <main className="thread" aria-live="polite">
        <div className="intro">
          <span className="label">Assistente de filmes</span>
          <h1>O que vamos assistir hoje?</h1>
          {empty && (
            <p className="intro-hint">
              Conte o que você está com vontade de ver — gênero, clima, duração, um filme parecido.
            </p>
          )}
        </div>

        {messages.map((m) => (
          <MessageView key={m.id} message={m} onRetry={onRetry} disabled={pending} />
        ))}

        {pending && (
          <div className="msg is-assistant">
            <Avatar />
            <div className="thinking" role="status">
              <span /><span /><span /> <em>pensando</em>
            </div>
          </div>
        )}
        <div ref={end} />
      </main>

      <footer className="dock">
        {empty && (
          <div className="suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className="pill" onClick={() => onSend(s)} disabled={pending}>
                {s}
              </button>
            ))}
          </div>
        )}
        <Composer onSend={onSend} disabled={pending} />
      </footer>
    </>
  )
}

function MessageView({
  message, onRetry, disabled,
}: { message: Message; onRetry: Props['onRetry']; disabled: boolean }) {
  if (message.author === 'user') {
    return (
      <div className="msg is-user">
        <p className="bubble">{message.text}</p>
      </div>
    )
  }

  if (message.author === 'error') {
    return (
      <div className="msg is-assistant">
        <Avatar error />
        <div className="msg-body error-body" role="alert">
          <p>{message.text}</p>
          <button type="button" className="btn btn-outline" onClick={() => onRetry(message.id, message.retryOf)} disabled={disabled}>
            Tentar de novo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="msg is-assistant">
      <Avatar />
      <div className="msg-body">
        <p className="reply">{message.text}</p>
      </div>
    </div>
  )
}

function Avatar({ error }: { error?: boolean }) {
  return <span className={`avatar ${error ? 'is-error' : ''}`} aria-hidden>{error ? '!' : '?'}</span>
}
