// backend/server.js
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ----- CONNECT TO SQLITE DATABASE -----
const dbPath = path.join(__dirname, "pet_adoption.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error connecting to DB:", err.message);
  } else {
    console.log("✅ Connected to SQLite DB:", dbPath);
  }
});

db.run("PRAGMA foreign_keys = ON;");

// End points for frontend
// Example: GET all pets
app.get("/api/pets", (req, res) => {
  const sql = `
    SELECT
      p.pet_id,
      p.shelter_id,
      p.type_id,
      p.name,
      p.age,
      p.gender,
      p.location,
      p.about,
      p.status,
      pt.species,
      pt.breed,
      s.shelter_name
    FROM Pets p
    JOIN PetTypes pt ON p.type_id = pt.type_id
    JOIN Shelters s ON p.shelter_id = s.shelter_id;
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching pets:", err.message);
      return res.status(500).json({ error: "Failed to fetch pets" });
    }
    res.json(rows);
  });
});

// Example: GET all appointments for staff dashboard
app.get("/api/appointments", (req, res) => {
  const sql = `
    SELECT
      a.appointment_id,
      u.first_name || ' ' || u.last_name AS applicant_name,
      p.name AS pet_name,
      p.pet_id,
      a.appointment_date,
      a.appointment_time,
      a.status,
      a.notes
    FROM Appointments a
    JOIN Users u ON a.user_id = u.user_id
    JOIN Pets p ON a.pet_id = p.pet_id
    ORDER BY a.appointment_date, a.appointment_time;
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching appointments:", err.message);
      return res.status(500).json({ error: "Failed to fetch appointments" });
    }
    res.json(rows);
  });
});

// Example: Update appointment status (Approve/Disapprove)
app.patch("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ["Scheduled", "Completed", "Canceled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const sql = `
    UPDATE Appointments
    SET status = ?
    WHERE appointment_id = ?
  `;

  db.run(sql, [status, id], function (err) {
    if (err) {
      console.error("❌ Error updating appointment:", err.message);
      return res.status(500).json({ error: "Failed to update appointment" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ appointment_id: id, status });
  });
});

// POST /api/applications - create a new adoption application + auto appointment
app.post("/api/applications", (req, res) => {
  const { user_id, pet_id, adoptionDate, notes } = req.body;

  // Basic validation
  if (!user_id || !pet_id) {
    return res
      .status(400)
      .json({ error: "user_id and pet_id are required." });
  }

  // store the user's message and preferred date in applicant_message.
  const applicantMessage = notes
    ? `Preferred adoption date: ${adoptionDate || "N/A"}\n\n${notes}`
    : `Preferred adoption date: ${adoptionDate || "N/A"}`;

  const insertApplicationSql = `
    INSERT INTO AdoptionApplications
      (user_id, pet_id, status, applicant_message)
    VALUES
      (?, ?, 'Submitted', ?)
  `;

  // 1) Insert application
  db.run(
    insertApplicationSql,
    [user_id, pet_id, applicantMessage],
    function (err) {
      if (err) {
        console.error("❌ Error inserting application:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to create adoption application" });
      }

      const newApplicationId = this.lastID;

      // 2) Mark pet as Pending (but avoid overwriting Adopted)
      const updatePetSql = `
        UPDATE Pets
        SET status = 'Pending'
        WHERE pet_id = ?
          AND status = 'Available'
      `;

      db.run(updatePetSql, [pet_id], function (err2) {
        if (err2) {
          console.error("❌ Error updating pet status:", err2.message);
          // If this fails, we still created the application.
          return res.status(500).json({
            error:
              "Application created, but failed to update pet status to Pending.",
            application_id: newApplicationId,
          });
        }

        // 3) Look up shelter_id for this pet so we can create an appointment
        const getPetSql = `
          SELECT shelter_id
          FROM Pets
          WHERE pet_id = ?
        `;

        db.get(getPetSql, [pet_id], (err3, petRow) => {
          if (err3) {
            console.error("❌ Error fetching pet for appointment:", err3.message);
            // Application is created; pet may be pending; but no appointment
            return res.status(201).json({
              application_id: newApplicationId,
              user_id,
              pet_id,
              status: "Submitted",
              adoptionDate,
              notes,
              petStatusUpdated: this.changes > 0 ? "Pending" : "Unchanged",
              appointmentCreated: false,
            });
          }

          if (!petRow) {
            // Pet not found (weird but handle it)
            return res.status(201).json({
              application_id: newApplicationId,
              user_id,
              pet_id,
              status: "Submitted",
              adoptionDate,
              notes,
              petStatusUpdated: this.changes > 0 ? "Pending" : "Unchanged",
              appointmentCreated: false,
            });
          }

          const shelterId = petRow.shelter_id;

          // 4) Insert appointment: use adoptionDate or today's date; fixed time for now
          const apptDate =
            adoptionDate ||
            new Date().toISOString().slice(0, 10); // YYYY-MM-DD
          const apptTime = "10:00"; // default time;

          const insertApptSql = `
            INSERT INTO Appointments (
              user_id,
              pet_id,
              shelter_id,
              appointment_date,
              appointment_time,
              status,
              notes
            )
            VALUES (?, ?, ?, ?, ?, 'Scheduled', ?)
          `;

          const appointmentNotes =
            notes && notes.trim().length > 0
              ? `Auto-created from application ${newApplicationId}.\n\nApplicant notes:\n${notes}`
              : `Auto-created from application ${newApplicationId}.`;

          db.run(
            insertApptSql,
            [user_id, pet_id, shelterId, apptDate, apptTime, appointmentNotes],
            function (err4) {
              if (err4) {
                console.error(
                  "❌ Error creating appointment:",
                  err4.message
                );
                // Application + pet status are done; appointment failed
                return res.status(201).json({
                  application_id: newApplicationId,
                  user_id,
                  pet_id,
                  status: "Submitted",
                  adoptionDate: apptDate,
                  notes,
                  petStatusUpdated: "Pending",
                  appointmentCreated: false,
                });
              }

              const newAppointmentId = this.lastID;

              // Everything succeeded
              res.status(201).json({
                application_id: newApplicationId,
                appointment_id: newAppointmentId,
                user_id,
                pet_id,
                status: "Submitted",
                adoptionDate: apptDate,
                notes,
                petStatusUpdated: "Pending",
                appointmentCreated: true,
              });
            }
          );
        });
      });
    }
  );
});

