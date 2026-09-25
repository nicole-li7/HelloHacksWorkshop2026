import { useState } from 'react'

// Each type the opponent might be, and how to answer it.
// "use" = your moves that hit it super effectively.
// "avoid" = your moves it shrugs off.
const TYPES = [
  {
    name: 'Fire',
    icon: '🔥',
    button: 'bg-type-fire',
    ring: 'ring-type-fire',
    use: ['Water', 'Ground', 'Rock'],
    avoid: ['Fire', 'Grass', 'Bug', 'Steel', 'Ice', 'Fairy'],
  },
  {
    name: 'Water',
    icon: '💧',
    button: 'bg-type-water',
    ring: 'ring-type-water',
    use: ['Grass', 'Electric'],
    avoid: ['Fire', 'Water', 'Ice', 'Steel'],
  },
  {
    name: 'Grass',
    icon: '🌿',
    button: 'bg-type-grass',
    ring: 'ring-type-grass',
    use: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'],
    avoid: ['Water', 'Grass', 'Electric', 'Ground'],
  },
  {
    name: 'Ground',
    icon: '⛰️',
    button: 'bg-type-ground',
    ring: 'ring-type-ground',
    use: ['Water', 'Grass', 'Ice'],
    avoid: ['Poison', 'Rock', 'Electric'],
  },
]

function Pokeball({ className }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="#1b1b2f" strokeWidth="6" />
      <path d="M4 50a46 46 0 0 1 92 0Z" fill="#ee1515" stroke="#1b1b2f" strokeWidth="6" />
      <circle cx="50" cy="50" r="14" fill="#fff" stroke="#1b1b2f" strokeWidth="6" />
    </svg>
  )
}

// One row of type names, like "Water · Ground · Rock".
function TypeList({ types }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {types.map((type) => (
        <li
          key={type}
          className="rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-poke-ink shadow-sm"
        >
          {type}
        </li>
      ))}
    </ul>
  )
}

function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Pokedex top bar */}
      <header className="border-b-4 border-poke-ink bg-poke-red">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
          <Pokeball className="h-10 w-10 shrink-0 drop-shadow" />
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Pokémon Battle Assistant
            </h1>
            <p className="text-sm text-white/80">Know the matchup before you throw the ball.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <section className="rounded-2xl border-4 border-poke-ink bg-white p-6 shadow-lg sm:p-8">
          <h2 className="font-display text-xl font-semibold sm:text-2xl">
            What type of Pokémon are you facing?
          </h2>
          <p className="mt-1 text-slate-500">Pick one to see what to send out.</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TYPES.map((type) => (
              <button
                key={type.name}
                type="button"
                onClick={() => setSelected(type)}
                aria-pressed={selected?.name === type.name}
                className={`${type.button} flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 border-poke-ink px-3 py-4 font-display text-lg font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poke-blue active:translate-y-0 ${
                  selected?.name === type.name ? 'ring-4 ring-poke-yellow' : ''
                }`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {type.icon}
                </span>
                {type.name}
              </button>
            ))}
          </div>
        </section>

        {/* Result panel */}
        {selected ? (
          <section className="mt-6 rounded-2xl border-4 border-poke-ink bg-white p-6 shadow-lg sm:p-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {selected.icon}
              </span>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">
                Facing a {selected.name}-type
              </h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-4">
                <h3 className="font-display font-semibold text-emerald-800">
                  ✅ Super effective — use these
                </h3>
                <div className="mt-3">
                  <TypeList types={selected.use} />
                </div>
              </div>

              <div className="rounded-xl border-2 border-rose-500 bg-rose-50 p-4">
                <h3 className="font-display font-semibold text-rose-800">
                  ⚠️ Not very effective — avoid these
                </h3>
                <div className="mt-3">
                  <TypeList types={selected.avoid} />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <p className="mt-6 text-center text-slate-500">
            Choose a type above to see your best options.
          </p>
        )}
      </main>
    </div>
  )
}

export default App
