import { useState, useEffect } from "react";

function StaffDashboard() {
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(true);
  const [apptsError, setApptsError] = useState("");

  // New pet form state
  const [newPet, setNewPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    location: "",
    about: "",
  });
  const [petSubmitStatus, setPetSubmitStatus] = useState("");

  // Applications state (for seeing notes)
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [appsError, setAppsError] = useState("");

  // Fetch appointments
  useEffect(() => {
    setLoadingAppts(true);
    setApptsError("");

    fetch("/api/appointments")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch appointments");
        return res.json();
      })
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => {
        console.error("Error loading appointments:", err);
        setApptsError("Could not load appointments from the server.");
      })
      .finally(() => {
        setLoadingAppts(false);
      });
  }, []);

  // Fetch applications (includes applicant_message = notes)
  useEffect(() => {
    setLoadingApps(true);
    setAppsError("");

    fetch("/api/applications")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch applications");
        return res.json();
      })
      .then((data) => {
        setApplications(data);
      })
      .catch((err) => {
        console.error("Error loading applications:", err);
        setAppsError("Could not load adoption applications from the server.");
      })
      .finally(() => {
        setLoadingApps(false);
      });
  }, []);

  // Approve / Disapprove appointment → update status
  function updateStatus(appointmentId, newStatus) {
    fetch(`/api/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update appointment");
        return res.json();
      })
      .then(() => {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.appointment_id === appointmentId
              ? { ...appt, status: newStatus }
              : appt
          )
        );
      })
      .catch((err) => {
        console.error("Error updating appointment:", err);
        alert("Failed to update appointment status.");
      });
  }

  // Handle new pet form input
  function handleNewPetChange(e) {
    const { name, value } = e.target;
    setNewPet((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Submit new pet
  async function handleNewPetSubmit(e) {
    e.preventDefault();
    setPetSubmitStatus("");

    if (!newPet.name || !newPet.species || !newPet.breed) {
      setPetSubmitStatus("Name, species, and breed are required.");
      return;
    }

    const payload = {
      name: newPet.name,
      species: newPet.species,
      breed: newPet.breed,
      age: newPet.age ? Number(newPet.age) : null,
      gender: newPet.gender || null,
      location: newPet.location || null,
      about: newPet.about || null,
      shelter_id: 1, // for now, Happy Tails shelter
    };

    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create pet");
      }

      const createdPet = await res.json();
      console.log("New pet created:", createdPet);

      setPetSubmitStatus(
        "Pet added successfully! It will appear on the Pets and Adopt pages."
      );

      setNewPet({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        location: "",
        about: "",
      });
    } catch (err) {
      console.error("Error creating pet:", err);
      setPetSubmitStatus("Error: could not add pet. Check console.");
    }
  }

  return (
    <section className="w-full space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Staff dashboard
      </h1>

      {/* 1) Add new pet */}
      <section className="bg-white shadow-sm p-4 sm:p-6 rounded-lg space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Add a new pet
        </h2>
        <p className="text-sm text-slate-600">
          New pets will be stored in the database and show up on the Pets page
          and in the adoption form dropdown.
        </p>

        {petSubmitStatus && (
          <p className="text-sm text-slate-700">{petSubmitStatus}</p>
        )}

        <form
          onSubmit={handleNewPetSubmit}
          className="grid gap-3 md:grid-cols-2"
        >
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={newPet.name}
              onChange={handleNewPetChange}
              required
              className="mt-1 w-full border border-slate-300 text-slate-400 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700">
              Species (e.g. Dog, Cat)
            </label>
            <input
              type="text"
              name="species"
              value={newPet.species}
              onChange={handleNewPetChange}
              required
              className="mt-1 w-full border border-slate-300 text-slate-400 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700">
              Breed
            </label>
            <input
              type="text"
              name="breed"
              value={newPet.breed}
              onChange={handleNewPetChange}
              required
              className="mt-1 w-full border border-slate-300 text-slate-400 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700">
              Age (years)
            </label>
            <input
              type="number"
              name="age"
              min="0"
              value={newPet.age}
              onChange={handleNewPetChange}
              className="mt-1 w-full border border-slate-300 text-slate-400  rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={newPet.gender}
              onChange={handleNewPetChange}
              placeholder="Male / Female / Unknown"
              className="mt-1 w-full border border-slate-300 text-slate-400 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={newPet.location}
              onChange={handleNewPetChange}
              placeholder="Chicago, IL"
              className="mt-1 w-full border border-slate-300 text-slate-400 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-700">
              About
            </label>
            <textarea
              name="about"
              rows="2"
              value={newPet.about}
              onChange={handleNewPetChange}
              className="mt-1 w-full border border-slate-300 text-slate-400 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm"
            >
              Add pet
            </button>
          </div>
        </form>
      </section>

      {/* 2) Adoption applications (with notes) */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Adoption applications
        </h2>
        <p className="text-sm text-slate-600">
          View submitted applications, including the applicant&apos;s notes.
        </p>

        {loadingApps && (
          <p className="text-sm text-slate-600">Loading applications…</p>
        )}
        {appsError && !loadingApps && (
          <p className="text-sm text-red-600">{appsError}</p>
        )}

        {!loadingApps && !appsError && (
          <div className="bg-white shadow-sm w-full overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Applicant
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Pet
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Date
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Status
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.application_id}
                    className="border-b border-slate-100 align-top"
                  >
                    <td className="px-4 py-2">
                      <div className="font-medium">
                        {app.applicant_name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {app.applicant_email}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {app.pet_name} (ID: {app.pet_id})
                    </td>
                    <td className="px-4 py-2">
                      {app.application_date}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={
                          app.status === "Approved"
                            ? "inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs"
                            : app.status === "Rejected"
                            ? "inline-block px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs"
                            : "inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs"
                        }
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <pre className="text-xs text-slate-700 whitespace-pre-wrap">
                        {app.applicant_message}
                      </pre>
                    </td>
                  </tr>
                ))}

                {applications.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-4 text-slate-500 text-center"
                      colSpan={5}
                    >
                      No adoption applications yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 3) Appointments (approve/disapprove) */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Adoption appointments
        </h2>
        <p className="text-sm text-slate-600">
          Review adoption appointment requests and approve or disapprove them.
        </p>

        {loadingAppts && (
          <p className="text-sm text-slate-600">Loading…</p>
        )}
        {apptsError && !loadingAppts && (
          <p className="text-sm text-red-600">{apptsError}</p>
        )}

        {!loadingAppts && !apptsError && (
          <div className="bg-white shadow-sm w-full overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Applicant
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Pet
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Date
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Time
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Status
                  </th>
                  <th className="text-left px-4 py-2 border-b border-slate-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt.appointment_id}
                    className="border-b border-slate-100"
                  >
                    <td className="px-4 py-2">{appt.applicant_name}</td>
                    <td className="px-4 py-2">
                      {appt.pet_name} (ID: {appt.pet_id})
                    </td>
                    <td className="px-4 py-2">{appt.appointment_date}</td>
                    <td className="px-4 py-2">{appt.appointment_time}</td>
                    <td className="px-4 py-2">
                      <span
                        className={
                          appt.status === "Completed"
                            ? "inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs"
                            : appt.status === "Canceled"
                            ? "inline-block px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs"
                            : "inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs"
                        }
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(appt.appointment_id, "Completed")
                          }
                          className="px-2 py-1 rounded-md bg-emerald-600 text-white text-xs hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(appt.appointment_id, "Canceled")
                          }
                          className="px-2 py-1 rounded-md bg-rose-600 text-white text-xs hover:bg-rose-700"
                        >
                          Disapprove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {appointments.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-4 text-slate-500 text-center"
                      colSpan={6}
                    >
                      No appointment requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}

export default StaffDashboard;
