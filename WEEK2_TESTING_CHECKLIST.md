# Week 2 Testing & Validation Checklist

## Pre-Testing Requirements
- [ ] Backend running on `http://localhost:5000` (verify: `docker ps`)
- [ ] Frontend dev server running on `http://localhost:3000` (verify: `npm run dev`)
- [ ] No TypeScript/ESLint errors in `/frontend/src`
- [ ] All 4 patient pages created in `/frontend/src/pages/`
- [ ] All routes added to `App.jsx` with `ProtectedRoute` wrappers

## Patient Registration Flow Testing

### 1. Form Validation Tests (No Backend Call)
**Location:** `http://localhost:3000/register/patient`

#### Test 1.1: Empty Form Submission
- [ ] Click "Create Account" with empty form
- [ ] Expected: All fields show error messages
  - "First name is required"
  - "Last name is required"
  - "Email is required"
  - "Password is required"
  - "Confirm Password is required" (or similar)
  - "Age is required"
  - "Gender is required"
  - "Phone number is required"

#### Test 1.2: Invalid Email
- [ ] Enter "notanemail" in email field
- [ ] Click elsewhere or submit
- [ ] Expected: Error "Please enter a valid email address"

#### Test 1.3: Invalid Phone
- [ ] Enter "123" in phone field (less than 10 digits)
- [ ] Click elsewhere or submit
- [ ] Expected: Error "Please enter a valid phone number"

#### Test 1.4: Invalid Age
- [ ] Enter age "17" (below 18)
- [ ] Click elsewhere or submit
- [ ] Expected: Error "Age must be between 18 and 120"
- [ ] Repeat with age "121"
- [ ] Expected: Same error message

#### Test 1.5: Short First/Last Name
- [ ] Enter "J" in First Name
- [ ] Enter "D" in Last Name
- [ ] Expected: Errors "First name must be at least 2 characters", "Last name must be at least 2 characters"

#### Test 1.6: Password Mismatch
- [ ] Enter "Password123" in Password field
- [ ] Enter "Password456" in Confirm Password field
- [ ] Expected: Error "Passwords do not match"

#### Test 1.7: Short Password
- [ ] Enter "12345" in Password field
- [ ] Expected: Error "Password must be at least 6 characters"

### 2. Password Strength Indicator Tests
**Location:** `http://localhost:3000/register/patient`

#### Test 2.1: Weak Password
- [ ] Enter "123456" in password field
- [ ] Expected: Progress bar shows 1/3 (red), label shows "Weak"
- [ ] Expected feedback items:
  - "At least 12 characters for stronger password"
  - "Include uppercase letters"
  - "Include numbers" (may not show if only numbers)
  - "Include special characters"

#### Test 2.2: Fair Password
- [ ] Enter "Password1" in password field
- [ ] Expected: Progress bar shows ~2/3 (yellow), label shows "Fair"
- [ ] Expected feedback items:
  - "At least 12 characters for stronger password"
  - "Include special characters"

#### Test 2.3: Strong Password
- [ ] Enter "StrongP@ss123" in password field
- [ ] Expected: Progress bar shows 3/3 (green), label shows "Strong"
- [ ] Expected: No feedback items should display

#### Test 2.4: Show/Hide Password Toggle
- [ ] Click eye icon in password field
- [ ] Expected: Password becomes visible
- [ ] Click again
- [ ] Expected: Password becomes hidden (dots)
- [ ] Note: Both password and confirm password toggle together

### 3. Valid Submission Test (Full Registration)
**Location:** `http://localhost:3000/register/patient`

#### Test 3.1: Complete Patient Registration
- [ ] Fill form with valid data:
  ```
  First Name: John
  Last Name: Doe
  Email: john.doe@example.com
  Password: SecurePass123!
  Confirm Password: SecurePass123!
  Age: 30
  Gender: Male (or Female/Other)
  Phone: 9876543210
  ```
- [ ] Click "Create Account"
- [ ] Expected: Loading spinner shows "Creating Account..."
- [ ] Expected: Success message appears "Registration successful! Redirecting to dashboard..."
- [ ] Expected: Auto-redirect to `/patient/dashboard` after 2 seconds
- [ ] Expected: Dashboard loads with welcome message
- [ ] Check browser console (F12) for any errors - Expected: None

