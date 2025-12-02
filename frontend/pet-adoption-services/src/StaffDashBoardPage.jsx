import React from "react";

function StaffDashboardPage({ currentUser }) {
  if (!currentUser || currentUser.role !== "STAFF") {
    return (
      <div className="scene-root">
        <div className="card">
          <h1 className="scene-title">
            Staff Dashboard
          </h1>
          <p className="helper-text">
            You must be logged in as staff to view this dashboard.
          </p>
        </div>
      </div>
    );
  }

  // MUST BE UODATED: GET /api/applications, maybe join with Users and Pets.
  const exampleApps = [
    {
      application_id: 1,
      adopter_name: "Jordan Reed",
      pet_name: "Aurora",
      status: "Submitted",
    },
    {
      application_id: 2,
      adopter_name: "Taylor Morgan",
      pet_name: "Sage",
      status: "In Review",
    },
  ];

  return (
    <div className="scene-root">
      <div className="card">
        <h1 className="scene-title">
          Staff Dashboard
        </h1>
        <p className="scene-subtitle">
          Review adoption applications and update their status.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Adopter</th>
              <th>Pet</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exampleApps.map((row) => (
              <tr key={row.application_id}>
                <td>{row.application_id}</td>
                <td>{row.adopter_name}</td>
                <td>{row.pet_name}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="helper-text">
          In the final version, actions here will call backend endpoints
          that update the AdoptionApplications.status column.
        </p>
      </div>
    </div>
  );
}

export default StaffDashboardPage;
