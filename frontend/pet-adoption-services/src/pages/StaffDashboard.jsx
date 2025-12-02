import { useState } from "react";

// Mock appointment/adoption applications.
// Later this can come from your database via backend.
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    applicantName: "Sam Rivera",
    petName: "Luna",
    petId: 1,
    date: "2025-12-05",
    status: "Pending",
  },
  {
    id: 2,
    applicantName: "Alex Garcia",
    petName: "Mittens",
    petId: 2,
    date: "2025-12-06",
    status: "Pending",
  },
  {
    id: 3,
    applicantName: "Jamie Lee",
    petName: "Rocky",
    petId: 3,
    date: "2025-12-07",
    status: "Approved",
  },
];

function StaffDashboard() {
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  function updateStatus(id, newStatus) {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  }

  return (
    <section className="w-full space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">
        Staff dashboard
      </h1>

      <p className="text-sm text-slate-600">
        Review adoption appointment requests and approve or disapprove them.
        (Right now this uses mock data only.)
      </p>

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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b border-slate-100">
                <td className="px-4 py-2">{appt.applicantName}</td>
                <td className="px-4 py-2">
                  {appt.petName} (ID: {appt.petId})
                </td>
                <td className="px-4 py-2">{appt.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      appt.status === "Approved"
                        ? "inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs"
                        : appt.status === "Disapproved"
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
                      onClick={() => updateStatus(appt.id, "Approved")}
                      className="px-2 py-1 rounded-md bg-emerald-600 text-white text-xs hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStatus(appt.id, "Disapproved")}
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
                  colSpan={5}
                >
                  No appointment requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StaffDashboard;
