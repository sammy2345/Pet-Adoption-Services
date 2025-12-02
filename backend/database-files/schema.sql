-- SQL Schema for Pet Adoption Services using SQLite
-- Filename: schema.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS AdoptionApplications;
DROP TABLE IF EXISTS Pets;
DROP TABLE IF EXISTS Shelters;
DROP TABLE IF EXISTS PetTypes;
DROP TABLE IF EXISTS Users;

-- USERS Table
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADOPTER', 'STAFF')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Indexes for Users
CREATE INDEX idx_user_role ON Users(role);

-- SHELTERS Table
CREATE TABLE Shelters (
    shelter_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    shelter_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100) NULL,
    contact_phone VARCHAR(20) NULL,
    street_address VARCHAR(150) NULL,
    city VARCHAR(80) NULL,
    state VARCHAR(30) NULL,
    postal_code VARCHAR(15) NULL
);
-- Indexes for Shelters
CREATE INDEX idx_shelter_city ON Shelters(city);
CREATE INDEX idx_shelter_name ON Shelters(shelter_name);

--PETTYPES Table 
CREATE TABLE PetTypes (
    type_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(80) NOT NULL,
    description VARCHAR(255) NULL,
    UNIQUE (species, breed)
);
-- Indexes for PetTypes
CREATE INDEX idx_pettype_species ON PetTypes(species);
CREATE INDEX idx_pettype_breed ON PetTypes(breed);

-- PETS Table
CREATE TABLE Pets (
    pet_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    shelter_id INTEGER NOT NULL,
    type_id INTEGER NOT NULL UNIQUE,
    name VARCHAR(80) NOT NULL,
    age INT NULL,
    gender VARCHAR(20) NULL,
    location VARCHAR(100) NULL,
    about TEXT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Available', 'Pending', 'Adopted')),

    FOREIGN KEY (shelter_id) REFERENCES Shelters(shelter_id),
    FOREIGN KEY (type_id) REFERENCES PetTypes(type_id)
);
-- Indexes for Pets
CREATE INDEX idx_pet_shelter_id ON Pets(shelter_id);
CREATE INDEX idx_pet_type_id ON Pets(type_id);
CREATE INDEX idx_pet_status ON Pets(status);
CREATE INDEX idx_pet_name ON Pets(name);

--ADOPTIONAPPLICATIONS Table
CREATE TABLE AdoptionApplications (
    application_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    pet_id INTEGER NOT NULL,
    application_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Submitted', 'In Review', 'Approved', 'Rejected')),
    applicant_message TEXT NULL,
    handled_by_staff_id INTEGER NULL,

    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (pet_id) REFERENCES Pets(pet_id),
    FOREIGN KEY (handled_by_staff_id) REFERENCES Users(user_id)
);
-- Indexes for AdoptionApplications
CREATE INDEX idx_app_user_id ON AdoptionApplications(user_id);
CREATE INDEX idx_app_pet_id ON AdoptionApplications(pet_id);
CREATE INDEX idx_app_status ON AdoptionApplications(status);
CREATE INDEX idx_app_date ON AdoptionApplications(application_date);

--APPOINTMENTS Table
CREATE TABLE Appointments (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    pet_id INTEGER NOT NULL,
    shelter_id INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Scheduled', 'Completed', 'Canceled')),
    notes TEXT NULL,

    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (pet_id) REFERENCES Pets(pet_id),
    FOREIGN KEY (shelter_id) REFERENCES Shelters(shelter_id)
);
-- Indexes for Appointments
CREATE INDEX idx_appt_user_id ON Appointments(user_id);
CREATE INDEX idx_appt_pet_id ON Appointments(pet_id);
CREATE INDEX idx_appt_shelter_id ON Appointments(shelter_id);
CREATE INDEX idx_appt_datetime ON Appointments(appointment_date, appointment_time);
CREATE INDEX idx_appt_status ON Appointments(status);

-- PAYMENTS Table
CREATE TABLE Payments (
    payment_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    application_id INTEGER NOT NULL,
    payment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'Completed', 'Refunded')),
    reference_code VARCHAR(100) NULL,

    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (application_id) REFERENCES AdoptionApplications(application_id)
);
-- Indexes for Payments
CREATE INDEX idx_payment_user_id ON Payments(user_id);
CREATE INDEX idx_payment_application_id ON Payments(application_id);
CREATE INDEX idx_payment_date ON Payments(payment_date);
CREATE INDEX idx_payment_status ON Payments(status);