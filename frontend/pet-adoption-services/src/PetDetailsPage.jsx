import React, { useState } from "react";

function PetDetailsPage({
  pet,
  currentUser,
  onBackToBrowse,
  onRequireLogin,
}) {
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  if (!pet) {
    return (
      <div className="scene-root">
        <div className="card">
          <p>No pet selected.</p>
          <button
            className="secondary-button"
            onClick={onBackToBrowse}
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const canApply =
    currentUser && currentUser.role === "ADOPTER";

  function handleSubmit(e) {
    e.preventDefault();

    if (!currentUser) {
      onRequireLogin();
      return;
    }

    // Must be updated to: POST /api/applications with user_id, pet_id, message
    // For now this is just  a mock confirmation
    setSubmitStatus(
      "Application submitted (mock). This will call a backend endpoint that inserts into AdoptionApplications."
    );
    setMessage("");
  }

  return (
    <div className="scene-root">
      <div className="card details-card">
        <button
          className="link-button"
          onClick={onBackToBrowse}
        >
          ← Back to available pets
        </button>

        <div className="details-layout">
          <div className="details-left">
            <div className="pet-large-image">
              <span className="pet-image-text">
                {pet.species}
              </span>
            </div>
          </div>
          <div className="details-right">
            <h1 className="scene-title">{pet.name}</h1>
            <p className="pet-type">
              {pet.species} · {pet.breed}
            </p>
            <p className="pet-meta">
              Age: {pet.age ?? "Unknown"}  
              <span className="pet-dot">•</span>
              {pet.gender}
            </p>
            <p className="pet-location">
              Shelter: Happy Tails Animal Shelter, {pet.location}
            </p>
            <p className="pet-status">
              Status: {pet.status}
            </p>
            <p className="pet-about">
              {pet.about}
            </p>

            <hr className="divider" />

            <h2 className="section-title">
              Adoption Application
            </h2>
            {!currentUser && (
              <p className="helper-text">
                You need to log in as an adopter before submitting an application.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <label className="form-label">
                Tell us about your home and why you want to adopt {pet.name}
              </label>
              <textarea
                className="form-textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!canApply}
              />
              <div className="form-actions">
                <button
                  type="submit"
                  className="primary-button"
                  disabled={!canApply || message.trim() === ""}
                >
                  Submit Application
                </button>
              </div>
            </form>

            {submitStatus && (
              <p className="status-text">
                {submitStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetailsPage;
