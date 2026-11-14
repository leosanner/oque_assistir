import { useState, type KeyboardEvent } from 'react'

type Props = { onSend: (text: string) => void; disabled: boolean }

export function Composer({ onSend, disabled }: Props) {
  const [text, setText] = useState('')

  const submit = () => {
    if (disabled || !text.trim()) return
    onSend(text)
    setText('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form className="composer" onSubmit={(e) => { e.preventDefault(); submit() }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder="Diga o que você quer assistir…"
        aria-label="Mensagem para o assistente"
        autoFocus
      />
      <button type="submit" className="btn btn-primary" disabled={disabled || !text.trim()}>
        Enviar <span aria-hidden>↵</span>
      </button>
    </form>
  )
}
