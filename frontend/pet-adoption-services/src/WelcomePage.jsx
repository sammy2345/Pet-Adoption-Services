import React, { useState } from "react";

const PET_TYPES = [
  { id: 1, label: "Dog – Labradoodle" },
  { id: 2, label: "Cat – Maine Coon" },
  { id: 3, label: "Dog – German Shepherd" },
];

function WelcomePage({ onStartBrowse }) {
  const [selectedTypeId, setSelectedTypeId] = useState("");

  function handleContinue() {
    // For now we just go to Browse;will need to use selectedTypeId
    onStartBrowse();
  }

  return (
    <div className="scene-root">
      <div className="card welcome-card">
        <h1 className="welcome-main">
          Welcome to Happy Tails
        </h1>
        <h2 className="welcome-sub">
          Pet Adoption Services
        </h2>

        <p className="welcome-text">
          Browse available pets, submit adoption applications,
          and help our animals find their new homes.
        </p>

        <div className="form-row">
          <label className="form-label">
            Start by choosing a pet type you are interested in
          </label>
          <select
            className="form-select"
            value={selectedTypeId}
            onChange={(e) => setSelectedTypeId(e.target.value)}
          >
            <option value="">Any type</option>
            {PET_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="primary-button"
          onClick={handleContinue}
        >
          View Available Pets
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
