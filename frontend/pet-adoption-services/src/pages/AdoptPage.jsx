import { useState } from "react";

//imple mock list of pets.
const MOCK_PETS = [
  {
    id: 1,
    name: "Luna",
    species: "Dog",
    breed: "Mixed",
    status: "Available",
  },
  {
    id: 2,
    name: "Mittens",
    species: "Cat",
    breed: "Domestic Shorthair",
    status: "Available",
  },
  {
    id: 3,
    name: "Rocky",
    species: "Dog",
    breed: "Pit Bull Mix",
    status: "Pending",
  },
];

function AdoptPage() {
  // Form state stored in one object
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedPetId: "",   // dropdown section for pets
    adoptionDate: "",
    notes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Adoption form submitted:", form);
    alert("Right now this just logs to the console. Backend comes later!");
  }

  // Only show pets that are available
  const availablePets = MOCK_PETS.filter((pet) => pet.status === "Available");

  return (
    <section className="space-y-4 w-full">
      <h1 className="text-2xl font-bold text-slate-900">
        Adoption application
      </h1>

      <p className="text-sm text-slate-600">
        Fill out the form below to start an adoption request. Find the pet that you would like to adopt,
        fill in an appointment date, phone number
        , name, email,and notes.
      </p>

      {/* Full-width white form area */}
      <div className="w-full bg-white shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 sm:p-6 space-y-3"
        >
          {/* Full name */}
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          {/* Email + phone */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm"
              />
            </div>
          </div>

          {/*Dropdown to pick a pet */}
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Select a pet to adopt
            </label>
            <select
              name="selectedPetId"
              required
              value={form.selectedPetId}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white"
            >
              <option value="">Choose a pet...</option>
              {availablePets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} — {pet.species} ({pet.breed})
                </option>
              ))}
            </select>
          </div>

          {/* Preferred adoption date */}
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Preferred adoption date
            </label>
            <input
              type="date"
              name="adoptionDate"
              required
              value={form.adoptionDate}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Notes
            </label>
            <textarea
              name="notes"
              rows="3"
              value={form.notes}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm"
          >
            Submit application
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdoptPage;
