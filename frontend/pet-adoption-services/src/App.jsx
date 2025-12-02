import React, { useState } from "react";
import "./Style/theme.css";
import MenuBar from "./MenuBar.jsx";
import WelcomePage from "./WelcomePage.jsx";
import BrowsePetsPage from "./BrowsePetsPage.jsx";
import PetDetailsPage from "./PetDetailsPage.jsx";
import LoginPage from "./LoginPage.jsx";
import MyApplicationsPage from "./MyApplicationsPage.jsx";
import StaffDashboardPage from "./StaffDashBoardPage.jsx";

function App() {
  const [currentView, setCurrentView] = useState("welcome");

  const [selectedPet, setSelectedPet] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  function handleNav(target) {
    setCurrentView(target);
  }

  function handleSelectPet(pet) {
    setSelectedPet(pet);
    setCurrentView("petDetails");
  }

  function handleLogin(user) {
    setCurrentUser(user);
    setCurrentView("browse");
  }

  function handleLogout() {
    setCurrentUser(null);
    setSelectedPet(null);
    setCurrentView("welcome");
  }

  let mainContent = null;

  if (currentView === "welcome") {
    mainContent = (
      <WelcomePage onStartBrowse={() => setCurrentView("browse")} />
    );
  } else if (currentView === "browse") {
    mainContent = <BrowsePetsPage onSelectPet={handleSelectPet} />;
  } else if (currentView === "petDetails") {
    mainContent = (
      <PetDetailsPage
        pet={selectedPet}
        currentUser={currentUser}
        onBackToBrowse={() => setCurrentView("browse")}
        onRequireLogin={() => setCurrentView("login")}
      />
    );
  } else if (currentView === "login") {
    mainContent = (
      <LoginPage
        onLogin={handleLogin}
        onCancel={() => setCurrentView("welcome")}
      />
    );
  } else if (currentView === "applications") {
    mainContent = <MyApplicationsPage currentUser={currentUser} />;
  } else if (currentView === "staff") {
    mainContent = <StaffDashboardPage currentUser={currentUser} />;
  }

  return (
    <div className="app-root">
      <MenuBar
        currentUser={currentUser}
        onNavigate={handleNav}
        onLogout={handleLogout}
      />
      <div className="app-content">{mainContent}</div>
    </div>
  );
}

export default App;
