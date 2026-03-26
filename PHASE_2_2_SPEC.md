# Phase 2.2: Complete Patient & Doctor Modules Frontend

**Status**: Not Started  
**Target Completion**: April 15, 2026  
**Duration**: 2-3 weeks  
**Priority**: Critical (blocks Phase 3)

---

## 📋 Overview

Phase 2.2 focuses on completing the frontend implementation of Patient and Doctor modules. Backend APIs are ready; frontend needs full implementation of profile management, dashboards, and data integration.

**Current State**: 60% complete (Backend 85%, Frontend 40%)  
**Target**: 95%+ complete (Backend 95%, Frontend 95%)

---

## 🎯 Project Goals

### User Stories

**Patient User Stories:**
1. ✅ Register as a patient
2. ✅ Login to patient account
3. 🔴 View my patient profile (Name, Email, Age, Gender, Phone)
4. 🔴 Edit my patient profile
5. 🔴 View my medical history (conditions, allergies, current medications)
6. 🔴 View my upcoming appointments
7. 🔴 View my prescriptions
8. 🔴 Upload profile picture
9. Dashboard with personalized data (greeting, appointment count, prescription count, total doctors)

**Doctor User Stories:**
1. ✅ Register as a doctor
2. ✅ Login to doctor account
3. 🔴 View my doctor profile (Name, Email, Speciality, License, Experience, Consultation Fee)
4. 🔴 Edit my doctor profile
5. 🔴 Set/manage my availability schedule
6. 🔴 View my upcoming appointments
7. 🔴 View my patients
8. 🔴 Upload profile picture
9. Dashboard with personalized data (greeting, appointments, schedule)

---

## 📊 Technical Specifications

### 1. State Management Architecture

#### AuthContext (Update)
```javascript
{
  user: { id, email, role: 'patient'|'doctor', firstName, lastName },
  token: string,
  isAuthenticated: boolean,
  loading: boolean,
  error: string,
  login(email, password, role),
  logout(),
  clearError()
}
```

#### PatientContext (Complete Implementation)
```javascript
{
  currentPatient: {
    _id, firstName, lastName, email, phone, age, gender,
    medicalHistory: { conditions, allergies, medications },
    appointments: [],
    prescriptions: []
  },
  patients: [],
  loading: boolean,
  error: string,
  fetchPatientById(id),
  fetchCurrentPatient(),
  updatePatient(id, data),
  fetchMedicalHistory(id),
  fetchPatientAppointments(id),
  fetchPatientPrescriptions(id)
}
```

#### DoctorContext (New)
```javascript
{
  currentDoctor: {
    _id, firstName, lastName, email, phone,
    speciality, license, experience, consultationFee, bio,
    schedule: { [day]: { startTime, endTime, available } },
    appointments: [],
    patients: []
  },
  doctors: [],
  loading: boolean,
  error: string,
  fetchDoctorById(id),
  fetchCurrentDoctor(),
  updateDoctor(id, data),
  updateDoctorSchedule(id, schedule),
  fetchDoctorAppointments(id),
  fetchDoctorPatients(id)
}
```

### 2. Component Architecture

#### Protected Routes
```
- Create ProtectedRoute component
- Check authentication & role before rendering
- Redirect to /login if not authenticated
- Redirect to appropriate dashboard if wrong role
```

#### Layout Structure
```
App.jsx
├── Header (with user info & logout)
├── Routes
│   ├── / (HomePage)
│   ├── /login (LoginPage) 
│   ├── /register/patient (PatientRegisterPage)
│   ├── /register/doctor (DoctorRegisterPage)
│   └── Protected:
│       ├── PatientDashboard
│       ├── DoctorDashboard
│       ├── PatientProfileView
│       ├── PatientProfileEdit
│       ├── DoctorProfileView
│       ├── DoctorProfileEdit
│       ├── DoctorScheduleManager
│       ├── MedicalHistoryView
│       └── Others...
└── Footer
```

### 3. Page Specifications

