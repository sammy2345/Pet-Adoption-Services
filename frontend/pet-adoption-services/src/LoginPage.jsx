import React, { useState } from "react";

function LoginPage({ onLogin, onCancel }) {
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("ADOPTER");

  function handleSubmit(e) {
    e.preventDefault();

    // This is a simple stub so we can demo roles.
    // Must be rplaced  with real backend login using Users table.
    const fakeUser = {
      id: 1,
      firstName: firstName || "Guest",
      role,
    };
    onLogin(fakeUser);
  }

  return (
    <div className="scene-root">
      <div className="card auth-card">
        <h1 className="scene-title">
          Login or Create Account
        </h1>
        <p className="scene-subtitle">
          For the demo, choose a role to see adopter or staff views.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-label">
            First name
          </label>
          <input
            className="form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jordan"
          />

          <label className="form-label">
            Role
          </label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ADOPTER">Adopter</option>
            <option value="STAFF">Staff</option>
          </select>

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
            >
              Continue
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
