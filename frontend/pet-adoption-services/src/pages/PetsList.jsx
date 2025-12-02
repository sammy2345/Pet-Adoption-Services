import { useState, useMemo } from "react";
import PetCard from "../components/PetCard";

const MOCK_PETS = [
  {
    id: 1,
    name: "Luna",
    species: "Dog",
    breed: "Mixed",
    age: 2,
    gender: "Female",
    status: "Available",
    shelterName: "Downtown Shelter",
    isSpecial: false,
  },
  {
    id: 2,
    name: "Mittens",
    species: "Cat",
    breed: "Domestic Shorthair",
    age: 3,
    gender: "Male",
    status: "Available",
    shelterName: "West Side Rescue",
    isSpecial: true,
  },
  {
    id: 3,
    name: "Rocky",
    species: "Dog",
    breed: "Pit Bull Mix",
    age: 4,
    gender: "Male",
    status: "Pending",
    shelterName: "Downtown Shelter",
    isSpecial: false,
  },
];

function PetsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");

  // Filter pets by species and search text
  const filteredPets = useMemo(() => {
    return MOCK_PETS.filter((pet) => {
      const matchesSpecies =
        speciesFilter === "All" || pet.species === speciesFilter;

      const text = searchTerm.toLowerCase();
      const matchesSearch =
        pet.name.toLowerCase().includes(text) ||
        pet.breed.toLowerCase().includes(text) ||
        pet.shelterName.toLowerCase().includes(text);

      return matchesSpecies && matchesSearch;
    });
  }, [searchTerm, speciesFilter]);

  return (
    // Center the whole pets page.
    <section className="space-y-4 w-full">
      {/* Header + filters */}
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Available pets
          </h1>
          <p className="text-sm text-slate-600">
            List of pets currently up for adoption.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, breed, shelter..."
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

      {/* List of pet cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPets.length === 0 ? (
          <p className="text-sm text-slate-600">
            No pets match your filters yet.
          </p>
        ) : (
          filteredPets.map((pet) => <PetCard key={pet.id} pet={pet} />)
        )}
      </div>
    </section>
  );
}

export default PetsList;