#### PatientDashboard
```
Layout: Full-width responsive
Sections:
- Welcome banner: "Welcome, [FirstName]!"
- Quick stats cards (4 cols, responsive):
  * Upcoming Appointments (number link)
  * Active Prescriptions (number link)
  * Total Doctors (number link)
  * Medical Records (number link)
- Recent Appointments list (max 5)
- Recent Prescriptions list (max 5)
- Quick action buttons: Book Appointment, Message Doctor

Data Source: PatientContext.currentPatient
Loading: Show skeleton loaders
Error: Display error message with retry
```

#### PatientProfileView
```
Layout: Sidebar + Content
Left Sidebar:
- Profile picture/avatar
- Name
- Edit button (link to edit form)

Content:
- Basic Info Card (Name, Email, Phone, Age, Gender)
- Medical History Card (Conditions, Allergies, Current Medications)
- Contact Info Card
- Created Date

Data Source: PatientContext.currentPatient
Actions: Edit Profile, Upload Picture, Back to Dashboard
```

#### PatientProfileEdit
```
Form: Same layout as PatientRegisterPage
Fields: firstName, lastName, email, phone, age, gender
- Profile picture upload
Pre-fill with current data
Validation: Same as registration
Submit: PUT /api/patients/:id
Success: Redirect to view profile
Error: Display form validation errors
```

#### DoctorDashboard
```
Similar to PatientDashboard with doctor-specific data:
- Welcome banner
- Quick stats (Appointments, Patients, Schedule, Consultations)
- Next Appointments list
- Schedule summary
- Quick action buttons: Manage Schedule, View Patients
```

#### DoctorProfileView
```
Layout: Sidebar + Content
Left Sidebar:
- Profile picture/avatar
- Name & Speciality
- Edit button

Content:
- Professional Info Card (Speciality, License, Experience, Consultation Fee)
- Contact Info Card
- Bio Card
- Schedule Summary (availability by day)
- Ratings (if available)

Actions: Edit Profile, Manage Schedule, View Patients
```

#### DoctorProfileEdit
```
Form: Professional info + basic info
Fields:
- firstName, lastName, email, phone
- speciality, license, experience
- consultationFee, bio
- profilePicture upload

Submit: PUT /api/doctors/:id
```

#### DoctorScheduleManager
```
Layout: Weekly calendar view
- Day tabs: Monday-Sunday
- Each day:
  * Time picker: Start time, End time
  * Available checkbox
  * Edit/Save functionality
- Save All button
- Submit: PUT /api/doctors/:id with updated schedule
- Show success toast

Data Source: DoctorContext.currentDoctor.schedule
```

#### MedicalHistoryView
```
Layout: Card-based
Sections:
- Allergies (List or "No allergies recorded")
- Conditions (List or "No conditions recorded")
- Current Medications (Table: Medication, Dosage, Duration)
- Medical History Timeline (Chronological list of records)
- Add/Edit button (for doctors only)

Data Source: PatientContext.currentPatient.medicalHistory
```

### 4. API Integration Details

**Endpoints to Integrate:**

| Page Component | Endpoint | Method | Purpose |
|---|---|---|---|
| All Protected Pages | GET /api/patients/:id | GET | Fetch patient data |
| All Protected Pages | GET /api/doctors/:id | GET | Fetch doctor data |
| PatientProfileView | GET /api/patients/:id/history | GET | Fetch medical history |
| PatientProfileEdit | PUT /api/patients/:id | PUT | Update patient data |
| PatientDashboard | GET /api/appointments?patientId=... | GET | Get patient appointments |
| PatientDashboard | GET /api/prescriptions?patientId=... | GET | Get patient prescriptions |
| DoctorProfileEdit | PUT /api/doctors/:id | PUT | Update doctor profile |
| DoctorScheduleManager | PUT /api/doctors/:id | PUT | Update schedule |
| DoctorDashboard | GET /api/appointments?doctorId=... | GET | Get doctor appointments |
| DoctorDashboard | GET /api/doctors/:id/patients | GET | Get doctor's patients |

### 5. Component Data Flow Diagram

```
App.jsx
├── AuthContext (isAuthenticated, user, token)
├── PatientContext (currentPatient, patients)
├── DoctorContext (currentDoctor, doctors)
│
└── ProtectedRoute Wrapper
    ├── PatientDashboard
    │   └── Fetches PatientContext.currentPatient on mount
    │
    ├── PatientProfileView
    │   └── Displays PatientContext.currentPatient
    │
    ├── PatientProfileEdit
    │   └── Updates PatientContext.currentPatient via updatePatient()
    │
    ├── DoctorDashboard
    │   └── Fetches DoctorContext.currentDoctor on mount
    │
    ├── DoctorProfileView
    │   └── Displays DoctorContext.currentDoctor
    │
    ├── DoctorProfileEdit
    │   └── Updates DoctorContext.currentDoctor
    │
    └── DoctorScheduleManager
        └── Updates schedule via DoctorContext
```

### 6. UI/UX Guidelines

**Design System:**
- **Colors**: Use Tailwind CSS primary color (blue-600) for active states
- **Spacing**: Consistent 16px (4 Tailwind units) padding
- **Cards**: rounded-lg shadow-md hover:shadow-lg
- **Buttons**: Primary (blue), Secondary (gray), Outline
- **Typography**: Headings 24px, Body 16px, Small 14px
- **Responsive**: Mobile-first, breakpoints at sm, md, lg

**Common Components Needed:**
- ProfilePictureUpload component (reusable for patient & doctor)
- MedicalHistoryForm component
- ScheduleEditor component
- TimePickerInput component
- FormInput component (with validation display)
- LoadingSpinner component
- ErrorMessage component
- SuccessToast component
- Card component (reusable)

### 7. Validation Rules

**Patient Profile:**
- firstName, lastName: 2-50 chars, letters only
- Email: valid email format, unique
- Phone: 10-15 digits
- Age: 18-120
- Gender: one of [Male, Female, Other]

**Doctor Profile:**
- firstName, lastName: 2-50 chars
- Email: valid email format, unique
- Phone: 10-15 digits
- Speciality: one of predefined list
- License: 5-20 alphanumeric
- Experience: 0-60 (years)
- ConsultationFee: positive number, max 10000
- Bio: max 500 chars

**Schedule:**
- startTime < endTime
- Times in HH:MM format
- At least one day must be available
- Unavailable days have null times

---

## ⏱️ Timeline & Milestones

### Week 1 (March 24-31)
- [ ] Setup Auth & Context integration
- [ ] Create ProtectedRoute component
- [ ] Update Header with user info & logout
- [ ] Fix PatientContext implementation
- [ ] Create DoctorContext
- [ ] Create common reusable components
- [ ] Deploy to dev environment

### Week 2 (April 1-8)
- [ ] PatientDashboard
- [ ] PatientProfileView
- [ ] PatientProfileEdit
- [ ] MedicalHistoryView
- [ ] Unit tests

### Week 3 (April 9-15)
- [ ] DoctorDashboard
- [ ] DoctorProfileView
- [ ] DoctorProfileEdit
- [ ] DoctorScheduleManager
- [ ] Integration testing
- [ ] Bug fixes & polish
- [ ] Final testing before Phase 3

---

## 🚀 Success Criteria

- [ ] All protected routes require authentication
- [ ] Patient can view/edit profile
- [ ] Doctor can view/edit profile & schedule
- [ ] Dashboard shows real data from backend
- [ ] All forms validate properly
- [ ] All API calls use JWT authentication
- [ ] Error handling for all scenarios
- [ ] Loading states implemented
- [ ] Responsive on mobile, tablet, desktop
- [ ] No console errors or warnings
- [ ] 80%+ code coverage with tests

---

## 📝 Notes

- **Doctor Ratings/Reviews**: Deferred to Phase 2.3 (requires separate Rating model)
- **Profile Picture Upload**: Use FormData with multipart/form-data (backend support needed)
- **Appointment/Prescription Features**: Minimal integration in Phase 2.2, full implementation in Phase 3-4
- **Notifications**: Can be added post-Phase 2.2


## Maintenance log
Project tree was cleared and all markdown files were updated on 2026-03-26.