app.get("/api/applications", (req, res) => {
  const sql = `
    SELECT
      a.application_id,
      u.first_name || ' ' || u.last_name AS applicant_name,
      u.email AS applicant_email,
      p.name AS pet_name,
      p.pet_id,
      a.application_date,
      a.status,
      a.applicant_message
    FROM AdoptionApplications a
    JOIN Users u ON a.user_id = u.user_id
    JOIN Pets p ON a.pet_id = p.pet_id
    ORDER BY a.application_date DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching applications:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch adoption applications" });
    }
    res.json(rows);
  });
});

app.post("/api/pets", (req, res) => {
  const { name, species, breed, age, gender, location, about, shelter_id } =
    req.body;

  if (!name || !species || !breed) {
    return res
      .status(400)
      .json({ error: "name, species, and breed are required." });
  }

  const shelterId = shelter_id || 1; // default to shelter 1 for demo

  // 1) Insert into PetTypes (species, breed, description)
  const insertTypeSql = `
    INSERT INTO PetTypes (species, breed, description)
    VALUES (?, ?, ?)
  `;

  db.run(insertTypeSql, [species, breed, about || null], function (err) {
    if (err) {
      console.error("❌ Error inserting pet type:", err.message);
      // If schema uniqueness is hit (species+breed unique), return a clear error
      return res
        .status(500)
        .json({
          error: "Failed to create pet type. Check unique constraints.",
        });
    }

    const newTypeId = this.lastID;

    // 2) Insert into Pets using the new type_id
    const insertPetSql = `
      INSERT INTO Pets (
        shelter_id, type_id, name, age, gender, location, about, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Available')
    `;

    db.run(
      insertPetSql,
      [
        shelterId,
        newTypeId,
        name,
        age || null,
        gender || null,
        location || null,
        about || null,
      ],
      function (err2) {
        if (err2) {
          console.error("❌ Error inserting pet:", err2.message);
          return res.status(500).json({ error: "Failed to create pet." });
        }

        const newPetId = this.lastID;

        // 3) Return the newly created pet in the same shape as GET /api/pets
        const selectSql = `
          SELECT
            p.pet_id,
            p.shelter_id,
            p.type_id,
            p.name,
            p.age,
            p.gender,
            p.location,
            p.about,
            p.status,
            pt.species,
            pt.breed,
            s.shelter_name
          FROM Pets p
          JOIN PetTypes pt ON p.type_id = pt.type_id
          JOIN Shelters s ON p.shelter_id = s.shelter_id
          WHERE p.pet_id = ?
        `;

        db.get(selectSql, [newPetId], (err3, row) => {
          if (err3) {
            console.error("❌ Error fetching new pet:", err3.message);
            return res
              .status(500)
              .json({ error: "Pet created, but failed to fetch it." });
          }

          res.status(201).json(row);
        });
      }
    );
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
