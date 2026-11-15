// PROTOTYPE — throwaway stub data for the home UI prototype. Not wired to the API.
import { useState } from 'react'

export type Movie = {
  id: string
  title: string
  original?: string
  year: string
  genre: string
  director: string
  actors: string
  rating: string
  runtime: string
  description: string
  why: string
  tone: string // poster base colour
  ink: string // poster type colour
}

export const MOVIES: Record<string, Movie> = {
  arrival: {
    id: 'arrival', title: 'A Chegada', original: 'Arrival', year: '2016', genre: 'Ficção científica',
    director: 'Denis Villeneuve', actors: 'Amy Adams, Jeremy Renner', rating: '7.9', runtime: '1h56',
    description: 'Uma linguista é recrutada para se comunicar com visitantes que chegaram em doze naves espalhadas pelo planeta.',
    why: 'Ficção científica que pensa antes de explodir: o conflito é decifrar uma língua, não vencer uma guerra. Cabe nas suas duas horas e passa da nota mínima.',
    tone: '#3E4A47', ink: '#E8EDE6',
  },
  coherence: {
    id: 'coherence', title: 'Coherence', year: '2013', genre: 'Ficção científica',
    director: 'James Ward Byrkit', actors: 'Emily Baldoni, Maury Sterling', rating: '7.2', runtime: '1h29',
    description: 'Durante a passagem de um cometa, um jantar entre amigos se fragmenta em realidades paralelas.',
    why: 'Um quebra-cabeça de baixo orçamento e muita ideia, em 89 minutos. Fica um pouco abaixo da nota 7.5 — estou sinalizando porque você pediu algo cerebral.',
    tone: '#1F2A36', ink: '#D9E4EF',
  },
  exmachina: {
    id: 'exmachina', title: 'Ex Machina', year: '2014', genre: 'Ficção científica',
    director: 'Alex Garland', actors: 'Alicia Vikander, Domhnall Gleeson', rating: '7.7', runtime: '1h48',
    description: 'Um programador é convidado a avaliar se a inteligência artificial criada por um recluso CEO tem consciência.',
    why: 'Três personagens, uma casa e uma pergunta sobre consciência. Tensão constante sem precisar de ação.',
    tone: '#5A3A2E', ink: '#F4E6DC',
  },
  her: {
    id: 'her', title: 'Ela', original: 'Her', year: '2013', genre: 'Ficção científica',
    director: 'Spike Jonze', actors: 'Joaquin Phoenix, Scarlett Johansson', rating: '8.0', runtime: '2h06',
    description: 'Um escritor solitário se apaixona por um sistema operacional com voz e personalidade próprias.',
    why: 'Ficção científica íntima, mais sobre pessoas do que sobre tecnologia. Passa 6 minutos do seu limite de duração.',
    tone: '#7A4B3A', ink: '#FFEDE3',
  },
  annihilation: {
    id: 'annihilation', title: 'Aniquilação', original: 'Annihilation', year: '2018', genre: 'Ficção científica',
    director: 'Alex Garland', actors: 'Natalie Portman, Tessa Thompson', rating: '6.8', runtime: '1h55',
    description: 'Uma bióloga entra em uma zona isolada onde as leis da natureza deixaram de funcionar.',
    why: 'Estranho, bonito e ambíguo. Abaixo da nota mínima — só ofereço se você relaxar esse filtro.',
    tone: '#2F4034', ink: '#E2F0DF',
  },
}

const QUEUE = ['arrival', 'exmachina', 'coherence', 'her', 'annihilation']

export type Filter = { attr: string; label: string; value: string; source: 'set' | 'inferred'; overridden?: boolean }

export type Message = {
  id: number
  role: 'user' | 'assistant'
  text: string
  recommendationId?: string
  alternatives?: string[]
}

const INITIAL_FILTERS: Filter[] = [
  { attr: 'genre', label: 'Gênero', value: 'Ficção científica', source: 'inferred' },
  { attr: 'year', label: 'Ano', value: '2010 – hoje', source: 'set' },
  { attr: 'rating', label: 'Nota mínima', value: '≥ 7.5', source: 'set' },
  { attr: 'runtime', label: 'Duração', value: '≤ 2h', source: 'inferred' },
]

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: 'user', text: 'Quero algo de ficção científica mais cerebral, nada muito longo. Hoje tô sem paciência pra filme de 3 horas.' },
  {
    id: 2, role: 'assistant',
    text: 'Entendi: ficção científica de ideia, até duas horas. Mantive seus filtros de ano (2010+) e nota (≥ 7.5).',
    recommendationId: 'arrival', alternatives: ['exmachina', 'coherence'],
  },
]

let nextId = 100

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [filters, setFilters] = useState<Filter[]>(INITIAL_FILTERS)
  const [currentId, setCurrentId] = useState<string | null>('arrival')
  const [dismissed, setDismissed] = useState<string[]>([])
  const [accepted, setAccepted] = useState<string | null>(null)
  const [thinking, setThinking] = useState(false)

  const pickNext = (exclude: string[]) => {
    const rest = QUEUE.filter((id) => !exclude.includes(id))
    return { rec: rest[0] ?? null, alts: rest.slice(1, 3) }
  }

  const reply = (text: string, exclude: string[]) => {
    setThinking(true)
    setTimeout(() => {
      const { rec, alts } = pickNext(exclude)
      setCurrentId(rec)
      setMessages((m) => [
        ...m,
        rec
          ? { id: nextId++, role: 'assistant', text, recommendationId: rec, alternatives: alts }
          : { id: nextId++, role: 'assistant', text: 'Nada mais bate com os filtros ativos. Posso relaxar a nota mínima para ≥ 6.5?' },
      ])
      setThinking(false)
    }, 900)
  }

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages((m) => [...m, { id: nextId++, role: 'user', text }])
    const exclude = [...dismissed, ...(currentId ? [currentId] : [])]
    reply('Anotado. Com isso em mente, tenta este:', exclude)
  }

  const dismiss = (id: string) => {
    const nextDismissed = [...dismissed, id]
    setDismissed(nextDismissed)
    setAccepted(null)
    setMessages((m) => [...m, { id: nextId++, role: 'user', text: `Já vi ${MOVIES[id].title}, próximo.` }])
    reply('Tirei da lista. Mesmos filtros, próxima opção:', nextDismissed)
  }

  const accept = (id: string) => {
    setAccepted(id)
    setMessages((m) => [
      ...m,
      { id: nextId++, role: 'user', text: `Vou assistir ${MOVIES[id].title}.` },
      { id: nextId++, role: 'assistant', text: `Boa escolha. ${MOVIES[id].title} tem ${MOVIES[id].runtime} — dá tempo de sobra hoje.` },
    ])
  }

  const removeFilter = (attr: string) => setFilters((f) => f.filter((x) => x.attr !== attr))

  return {
    messages, filters, dismissed, accepted, thinking,
    current: currentId ? MOVIES[currentId] : null,
    send, dismiss, accept, removeFilter,
  }
}

export type Conversation = ReturnType<typeof useConversation>

export const SUGGESTIONS = ['Algo mais leve', 'Só filmes brasileiros', 'Pode passar de 2h', 'Com final aberto']
