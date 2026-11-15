// PROTOTYPE — Variant B: split workspace. Conversation on the left stays text-only;
// a persistent curation panel on the right owns the Recommendation, Active Filters
// (with Set vs Inferred spelled out), Alternatives and Dismissed Movies.
import { useEffect, useRef } from 'react'
import { MOVIES, type Conversation } from './data'
import { Composer, Logo, Poster, Thinking } from './shared'

export const name = 'Mesa de curadoria'

export function VariantB({ c }: { c: Conversation }) {
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [c.messages.length, c.thinking])
  const m = c.current
  const lastAlts = [...c.messages].reverse().find((x) => x.alternatives)?.alternatives ?? []

  return (
    <div className="pb">
      <aside className="pb-rail">
        <Logo />
        <button className="ph-btn ph-btn-outline pb-new">+ Nova conversa</button>
        <span className="ph-label">Recentes</span>
        <ul className="pb-history">
          <li className="is-active">Sci-fi cerebral, até 2h</li>
          <li>Comédia pra ver com a família</li>
          <li>Terror dos anos 80</li>
          <li>Algo parecido com Aftersun</li>
        </ul>
        <div className="pb-rail-foot">
          <span className="ph-label">Catálogo</span>
          <span className="pb-status"><i /> TMDB conectado</span>
        </div>
      </aside>

      <section className="pb-chat">
        <header className="pb-chat-head">
          <div>
            <span className="ph-label">Conversa</span>
            <h2>Sci-fi cerebral, até 2h</h2>
          </div>
          <span className="ph-meta"><span>{c.messages.length} mensagens</span></span>
        </header>
        <div className="pb-log">
          {c.messages.map((msg) => (
            <div key={msg.id} className={`pb-line is-${msg.role}`}>
              <span className="pb-who">{msg.role === 'user' ? 'Você' : 'Assistente'}</span>
              <div>
                <p>{msg.text}</p>
                {msg.recommendationId && (
                  <span className="pb-ref">→ Recomendação: <b>{MOVIES[msg.recommendationId].title}</b></span>
                )}
              </div>
            </div>
          ))}
          {c.thinking && <div className="pb-line is-assistant"><span className="pb-who">Assistente</span><Thinking /></div>}
          <div ref={end} />
        </div>
        <div className="pb-composer"><Composer onSend={c.send} disabled={c.thinking} /></div>
      </section>

      <section className="pb-panel">
        {m ? (
          <div className="pb-hero">
            <Poster movie={m} size="lg" />
            <div className="pb-hero-body">
              <span className="ph-label ph-accent">Recomendação atual</span>
              <h1>{m.title}</h1>
              {m.original && <span className="pb-orig">{m.original}</span>}
              <dl className="pb-facts">
                <div><dt>Ano</dt><dd>{m.year}</dd></div>
                <div><dt>Duração</dt><dd>{m.runtime}</dd></div>
                <div><dt>Nota</dt><dd>★ {m.rating}</dd></div>
                <div><dt>Direção</dt><dd>{m.director}</dd></div>
              </dl>
              <p className="pb-desc">{m.description}</p>
              <div className="pb-why">
                <span className="ph-label">Por que combina</span>
                <p>{m.why}</p>
              </div>
              <div className="pb-actions">
                <button className="ph-btn ph-btn-primary" onClick={() => c.accept(m.id)} disabled={c.accepted === m.id}>
                  {c.accepted === m.id ? '✓ Escolhido' : 'Vou assistir'}
                </button>
                <button className="ph-btn ph-btn-outline" onClick={() => c.dismiss(m.id)}>Já vi</button>
                <button className="ph-btn ph-btn-ghost" onClick={() => c.dismiss(m.id)}>Não quero</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="pb-empty">Nenhuma recomendação para os filtros ativos.</div>
        )}

        <div className="pb-grid">
          <div className="pb-box">
            <div className="pb-box-head"><span className="ph-label">Filtros ativos</span><button className="ph-link">+ adicionar</button></div>
            <table className="pb-table">
              <tbody>
                {c.filters.map((f) => (
                  <tr key={f.attr}>
                    <td className="pb-k">{f.label}</td>
                    <td>{f.value}</td>
                    <td><span className={`pb-src is-${f.source}`}>{f.source === 'set' ? 'definido' : 'inferido'}</span></td>
                    <td><button className="ph-x" onClick={() => c.removeFilter(f.attr)} aria-label={`Remover ${f.label}`}>×</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pb-box">
            <div className="pb-box-head"><span className="ph-label">Alternativas</span></div>
            <ul className="pb-mini">
              {lastAlts.map((a) => (
                <li key={a}><Poster movie={MOVIES[a]} size="xs" /><span>{MOVIES[a].title}<em>{MOVIES[a].year} · ★ {MOVIES[a].rating}</em></span></li>
              ))}
            </ul>
            <div className="pb-box-head pb-sub"><span className="ph-label">Dispensados</span><span className="ph-count">{c.dismissed.length}</span></div>
            {c.dismissed.length === 0
              ? <p className="ph-muted">Nada dispensado ainda.</p>
              : <ul className="pb-struck">{c.dismissed.map((d) => <li key={d}>{MOVIES[d].title}</li>)}</ul>}
          </div>
        </div>
      </section>
    </div>
  )
}