#### Test 3.2: Verify Token Saved
- [ ] After successful registration, open DevTools (F12)
- [ ] Go to "Application" → "Local Storage" → `http://localhost:3000`
- [ ] Expected: See keys `token`, `user` (with patient data), `role` = "patient"
- [ ] Expected: Token should start with "eyJ..." (JWT format)

## Doctor Registration Flow Testing

### 4. Form Validation Tests (No Backend Call)
**Location:** `http://localhost:3000/register/doctor`

#### Test 4.1: Empty Form Submission
- [ ] Click "Create Doctor Account" with empty form
- [ ] Expected: All fields show error messages
  - "First name is required"
  - "Last name is required"
  - "Email is required"
  - "Password is required"
  - "Confirm Password is required" (or similar)
  - "Phone number is required"
  - "Speciality is required"
  - "Medical license number is required"
  - "Years of experience is required"

#### Test 4.2: Invalid Speciality
- [ ] Leave "Speciality" as "Select Speciality" (default)
- [ ] Fill other fields validly
- [ ] Click "Create Doctor Account"
- [ ] Expected: Error "Speciality is required"

#### Test 4.3: Invalid License
- [ ] Enter "LIC" in license field (less than 5 characters)
- [ ] Fill other fields validly
- [ ] Click "Create Doctor Account"
- [ ] Expected: Error "License number must be at least 5 characters"

#### Test 4.4: Invalid Experience
- [ ] Enter "-5" in experience field
- [ ] Fill other fields validly
- [ ] Click "Create Doctor Account"
- [ ] Expected: Error "Please enter a valid years of experience"
- [ ] Repeat with "71"
- [ ] Expected: Same error

### 5. Password Strength Indicator Tests (Doctor)
**Location:** `http://localhost:3000/register/doctor`

#### Test 5.1: Feedback Display
- [ ] Enter "Pass" in password field
- [ ] Expected: Progress bar (red, 1/3)
- [ ] Expected: Feedback list shows suggestions:
  - "At least 12 characters for stronger password"
  - "Include uppercase letters"
  - "Include numbers"
  - "Include special characters"
- [ ] NOTE: This is the fix we just applied! If feedback doesn't show, the fix didn't work.

#### Test 5.2: Confirm Password Visibility Toggle
- [ ] Click eye icon
- [ ] Expected: Both password AND confirm password fields become visible
- [ ] Click again
- [ ] Expected: Both become hidden

### 6. Valid Doctor Registration
**Location:** `http://localhost:3000/register/doctor`

#### Test 6.1: Complete Doctor Registration
- [ ] Fill form with valid data:
  ```
  First Name: Jane
  Last Name: Smith
  Email: jane.smith@example.com
  Password: DocPass123!@#
  Confirm Password: DocPass123!@#
  Phone: 9876543210
  Speciality: Cardiology (or any from dropdown)
  Medical License: LICENSE123456
  Experience (Years): 8
  ```
- [ ] Click "Create Doctor Account"
- [ ] Expected: Loading spinner shows "Creating Account..."
- [ ] Expected: Success message "Registration successful! Redirecting to dashboard..."
- [ ] Expected: Auto-redirect to `/doctor/dashboard` after 2 seconds
- [ ] Expected: Dashboard loads (may be generic DashboardPage for now)
- [ ] Check browser console - Expected: No errors

#### Test 6.2: Verify Doctor Token Saved
- [ ] After successful registration, open DevTools (F12)
- [ ] Go to "Application" → "Local Storage" → `http://localhost:3000`
- [ ] Expected: See keys `token`, `user` (with doctor data), `role` = "doctor"
- [ ] Expected: Token should be valid JWT

## Patient Dashboard After Login Testing

### 7. PatientDashboard Page Tests
**Location:** Automatically navigated to after patient registration, or manually: `http://localhost:3000/patient/dashboard`

#### Test 7.1: Authentication Protection
- [ ] Without logging in, try to access `http://localhost:3000/patient/dashboard` directly
- [ ] Expected: Redirect to `/login` page
- [ ] Login as patient (use registered account or test account if available)
- [ ] Expected: Can now access `/patient/dashboard`

