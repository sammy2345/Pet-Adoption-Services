import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";

// temporary sample data that mirrors seed.sql Pets table
const SAMPLE_PETS = [
  {
    pet_id: 1,
    name: "Aurora",
    age: 3,
    gender: "Female",
    location: "Chicago, IL",
    status: "Available",
    about:
      "Very energetic and loves to play. Sweet, affectionate personality.",
    species: "Dog",
    breed: "Labradoodle",
  },
  {
    pet_id: 2,
    name: "Sage",
    age: 2,
    gender: "Female",
    location: "Chicago, IL",
    status: "Available",
    about:
      "Calm, cuddly cat who enjoys attention. Great for apartments.",
    species: "Cat",
    breed: "Maine Coon",
  },
  {
    pet_id: 3,
    name: "Violet",
    age: 5,
    gender: "Male",
    location: "Chicago, IL",
    status: "Pending",
    about:
      "Athletic and loyal dog who loves long walks and playing fetch.",
    species: "Dog",
    breed: "German Shepherd",
  },
];

function BrowsePetsPage({ onSelectPet }) {
  const [pets, setPets] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Available");

  useEffect(() => {
    // For now, use static sample data.
    //needs to replace this with: fetch("/api/pets?status=" + filterStatus) ...
    setPets(SAMPLE_PETS);
  }, []);

  const filtered = pets.filter((p) =>
    filterStatus === "All" ? true : p.status === filterStatus
  );

  return (
    <div className="scene-root">
      <div className="card browse-card">
        <div className="browse-header">
          <div>
            <h1 className="scene-title">Available Pets</h1>
            <p className="scene-subtitle">
              Select a pet to see more details and start an adoption application.
            </p>
          </div>
          <div className="filter-row">
            <label className="form-label">
              Filter by status
            </label>
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Available">Available only</option>
              <option value="All">All statuses</option>
            </select>
          </div>
        </div>

        <div className="pet-grid">
          {filtered.map((pet) => (
            <PetCard
              key={pet.pet_id}
              pet={pet}
              onSelect={onSelectPet}
            />
          ))}
          {filtered.length === 0 && (
            <p className="empty-text">
              No pets found for this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowsePetsPage;
