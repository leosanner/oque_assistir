// PROTOTYPE — Variant C: editorial. The Recommendation is the page; filters are a
// query bar of form controls up top; the conversation collapses into a command line
// at the bottom that expands into a transcript drawer.
import { useState } from 'react'
import { MOVIES, SUGGESTIONS, type Conversation } from './data'
import { Composer, Logo, Poster, Thinking } from './shared'

export const name = 'Editorial'

export function VariantC({ c }: { c: Conversation }) {
  const [open, setOpen] = useState(false)
  const m = c.current
  const lastAssistant = [...c.messages].reverse().find((x) => x.role === 'assistant')
  const alts = [...c.messages].reverse().find((x) => x.alternatives)?.alternatives ?? []
  const step = c.dismissed.length + 1

  return (
    <div className="pc">
      <header className="pc-top">
        <Logo />
        <nav className="pc-nav">
          <a className="is-active">Hoje</a><a>Minha lista</a><a>Histórico</a>
        </nav>
      </header>

      <div className="pc-query">
        {c.filters.map((f) => (
          <label key={f.attr} className={`pc-field is-${f.source}`}>
            <span className="pc-field-k">{f.label}{f.source === 'inferred' && <i title="Inferido da conversa">IA</i>}</span>
            <span className="pc-field-v">{f.value} <span aria-hidden>▾</span></span>
          </label>
        ))}
        <button className="ph-btn ph-btn-outline pc-query-add">+ Filtro</button>
      </div>

      {m ? (
        <main className="pc-hero">
          <div className="pc-hero-poster"><Poster movie={m} size="xl" /></div>
          <div className="pc-hero-text">
            <div className="pc-kicker">
              <span className="ph-label ph-accent">Recomendação nº {String(step).padStart(2, '0')}</span>
              <span className="ph-meta"><span>{m.genre}</span><span>{m.year}</span><span>{m.runtime}</span><span>★ {m.rating}</span></span>
            </div>
            <h1>{m.title}</h1>
            <p className="pc-byline">de {m.director} · com {m.actors}</p>
            <p className="pc-desc">{m.description}</p>
            <blockquote className="pc-why">
              <span className="ph-label">Por que esta, hoje</span>
              {m.why}
            </blockquote>
            <div className="pc-actions">
              <button className="ph-btn ph-btn-primary ph-btn-lg" onClick={() => c.accept(m.id)} disabled={c.accepted === m.id}>
                {c.accepted === m.id ? '✓ Escolhido' : 'Vou assistir'}
              </button>
              <button className="ph-btn ph-btn-outline ph-btn-lg" onClick={() => c.dismiss(m.id)}>Já vi — próximo</button>
            </div>
          </div>
        </main>
      ) : (
        <main className="pc-hero pc-hero-empty"><h1>Nada bate com os filtros.</h1></main>
      )}

      <section className="pc-shelf">
        <div className="pc-shelf-col">
          <span className="ph-label">Também na mesa</span>
          <ol>
            {alts.map((a, i) => (
              <li key={a}><span className="pc-n">{String(i + 2).padStart(2, '0')}</span>{MOVIES[a].title}<em>{MOVIES[a].year} · {MOVIES[a].director}</em></li>
            ))}
          </ol>
        </div>
        <div className="pc-shelf-col">
          <span className="ph-label">Fora da mesa</span>
          {c.dismissed.length === 0
            ? <p className="ph-muted">Filmes que você dispensar aparecem aqui e não voltam nesta conversa.</p>
            : <ol className="pc-struck">{c.dismissed.map((d) => <li key={d}>{MOVIES[d].title}</li>)}</ol>}
        </div>
      </section>

      <div className={`pc-console ${open ? 'is-open' : ''}`}>
        {open && (
          <div className="pc-transcript">
            {c.messages.map((msg) => (
              <p key={msg.id} className={`is-${msg.role}`}>
                <span>{msg.role === 'user' ? 'você' : 'assistente'}</span>{msg.text}
              </p>
            ))}
            {c.thinking && <Thinking />}
          </div>
        )}
        <div className="pc-console-bar">
          <button className="pc-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? '▾ fechar' : `▴ conversa (${c.messages.length})`}
          </button>
          {!open && (
            <span className="pc-last">{c.thinking ? 'Assistente está pensando…' : lastAssistant?.text}</span>
          )}
        </div>
        <div className="pc-console-input">
          <div className="pc-suggest">
            {SUGGESTIONS.slice(0, 3).map((s) => <button key={s} className="ph-pill" onClick={() => c.send(s)}>{s}</button>)}
          </div>
          <Composer compact onSend={c.send} disabled={c.thinking} placeholder="Refine com o assistente: “algo mais leve”, “pode ser em português”…" />
        </div>
      </div>
    </div>
  )
}