#### Test 7.2: Dashboard Content
- [ ] Verify welcome banner displays: "Welcome back, [FirstName]!" (should be "Welcome back, John!")
- [ ] Verify 4 stat cards display:
  - "Upcoming Appointments" with number
  - "Active Prescriptions" with number
  - "Total Doctors" with number
  - "Medical Records" with number
- [ ] All stat cards should have icons
- [ ] All stat cards should be clickable (change cursor to pointer on hover)

#### Test 7.3: Recent Appointments Section
- [ ] If patient has appointments, verify they display with:
  - Doctor name
  - Appointment date/time
  - Appointment type
- [ ] If no appointments, verify empty state displays with helpful message
- [ ] Verify appointments are sorted by date (newest first)

#### Test 7.4: Active Medications Section
- [ ] If patient has prescriptions, verify they display with:
  - Medicine name
  - Dosage
  - Frequency (e.g., 2x daily)
  - Doctor name
- [ ] If no medications, verify empty state with message

#### Test 7.5: Quick Action Buttons
- [ ] Verify 4 buttons exist:
  - "View Profile" 
  - "Book Appointment" 
  - "Medical History"
  - "Find Doctors"
- [ ] Click "View Profile" → Expected: Navigate to `/patient/profile`
- [ ] Click back button then click "Medical History" → Expected: Navigate to `/patient/medical-history`
- [ ] Click back button then click "Find Doctors" → Expected: Navigate to `/doctors`
- [ ] Click back button then "Book Appointment" works (may not have full functionality yet)

### 8. PatientProfileView Tests
**Location:** `http://localhost:3000/patient/profile` (click "View Profile" from dashboard)

#### Test 8.1: Profile Display
- [ ] Verify sidebar displays:
  - Avatar with patient initials (e.g., "JD" for John Doe)
  - Patient name
  - "Active" status badge (green)
  - "Member Since" date
- [ ] Verify main content shows:
  - Personal Information: firstName, lastName, age, gender
  - Contact Information: email (clickable), phone (clickable)
  - Medical Overview: Allergies, Conditions, Medications
  - Account Details: Status, Member Since, Last Updated

#### Test 8.2: Action Buttons
- [ ] "Edit Profile" button → Navigate to `/patient/profile/edit`
- [ ] "Medical History" button → Navigate to `/patient/medical-history`
- [ ] Back button → Navigate to `/patient/dashboard`

### 9. PatientProfileEdit Tests
**Location:** `http://localhost:3000/patient/profile/edit` (click "Edit Profile" from profile view)

#### Test 9.1: Form Pre-filled
- [ ] Verify form is pre-populated with current patient data
- [ ] All fields should have current values
- [ ] Verify gender dropdown shows current selection

#### Test 9.2: Form Validation
- [ ] Clear first name field and try to save
- [ ] Expected: Error "First name is required"
- [ ] Enter "A" in first name
- [ ] Expected: Error "First name must be at least 2 characters"
- [ ] Test other validations similarly

#### Test 9.3: Successful Update
- [ ] Change first name from "John" to "Jonathan"
- [ ] Click "Save Changes"
- [ ] Expected: Success toast appears
- [ ] Expected: Auto-redirect to `/patient/profile` after 2 seconds
- [ ] Go back to edit
- [ ] Expected: First name should now be "Jonathan"

#### Test 9.4: Cancel Button
- [ ] Make a change (e.g., change age)
- [ ] Click "Cancel"
- [ ] Expected: Navigate back to `/patient/profile` WITHOUT saving
- [ ] Verify age wasn't changed

### 10. MedicalHistoryView Tests
**Location:** `http://localhost:3000/patient/medical-history` (click "Medical History" from dashboard/profile)

#### Test 10.1: Sections Display
- [ ] Verify 3 main sections:
  - Known Allergies (with allergy count)
  - Medical Conditions (with condition count)
  - Current Medications (with medication count)
  - Health Summary (3 stat cards at bottom)

#### Test 10.2: Allergy Display
- [ ] If patient has allergies, verify they display as red badges with warning icons
- [ ] If no allergies, verify empty state message: "No known allergies recorded"

