import React from "react";

function MenuBar({ currentUser, onNavigate, onLogout }) {
  const isAdopter = currentUser && currentUser.role === "ADOPTER";
  const isStaff = currentUser && currentUser.role === "STAFF";

  return (
    <header className="menu-bar-root">
      <div className="menu-left">
        <span className="app-title">
          Happy Tails Animal Shelter
        </span>
      </div>
      <nav className="menu-right">
        <button
          className="menu-button"
          onClick={() => onNavigate("welcome")}
        >
          Home
        </button>
        <button
          className="menu-button"
          onClick={() => onNavigate("browse")}
        >
          Browse Pets
        </button>
        {isAdopter && (
          <button
            className="menu-button"
            onClick={() => onNavigate("applications")}
          >
            My Applications
          </button>
        )}
        {isStaff && (
          <button
            className="menu-button"
            onClick={() => onNavigate("staff")}
          >
            Staff Dashboard
          </button>
        )}
        {!currentUser && (
          <button
            className="menu-button primary"
            onClick={() => onNavigate("login")}
          >
            Login / Create Account
          </button>
        )}
        {currentUser && (
          <button
            className="menu-button primary"
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default MenuBar;
