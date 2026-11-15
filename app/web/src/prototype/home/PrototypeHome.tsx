// PROTOTYPE — "What should the O Que Assistir home look like?"
// Three variants of the home screen on the throwaway /prototype/home route,
// switchable via ?variant=A|B|C. Stub data only; nothing hits /api.
import { useState } from 'react'
import { PrototypeSwitcher } from '../PrototypeSwitcher'
import { useConversation } from './data'
import { VariantA, name as nameA } from './VariantA'
import { VariantB, name as nameB } from './VariantB'
import { VariantC, name as nameC } from './VariantC'
import './prototype-home.css'

const VARIANTS = [
  { key: 'A', name: nameA },
  { key: 'B', name: nameB },
  { key: 'C', name: nameC },
]

export default function PrototypeHome() {
  const [variant, setVariant] = useState(
    () => new URLSearchParams(location.search).get('variant')?.toUpperCase() ?? 'A',
  )
  const c = useConversation()

  const change = (key: string) => {
    const url = new URL(location.href)
    url.searchParams.set('variant', key)
    history.replaceState(null, '', url)
    setVariant(key)
  }

  return (
    <div className="ph-root">
      {variant === 'A' && <VariantA c={c} />}
      {variant === 'B' && <VariantB c={c} />}
      {variant === 'C' && <VariantC c={c} />}
      <PrototypeSwitcher
        variants={VARIANTS}
        current={variant}
        onChange={change}
        state={{
          variant, current: c.current?.id ?? null, accepted: c.accepted, dismissed: c.dismissed,
          filters: c.filters, thinking: c.thinking, messages: c.messages.length,
        }}
      />
    </div>
  )
}
