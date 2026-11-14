// PROTOTYPE — Variant A: conversation-first. One centred thread; the Recommendation
// lives inside the Assistant's Message; filters are a chip strip above the thread.
import { useEffect, useRef } from 'react'
import { MOVIES, SUGGESTIONS, type Conversation } from './data'
import { Composer, Logo, Poster, Thinking } from './shared'

export const name = 'Conversa'

export function VariantA({ c }: { c: Conversation }) {
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [c.messages.length, c.thinking])
  const lastRecMsg = [...c.messages].reverse().find((m) => m.recommendationId)?.id

  return (
    <div className="pa">
      <header className="pa-top">
        <Logo />
        <div className="pa-top-actions">
          <button className="ph-btn ph-btn-ghost">Histórico</button>
          <button className="ph-btn ph-btn-outline">+ Nova conversa</button>
        </div>
      </header>

      <div className="pa-filters">
        <span className="ph-label">Filtros ativos</span>
        <div className="pa-chips">
          {c.filters.map((f) => (
            <span key={f.attr} className={`pa-chip is-${f.source}`}>
              <span className="pa-chip-k">{f.label}</span>
              {f.value}
              {f.source === 'inferred' && <span className="pa-chip-tag">inferido</span>}
              <button onClick={() => c.removeFilter(f.attr)} aria-label={`Remover ${f.label}`}>×</button>
            </span>
          ))}
          <button className="pa-chip is-add">+ Filtro</button>
        </div>
      </div>

      <main className="pa-thread">
        <div className="pa-intro">
          <span className="ph-label">Terça, 21:40</span>
          <h1>O que vamos assistir hoje?</h1>
        </div>
        {c.messages.map((m) => (
          <div key={m.id} className={`pa-msg is-${m.role}`}>
            {m.role === 'assistant' && <span className="pa-avatar" aria-hidden>?</span>}
            <div className="pa-msg-body">
              <p>{m.text}</p>
              {m.recommendationId && (
                <RecCard
                  c={c}
                  id={m.recommendationId}
                  alts={m.alternatives ?? []}
                  live={m.id === lastRecMsg}
                />
              )}
            </div>
          </div>
        ))}
        {c.thinking && <div className="pa-msg is-assistant"><span className="pa-avatar">?</span><Thinking /></div>}
        <div ref={end} />
      </main>

      <footer className="pa-dock">
        <div className="pa-suggest">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => c.send(s)} className="ph-pill">{s}</button>
          ))}
        </div>
        <Composer onSend={c.send} disabled={c.thinking} />
      </footer>
    </div>
  )
}

function RecCard({ c, id, alts, live }: { c: Conversation; id: string; alts: string[]; live: boolean }) {
  const m = MOVIES[id]
  const isDismissed = c.dismissed.includes(id)
  const isAccepted = c.accepted === id
  return (
    <article className={`pa-rec ${live ? '' : 'is-past'} ${isDismissed ? 'is-dismissed' : ''}`}>
      <Poster movie={m} size="sm" />
      <div className="pa-rec-body">
        <span className="ph-label ph-accent">Recomendação</span>
        <h3>{m.title} {m.original && <small>({m.original})</small>}</h3>
        <div className="ph-meta">
          <span>{m.year}</span><span>{m.runtime}</span><span>★ {m.rating}</span><span>{m.director}</span>
        </div>
        <p className="pa-rec-why">{m.why}</p>
        {live && !isDismissed && (
          <div className="pa-rec-actions">
            <button className="ph-btn ph-btn-primary" onClick={() => c.accept(id)} disabled={isAccepted}>
              {isAccepted ? '✓ Escolhido' : 'Vou assistir'}
            </button>
            <button className="ph-btn ph-btn-outline" onClick={() => c.dismiss(id)}>Já vi · próximo</button>
          </div>
        )}
        {isDismissed && <span className="ph-label">Dispensado</span>}
        {alts.length > 0 && (
          <div className="pa-alts">
            <span className="ph-label">Alternativas</span>
            {alts.map((a) => <span key={a} className="pa-alt">{MOVIES[a].title} <em>{MOVIES[a].year}</em></span>)}
          </div>
        )}
      </div>
    </article>
  )
}
