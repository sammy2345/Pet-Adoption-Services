import React from "react";

function PetCard({ pet, onSelect }) {
  return (
    <div className="pet-card">
      <div className="pet-image-placeholder">
        <span className="pet-image-text">
          {pet.species}
        </span>
      </div>
      <div className="pet-card-body">
        <h3 className="pet-name">{pet.name}</h3>
        <p className="pet-type">
          {pet.species} · {pet.breed}
        </p>
        <p className="pet-meta">
          Age: {pet.age ?? "Unknown"}  
          <span className="pet-dot">•</span>
          {pet.gender}
        </p>
        <p className="pet-location">
          {pet.location}
        </p>
        <p className="pet-status">
          Status: {pet.status}
        </p>
        <p className="pet-about">
          {pet.about}
        </p>
        <button
          className="secondary-button"
          onClick={() => onSelect(pet)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PetCard;
