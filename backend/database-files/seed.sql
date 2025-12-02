-- Seed data for Pet Adoption Services
-- Filename: seed.sql

BEGIN TRANSACTION;

-- USERS
INSERT INTO Users (first_name, last_name, email, phone, password_hash, role)
VALUES
    ('Jordan',   'Reed',    'jordan.adopter@example.com',  '555-1001', 'hashed_pw_jordan', 'ADOPTER'),
    ('Taylor',   'Morgan',  'taylor.adopter@example.com',  '555-1002', 'hashed_pw_taylor', 'ADOPTER'),
    ('Riley',    'Brooks',  'riley.staff@example.com',     '555-2001', 'hashed_pw_riley',  'STAFF'),
    ('Casey',    'Hayes',   'casey.staff@example.com',     '555-2002', 'hashed_pw_casey',  'STAFF')
;

-- SHELTERS
INSERT INTO Shelters (
    shelter_name, contact_email, contact_phone,
    street_address, city, state, postal_code
)
VALUES (
    'Happy Tails Animal Shelter',
    'contact@happytails.org',
    '555-3000',
    '123 Pawprint Lane',
    'Chicago',
    'IL',
    '60601'
);

-- PET TYPES 
INSERT INTO PetTypes (species, breed, description)
VALUES
    ('Dog', 'Labradoodle', 'High-energy, playful dog'),
    ('Cat', 'Maine Coon',  'Quiet, large, affectionate cat'),
    ('Dog', 'German Shepherd', 'Strong, active, and loyal working breed')
;

-- PETS
INSERT INTO Pets (
    shelter_id, type_id, name, age, gender, location, about, status
)
VALUES
    (1, 1, 'Aurora', 3, 'Female', 'Chicago, IL', 'Very energetic and loves to play. Sweet, affectionate personality.', 'Available'),
    (1, 2, 'Sage',   2, 'Female', 'Chicago, IL', 'Calm, cuddly cat who enjoys attention. Great for apartments.', 'Available'),
    (1, 3, 'Violet', 5, 'Male',   'Chicago, IL', 'Athletic and loyal dog who loves long walks and playing fetch.', 'Pending')
;

-- ADOPTION APPLICATIONS
INSERT INTO AdoptionApplications (
    user_id, pet_id, application_date, status, applicant_message, handled_by_staff_id
)
VALUES
    (1, 1, '2025-11-20 10:15:00', 'Submitted',
        'I live on a 1-acre property with plenty of space.', NULL),

    (2, 2, '2025-11-21 14:30:00', 'In Review',
        'I work remotely and want a low-maintenance pet.', 3),

    (1, 3, '2025-11-22 09:00:00', 'Approved',
        'I have experience training high-energy breeds.', 4)
;


-- APPOINTMENTS
INSERT INTO Appointments (
    user_id, pet_id, shelter_id, appointment_date, appointment_time, status, notes
)
VALUES
    (1, 1, 1, '2025-12-05', '10:00', 'Scheduled',
        'Initial meet-and-greet.'),

    (2, 2, 1, '2025-12-06', '14:30', 'Scheduled',
        'Discuss apartment suitability and compatibility.'),

    (1, 3, 1, '2025-11-25', '16:00', 'Completed',
        'Successful visit; staff recommended approval.')
;

-- PAYMENTS
INSERT INTO Payments (
    user_id, application_id, payment_date, amount, method, status, reference_code
)
VALUES
    (1, 3, '2025-11-26 11:45:00', 150.00, 'Card', 'Completed', 'PAY-JORDAN-AURORA-001'),
    (2, 2, '2025-11-27 09:30:00', 75.00,  'Card', 'Pending',   'PAY-TAYLOR-SAGE-001')
;

COMMIT;
