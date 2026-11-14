// PROTOTYPE — floating variant switcher. Only mounted in dev (see main.tsx).
import { useEffect, useState } from 'react'

type Props = {
  variants: { key: string; name: string }[]
  current: string
  onChange: (key: string) => void
  state?: unknown
}

export function PrototypeSwitcher({ variants, current, onChange, state }: Props) {
  const [showState, setShowState] = useState(false)
  const i = Math.max(0, variants.findIndex((v) => v.key === current))
  const go = (d: number) => onChange(variants[(i + d + variants.length) % variants.length].key)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, [contenteditable]')) return
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <>
      {showState && (
        <pre className="proto-state">{JSON.stringify(state, null, 2)}</pre>
      )}
      <div className="proto-switcher" role="toolbar" aria-label="Prototype variant switcher">
        <button onClick={() => go(-1)} aria-label="Previous variant">←</button>
        <span>
          <b>{variants[i].key}</b> {variants[i].name}
        </span>
        <button onClick={() => go(1)} aria-label="Next variant">→</button>
        <button className="proto-switcher-state" onClick={() => setShowState((s) => !s)}>
          {showState ? 'hide state' : 'state'}
        </button>
      </div>
    </>
  )
}
