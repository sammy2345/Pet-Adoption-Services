// App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PetsList from "./pages/PetsList";
import AdoptPage from "./pages/AdoptPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetsList />} />
          <Route path="/adopt" element={<AdoptPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
