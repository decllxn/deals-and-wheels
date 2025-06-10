// CarListingsFilterBar.jsx
const carTypes = ['All', 'Coupe', 'Convertible', 'Sedan', 'SUV', 'Track'];

export function CarListingsFilterBar({ selectedType, setSelectedType }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {carTypes.map((type) => (
        <button
          key={type}
          onClick={() => setSelectedType(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            selectedType === type
              ? 'bg-[var(--accent-color)] text-white border-transparent'
              : 'bg-transparent text-[var(--muted-text)] border-[var(--border-color)] hover:border-[var(--text-color)]'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}