#### Test 10.3: Condition Display
- [ ] If patient has conditions, verify as orange badges
- [ ] If no conditions, verify empty state message: "No medical conditions recorded"

#### Test 10.4: Medication Display
- [ ] If patient has medications, verify table with columns:
  - Medication name
  - Dosage
  - Frequency
  - Status (should show "Active")
- [ ] If no medications, verify empty state message: "No current medications"

#### Test 10.5: Summary Stats
- [ ] Verify 3 stat cards showing:
  - Number of allergies (red box)
  - Number of conditions (orange box)
  - Number of active medications (green box)

#### Test 10.6: Navigation
- [ ] "Back to Profile" button navigates to `/patient/profile`
- [ ] Also verify action button at bottom works

## Header/Navigation Tests

### 11. Header Component Tests
**Location:** Visible on all pages

#### Test 11.1: Unauthenticated State
- [ ] Visit any page without login
- [ ] Expected: Header shows branding/logo
- [ ] Expected: "Login" and "Register" links visible
- [ ] Expected: No user dropdown

#### Test 11.2: Authenticated State (Patient)
- [ ] Login as patient
- [ ] Expected: Header shows user name or "Welcome, [FirstName]"
- [ ] Expected: Dropdown menu available
- [ ] Expected: "Profile" link in dropdown
- [ ] Expected: "Logout" link in dropdown
- [ ] Click "Profile" → Navigate to `/patient/profile`
- [ ] Click dropdown again, click "Logout"
- [ ] Expected: Token removed from localStorage
- [ ] Expected: Redirect to `/login`

#### Test 11.3: Authenticated State (Doctor)
- [ ] Login as doctor (or register new doctor)
- [ ] Expected: Header shows doctor name
- [ ] Expected: "Doctor Dashboard" or "Dashboard" link visible
- [ ] Click on it → Navigate to `/doctor/dashboard`

## Network Error Handling

### 12. Backend Server Down Tests
**Location:** Stop docker-compose before tests

#### Test 12.1: Patient Registration with Server Down
- [ ] Stop backend: `docker-compose down`
- [ ] Try to register as patient with valid data
- [ ] Expected: Error message appears: "Network error. Please check if backend server is running on http://localhost:5000"

#### Test 12.2: Recovery After Server Restart
- [ ] Restart backend: `docker-compose up -d`
- [ ] Try registration again
- [ ] Expected: Registration succeeds
- [ ] Expected: Redirect to dashboard works

## Responsive Design Tests

### 13. Mobile Responsiveness
**Location:** All pages

#### Test 13.1: Patient Dashboard Mobile
- [ ] Open DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
- [ ] Set viewport to iPhone 12 (390x844)
- [ ] Expected: Stat cards stack vertically (1 per row, not 4)
- [ ] Expected: All content is readable, no horizontal scroll
- [ ] Expected: Buttons are easily clickable (at least 44x44px)

#### Test 13.2: Registration Form Mobile
- [ ] Set viewport to 375px wide
- [ ] Expected: Form fields stack vertically
- [ ] Expected: No horizontal scroll
- [ ] Expected: Password strength indicator is visible

#### Test 13.3: Profile View Mobile
- [ ] Set viewport to mobile
- [ ] Expected: Sidebar appears as full-width section at top
- [ ] Expected: Content cards stack in single column
- [ ] Expected: Medical overview badges/icons readable

## Summary & Sign-Off

After completing all tests above:

- [ ] Patient registration works end-to-end
- [ ] Doctor registration works end-to-end  
- [ ] All 4 patient pages accessible and functional
- [ ] Form validation working correctly
- [ ] Error handling displays proper messages
- [ ] Success redirects work properly
- [ ] Protected routes prevent unauthorized access
- [ ] Header shows user info and allows logout
- [ ] Mobile design is responsive and usable
- [ ] No console errors in DevTools
- [ ] No TypeScript compilation errors

**Status:** ✅ READY FOR GIT COMMIT when all tests pass

## Notes for Tester
- If any test fails, note the test number and expected vs actual behavior
- Check browser console (F12) for JavaScript errors
- Check Network tab in DevTools to see API calls being made
- If API errors occur, check backend logs: `docker-compose logs -f backend`
- For styling issues, right-click and "Inspect" element to see applied CSS classes
