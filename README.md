# Hospital Management System (HMS)

Hospital Management System (HMS) is a fullstack web application designed with a mobile-first approach to manage patients, doctors, appointments, and prescriptions efficiently.

## Objectives

- User-friendly mobile-first UI
- Secure authentication system
- Scalable backend architecture
- Efficient database management

## Core Modules

### Patient Module

- Register patient
- View medical history

### Doctor Module

- Doctor profile management
- Schedule management

### Appointment Module

- Book appointment
- Cancel/reschedule

### Prescription Module

- Add prescription
- Manage medicines and dosage

### Authentication Module

- Login / Signup
- Role-based access (Admin, Doctor, Patient)

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Context API / Redux

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Tools

- Git & GitHub
- Postman

## System Architecture

Frontend → API Layer → Business Logic → Database

## Database Design

### Patient

- name
- age
- gender
- phone
- history

### Doctor

- name
- speciality
- schedule

### Appointment

- patientId
- doctorId
- date
- status

### Prescription

- patientId
- doctorId
- medicines
- notes

## API Structure

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Patient

- `GET /patients`
- `POST /patients`
- `GET /patients/:id`

### Doctor

- `GET /doctors`
- `POST /doctors`

### Appointment

- `POST /appointments`
- `GET /appointments`

### Prescription

- `POST /prescriptions`
- `GET /prescriptions/:patientId`

## UI/UX Design

- Mobile-first design
- Clean dashboard
- Simple forms
- Fast navigation

## Business Logic Flow

1. User sends request
2. API processes request
3. Database stores/retrieves data
4. Response returned to user

## Security

- JWT Authentication
- Password hashing (bcrypt)
- Role-based access control

## Team Structure

- Frontend Developer
- Backend Developer
- Database Engineer
- QA Tester

## Development Phases

### Phase 1

- Authentication system

### Phase 2

- Patient & Doctor modules

### Phase 3

- Appointment system

### Phase 4

- Prescription system

### Phase 5

- Testing & Deployment

## Deployment

- Frontend: Vercel / Netlify
- Backend: Render / VPS
- Database: MongoDB Atlas

## Future Enhancements

- Online payment integration
- SMS notification system
- PDF report generation
- Admin analytics dashboard
