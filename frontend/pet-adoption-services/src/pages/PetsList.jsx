import { useState, useMemo, useEffect } from "react";
import PetCard from "../components/PetCard";

function PetsList() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch pets from backend
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("/api/pets")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch pets");
        }
        return res.json();
      })
      .then((data) => {
        setPets(data);
      })
      .catch((err) => {
        console.error("Error loading pets:", err);
        setError("Could not load pets from the server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSpecies =
        speciesFilter === "All" || pet.species === speciesFilter;

      const text = searchTerm.toLowerCase();
      const matchesSearch =
        pet.name.toLowerCase().includes(text) ||
        pet.breed.toLowerCase().includes(text) ||
        pet.species.toLowerCase().includes(text) ||
        (pet.shelter_name || "").toLowerCase().includes(text) ||
        (pet.location || "").toLowerCase().includes(text);

      return matchesSpecies && matchesSearch;
    });
  }, [pets, searchTerm, speciesFilter]);

  return (
    <section className="space-y-4 w-full">
      {/* Header + filters */}
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Available pets
          </h1>
          <p className="text-sm text-slate-600">
            Data is loaded from the SQLite database through the backend API.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, breed, species, shelter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-1 text-sm w-56"
          />

          <select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="All">All species</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
          </select>
        </div>
      </header>

      {/* Loading / error states */}
      {loading && <p className="text-sm text-slate-600">Loading pets…</p>}
      {error && !loading && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Pet cards */}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPets.length === 0 ? (
            <p className="text-sm text-slate-600">
              No pets match your filters yet.
            </p>
          ) : (
            filteredPets.map((pet) => (
              <PetCard key={pet.pet_id} pet={pet} />
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default PetsList;
