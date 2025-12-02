import React from "react";

function MyApplicationsPage({ currentUser }) {
  if (!currentUser || currentUser.role !== "ADOPTER") {
    return (
      <div className="scene-root">
        <div className="card">
          <h1 className="scene-title">
            My Applications
          </h1>
          <p className="helper-text">
            You must be logged in as an adopter to view your applications.
          </p>
        </div>
      </div>
    );
  }

  //UPDATE with fetch applications from backend:
  // GET /api/applications?userId=currentUser.id
  // For now we have static example rows that match AdoptionApplications table structure.
  const exampleRows = [
    {
      application_id: 1,
      pet_name: "Aurora",
      status: "Submitted",
      application_date: "2025-11-20 10:15",
    },
    {
      application_id: 2,
      pet_name: "Violet",
      status: "Approved",
      application_date: "2025-11-22 09:00",
    },
  ];

  return (
    <div className="scene-root">
      <div className="card">
        <h1 className="scene-title">
          My Applications
        </h1>
        <p className="scene-subtitle">
          These correspond to rows in the AdoptionApplications table for this user.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Pet</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {exampleRows.map((row) => (
              <tr key={row.application_id}>
                <td>{row.application_id}</td>
                <td>{row.pet_name}</td>
                <td>{row.status}</td>
                <td>{row.application_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyApplicationsPage;
