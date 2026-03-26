# Hospital Management System (HMS)

Hospital Management System (HMS) is a comprehensive fullstack web application designed with a mobile-first approach to manage patients, doctors, appointments, and prescriptions efficiently. This project demonstrates modern web development practices with React, Node.js/Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

**Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

For detailed setup instructions, see [SETUP.md](SETUP.md)

## 📋 Core Modules

### Patient Module
- ✅ Patient registration and login
- ✅ Profile management
- View medical history
- Track appointments
- Manage prescriptions

### Doctor Module
- ✅ Doctor registration and login
- ✅ Profile management
- Schedule management
- View appointments
- Create prescriptions

### Appointment Module
- Book appointments
- View appointment history
- Cancel/reschedule appointments
- Doctor availability check

### Prescription Module
- ✅ Create prescriptions
- ✅ Manage medicines and dosage
- View prescription history
- Track medication status

### Authentication Module
- ✅ Login / Signup
- ✅ Role-based access (Patient, Doctor, Admin)
- ✅ JWT authentication
- ✅ Password hashing

## 🛠 Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **React Router** - Routing
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Express Validator** - Input validation

### Tools & Services
- **Git & GitHub** - Version control
- **Postman** - API testing
- **Render** - Backend deployment (recommended)
- **Vercel/Netlify** - Frontend deployment
- **MongoDB Atlas** - Cloud database

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


## Maintenance log
Project tree was cleared and all markdown files were updated on 2026-03-26.
