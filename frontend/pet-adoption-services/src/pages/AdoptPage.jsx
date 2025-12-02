import { useState, useEffect } from "react";

function AdoptPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedPetId: "",
    adoptionDate: "",
    notes: "",
  });

  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [petError, setPetError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // success/error message

  // Load pets for dropdown
  useEffect(() => {
    setLoadingPets(true);
    setPetError("");

    fetch("/api/pets")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pets");
        return res.json();
      })
      .then((data) => {
        setPets(data);
      })
      .catch((err) => {
        console.error("Error loading pets for adoption:", err);
        setPetError("Could not load pet list.");
      })
      .finally(() => {
        setLoadingPets(false);
      });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitStatus("");

    if (!form.selectedPetId) {
      setSubmitStatus("Please select a pet.");
      return;
    }

    const payload = {
      user_id: 1,
      pet_id: Number(form.selectedPetId),
      adoptionDate: form.adoptionDate,
      notes: form.notes,
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      const data = await res.json();
      console.log("Created application:", data);

      setSubmitStatus("Application submitted successfully!");

      //clear form 
      setForm({
        fullName: "",
        email: "",
        phone: "",
        selectedPetId: "",
        adoptionDate: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      setSubmitStatus("There was an error submitting your application.");
    }
  }

  const availablePets = pets.filter((pet) => pet.status === "Available");

  return (
    <section className="space-y-4 w-full">
      <h1 className="text-2xl font-bold text-slate-900">
        Adoption application
      </h1>

      <p className="text-sm text-slate-600">
        Fill out the form below to start an adoption request. This will create
        a record in the AdoptionApplications table.
      </p>

      {submitStatus && (
        <p className="text-sm mt-1 text-slate-700">{submitStatus}</p>
      )}

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

          {/* Pet dropdown */}
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Select a pet to adopt
            </label>

            {loadingPets && (
              <p className="text-xs text-slate-500 mt-1">
                Loading pets…
              </p>
            )}
            {petError && !loadingPets && (
              <p className="text-xs text-red-600 mt-1">{petError}</p>
            )}

            {!loadingPets && !petError && (
              <select
                name="selectedPetId"
                required
                value={form.selectedPetId}
                onChange={handleChange}
                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white"
              >
                <option value="">Choose a pet...</option>
                {availablePets.map((pet) => (
                  <option key={pet.pet_id} value={pet.pet_id}>
                    {pet.name} — {pet.species} ({pet.breed})
                  </option>
                ))}
              </select>
            )}
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
