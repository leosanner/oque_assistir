// PROTOTYPE — small primitives shared by the home variants (no layout here on purpose).
import { useState } from 'react'
import type { Movie } from './data'

export function Logo() {
  return (
    <span className="ph-logo">
      <span className="ph-logo-mark" aria-hidden>?</span>
      O Que Assistir
    </span>
  )
}

/** Typographic stand-in for a real TMDB poster. */
export function Poster({ movie, size = 'md' }: { movie: Movie; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <div className={`ph-poster ph-poster-${size}`} style={{ background: movie.tone, color: movie.ink }}>
      <span className="ph-poster-year">{movie.year}</span>
      <span className="ph-poster-title">{movie.title}</span>
      <span className="ph-poster-dir">{movie.director}</span>
    </div>
  )
}

export function Composer({
  onSend, placeholder = 'Diga o que você quer assistir…', disabled, compact,
}: { onSend: (t: string) => void; placeholder?: string; disabled?: boolean; compact?: boolean }) {
  const [text, setText] = useState('')
  return (
    <form
      className={`ph-composer ${compact ? 'is-compact' : ''}`}
      onSubmit={(e) => { e.preventDefault(); onSend(text); setText('') }}
    >
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label="Mensagem" />
      <button type="submit" className="ph-btn ph-btn-primary" disabled={disabled || !text.trim()}>
        Enviar <span aria-hidden>↵</span>
      </button>
    </form>
  )
}

export function Thinking() {
  return (
    <div className="ph-thinking" aria-live="polite">
      <span /><span /><span /> <em>consultando o catálogo</em>
    </div>
  )
}
