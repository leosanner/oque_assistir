import { Conversation } from './conversation/Conversation'
import { useConversation } from './conversation/useConversation'

function App() {
  const { messages, pending, send, retry, reset } = useConversation()

  return (
    <div className="app">
      <header className="topbar">
        <span className="logo">
          <span className="logo-mark" aria-hidden>?</span>
          O Que Assistir
        </span>
        <button type="button" className="btn btn-outline" onClick={reset} disabled={messages.length === 0 && !pending}>
          + Nova conversa
        </button>
      </header>
      <Conversation messages={messages} pending={pending} onSend={send} onRetry={retry} />
    </div>
  )
}

export default App
