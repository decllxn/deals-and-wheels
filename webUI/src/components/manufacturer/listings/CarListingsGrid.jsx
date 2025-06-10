// CarListingsGrid.jsx
export function CarListingsGrid({ cars }) {
    if (cars.length === 0) {
      return <p className="text-center text-[var(--muted-text)]">No cars found in this view.</p>;
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="rounded-2xl overflow-hidden bg-white dark:bg-[var(--surface-color)] shadow-lg transition hover:shadow-xl"
          >
            <img src={car.image} alt={car.name} className="w-full h-56 object-cover" />
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-[var(--muted-text)] text-sm">{car.type}</p>
              <p className="text-lg font-bold text-[var(--accent-color)]">
                ${car.price.toLocaleString()}
              </p>
              <button className="w-full mt-2 py-2 px-4 text-sm font-medium rounded-lg bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }