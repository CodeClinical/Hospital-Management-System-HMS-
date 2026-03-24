# Phase 2.2: Implementation Checklist

**Status**: Ready to Start  
**Last Updated**: March 24, 2026

## Priority 1: Foundation & Infrastructure (Week 1)

### Authentication & Context Setup

- [ ] **Fix AuthContext Integration**
  - [ ] Update AuthContext with currentUser data
  - [ ] Add token expiration handling
  - [ ] Create useAuth() custom hook
  - [ ] Wrap App with AuthContext provider in main.jsx
  - Effort: 2 hours | Priority: CRITICAL

- [ ] **Complete PatientContext Implementation**
  - [ ] Implement fetchCurrentPatient() function with API call
  - [ ] Implement fetchPatientById(id) with API call
  - [ ] Implement updatePatient(id, data) with API call
  - [ ] Implement fetchMedicalHistory(id) with API call
  - [ ] Implement error handling and loading states
  - [ ] Create usePatient() custom hook
  - [ ] Wrap App with PatientContext provider
  - Effort: 3 hours | Priority: CRITICAL

- [ ] **Create DoctorContext**
  - [ ] Create /frontend/src/context/DoctorContext.jsx
  - [ ] Implement all methods (fetchCurrentDoctor, updateDoctor, etc.)
  - [ ] Create useDoctors() custom hook
  - [ ] Add DoctorContext provider to App.jsx
  - Effort: 3 hours | Priority: CRITICAL

- [ ] **Create ProtectedRoute Component**
  - [ ] Create /frontend/src/components/ProtectedRoute.jsx
  - [ ] Check authentication status
  - [ ] Check user role matches allowed roles
  - [ ] Redirect to /login if not authenticated
  - Effort: 1.5 hours | Priority: CRITICAL

### Reusable Components Library

- [ ] **Create FormInput Component**
  - [ ] Input field with validation display
  - [ ] Support for error messages
  - [ ] Support for success messages
  - [ ] Reusable across all forms
  - File: /frontend/src/components/FormInput.jsx
  - Effort: 1.5 hours | Priority: HIGH

- [ ] **Create LoadingSpinner Component**
  - [ ] Animated spinner
  - [ ] Optional loading text
  - File: /frontend/src/components/LoadingSpinner.jsx
  - Effort: 1 hour | Priority: HIGH

- [ ] **Create ProfilePictureUpload Component**
  - [ ] Preview image before upload
  - [ ] File type validation (jpg, png)
  - [ ] File size validation (<5MB)
  - [ ] Upload to API endpoint
  - File: /frontend/src/components/ProfilePictureUpload.jsx
  - Effort: 2 hours | Priority: HIGH

- [ ] **Create Card Component**
  - [ ] Reusable card container with styling
  - [ ] Support for title, subtitle, actions
  - File: /frontend/src/components/Card.jsx
  - Effort: 1 hour | Priority: MEDIUM

- [ ] **Create ErrorMessage Component**
  - [ ] Display error messages with icon
  - [ ] Optional retry button
  - File: /frontend/src/components/ErrorMessage.jsx
  - Effort: 1 hour | Priority: MEDIUM

- [ ] **Create SuccessToast Component**
  - [ ] Temporary success notification
  - [ ] Auto-dismiss after 3 seconds
  - File: /frontend/src/components/SuccessToast.jsx
  - Effort: 1.5 hours | Priority: MEDIUM

### Navigation & Layout Updates

- [ ] **Update Header Component**
  - [ ] Display current user name when authenticated
  - [ ] Show user avatar/initial
  - [ ] Add dropdown menu with options
  - [ ] Add logout button with confirmation
  - [ ] Add link to profile page
  - [ ] Add navigation breadcrumbs or active page indicator
  - Effort: 2 hours | Priority: HIGH

- [ ] **Update Footer Component (verify functionality)**
  - [ ] Ensure responsive design
  - Effort: 0.5 hours | Priority: LOW

- [ ] **Create Navigation Routing Structure**
  - [ ] Create routes for all new pages
  - [ ] Setup ProtectedRoute guards
  - File: /frontend/src/App.jsx (update Routes)
  - Effort: 1.5 hours | Priority: HIGH

**Week 1 Subtotal: ~25 hours**

---

## Priority 2: Patient Module Frontend (Week 2)

### Patient Dashboard

- [ ] **Create PatientDashboard Component**
  - [ ] Welcome banner with user name
  - [ ] 4-column stats cards (responsive to 2-col on mobile):
    - [ ] Upcoming Appointments count
    - [ ] Active Prescriptions count
    - [ ] Total Doctors count
    - [ ] Medical Records count
  - [ ] Recent Appointments section (max 5 items)
  - [ ] Recent Prescriptions section (max 5 items)
  - [ ] Quick action buttons
  - [ ] Loading skeleton for stats
  - [ ] Error handling with retry
  - Fetch: GET /api/patients/:id, appointments, prescriptions on mount
  - File: /frontend/src/pages/PatientDashboard.jsx
  - Effort: 3 hours | Priority: CRITICAL

### Patient Profile Management

- [ ] **Create PatientProfileView Component**
  - [ ] Left sidebar with avatar (initials if no picture)
  - [ ] Right content area
  - [ ] Basic Info Card: name, email, phone, age, gender
  - [ ] Medical History Card: conditions, allergies, medications
  - [ ] Edit Profile button
  - [ ] View Medical History button
  - File: /frontend/src/pages/PatientProfileView.jsx
  - Effort: 2.5 hours | Priority: HIGH

- [ ] **Create PatientProfileEdit Component**
  - [ ] Pre-fill form with current patient data
  - [ ] Form fields: firstName, lastName, email, phone, age, gender
  - [ ] Profile picture upload
  - [ ] Validation on all fields
  - [ ] Submit handler that calls updatePatient()
  - [ ] Success message and redirect to profile view
  - [ ] Cancel button
  - File: /frontend/src/pages/PatientProfileEdit.jsx
  - Effort: 2.5 hours | Priority: HIGH

- [ ] **Create MedicalHistoryView Component**
  - [ ] Allergies section
  - [ ] Conditions section
  - [ ] Current Medications table (Medication, Dosage, Duration)
  - [ ] Medical History timeline
  - [ ] Edit button (show form or modal)
  - [ ] Empty states for each section
  - File: /frontend/src/pages/MedicalHistoryView.jsx
  - Effort: 2.5 hours | Priority: MEDIUM

### Patient Forms Enhancement

- [ ] **Complete PatientRegisterPage**
  - [ ] Ensure all validation is working
  - [ ] Add success redirect
  - [ ] Test end-to-end
  - Effort: 1 hour | Priority: MEDIUM

- [ ] **Update DoctorRegisterPage**
  - [ ] Add remaining fields: schedule, consultation fee (optional for registration)
  - [ ] Complete API integration
  - [ ] Add validation
  - [ ] Test end-to-end
  - Effort: 1.5 hours | Priority: MEDIUM

**Priority 2 Subtotal: ~16 hours**

---

## Priority 3: Doctor Module Frontend (Week 2-3)

### Doctor Dashboard

- [ ] **Create DoctorDashboard Component**
  - [ ] Welcome banner with doctor name & speciality
  - [ ] 4-column stats cards:
    - [ ] Today's Appointments count
    - [ ] Total Patients count
    - [ ] Availability status
    - [ ] Consultation Hours count
  - [ ] Next Appointments list
  - [ ] Schedule summary (availability by day)
  - [ ] Quick action buttons: Manage Schedule, View Patients
  - File: /frontend/src/pages/DoctorDashboard.jsx
  - Effort: 3 hours | Priority: CRITICAL

### Doctor Profile Management

- [ ] **Create DoctorProfileView Component**
  - [ ] Left sidebar with avatar
  - [ ] Right content area
  - [ ] Professional Info Card: speciality, license, experience, consultation fee
  - [ ] Contact Info Card
  - [ ] Bio Card
  - [ ] Schedule Summary (availability table by day)
  - [ ] Edit Profile button
  - [ ] Manage Schedule button
  - File: /frontend/src/pages/DoctorProfileView.jsx
  - Effort: 2.5 hours | Priority: HIGH

- [ ] **Create DoctorProfileEdit Component**
  - [ ] Pre-fill form with current doctor data
  - [ ] Form fields: firstName, lastName, email, phone, speciality, license, experience, consultationFee, bio
  - [ ] Profile picture upload
  - [ ] Full validation
  - [ ] Submit handler with API call
  - [ ] Success redirect
  - File: /frontend/src/pages/DoctorProfileEdit.jsx
  - Effort: 2.5 hours | Priority: HIGH

- [ ] **Create DoctorScheduleManager Component**
  - [ ] Weekly calendar view with day tabs
  - [ ] For each day:
    - [ ] Start time picker (HH:MM format)
    - [ ] End time picker (HH:MM format)
    - [ ] Available checkbox
    - [ ] Validation: startTime < endTime
  - [ ] Save All button
  - [ ] Submit handler: PUT /api/doctors/:id with schedule
  - [ ] Success toast notification
  - [ ] Error handling
  - File: /frontend/src/pages/DoctorScheduleManager.jsx
  - Effort: 3 hours | Priority: HIGH

**Priority 3 Subtotal: ~14 hours**

---

## Priority 4: Integration & Testing (Week 3)

### API Integration Testing

- [ ] **Test All Patient Endpoints**
  - [ ] GET /api/patients/:id
  - [ ] PUT /api/patients/:id
  - [ ] GET /api/patients/:id/history
  - [ ] Verify JWT token included in requests
  - [ ] Test error handling
  - Effort: 1.5 hours | Priority: HIGH

- [ ] **Test All Doctor Endpoints**
  - [ ] GET /api/doctors/:id
  - [ ] PUT /api/doctors/:id
  - [ ] GET /api/doctors/:id/schedule
  - [ ] Verify JWT token included
  - [ ] Test error handling
  - Effort: 1.5 hours | Priority: HIGH

- [ ] **Test Authentication Flow**
  - [ ] Login redirects to correct dashboard
  - [ ] Logout clears token and redirects
  - [ ] Protected routes accessible only when authenticated
  - Effort: 1 hour | Priority: HIGH

### Component Testing

- [ ] **Unit Tests for Context**
  - [ ] AuthContext initialization
  - [ ] PatientContext functions
  - [ ] DoctorContext functions
  - Effort: 2 hours | Priority: MEDIUM

- [ ] **Component Snapshot Tests**
  - [ ] All new components
  - Effort: 1.5 hours | Priority: MEDIUM

### E2E Testing (Manual)

- [ ] **Patient Complete Flow**
  - [ ] Register as patient
  - [ ] Login
  - [ ] View dashboard (verify metrics load)
  - [ ] View profile
  - [ ] Edit profile
  - [ ] View medical history
  - Effort: 1 hour | Priority: HIGH

- [ ] **Doctor Complete Flow**
  - [ ] Register as doctor
  - [ ] Login
  - [ ] View dashboard
  - [ ] View profile
  - [ ] Edit profile
  - [ ] Manage schedule
  - Effort: 1 hour | Priority: HIGH

### Bug Fixes & Polish

- [ ] **Responsive Design Verification**
  - [ ] Mobile (320px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1024px+)
  - Effort: 2 hours | Priority: HIGH

- [ ] **Error Message Improvements**
  - [ ] Clear, user-friendly messages
  - [ ] Helpful hints for resolution
  - Effort: 1 hour | Priority: MEDIUM

- [ ] **Loading State Improvements**
  - [ ] Skeleton loaders
  - [ ] Spinners for actions
  - Effort: 1 hour | Priority: MEDIUM

- [ ] **Browser Compatibility**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
  - Effort: 1 hour | Priority: LOW

**Priority 4 Subtotal: ~15 hours**

---

## Summary

| Category | Hours | Priority |
|----------|-------|----------|
| Week 1: Infrastructure | 25 | CRITICAL |
| Week 2: Patient Frontend | 16 | CRITICAL |
| Week 2-3: Doctor Frontend | 14 | CRITICAL |
| Week 3: Testing & Polish | 15 | HIGH |
| **Total Estimated** | **70 hours** | |

**Effort: ~3-4 hours/day for 2-3 weeks**

---

## Blocked Tasks

- Profile picture upload (requires backend image storage endpoint)
- Appointment integration (blocked by Phase 3 Appointment model completion)
- Prescription integration (blocked by Phase 4 Prescription implementation)

---

## Dependencies

- ✅ Patient model & APIs (DONE)
- ✅ Doctor model & APIs (DONE)
- ✅ Authentication (DONE)
- ⏳ Profile picture upload endpoint (Need to implement)
- ⏳ Appointment APIs (Phase 3)
- ⏳ Prescription APIs (Phase 4)

---

## Notes for Implementation

1. **Start with Week 1 tasks first** - These are foundation and unblock all other work
2. **Test contexts thoroughly** - They're the backbone of data management
3. **Use JSON placeholders** for patient/doctor data before real API integration
4. **Build reusable components first** - Saves time in later pages
5. **Implement loading states explicitly** - Users need feedback
6. **Keep forms DRY** - Use FormInput component for all fields
7. **Test mobile responsive early** - Don't leave until end
