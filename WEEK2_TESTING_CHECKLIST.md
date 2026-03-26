# Week 2 Testing & Validation Checklist

## Pre-Testing Requirements
- [x] Backend running on `http://localhost:5000` (verify: `docker ps`)
- [x] Frontend dev server running on `http://localhost:3000` (verify: `npm run dev`)
- [x] No TypeScript/ESLint errors in `/frontend/src`
- [x] All 4 patient pages created in `/frontend/src/pages/`
- [x] All routes added to `App.jsx` with `ProtectedRoute` wrappers

## Patient Registration Flow Testing

### 1. Form Validation Tests (No Backend Call)
**Location:** `http://localhost:3000/register/patient`

#### Test 1.1: Empty Form Submission
- [x] Click "Create Account" with empty form
- [x] Expected: All fields show error messages
  - "First name is required"
  - "Last name is required"
  - "Email is required"
  - "Password is required"
  - "Confirm Password is required" (or similar)
  - "Age is required"
  - "Gender is required"
  - "Phone number is required"

#### Test 1.2: Invalid Email
- [x] Enter "notanemail" in email field
- [x] Click elsewhere or submit
- [x] Expected: Error "Please enter a valid email address"

#### Test 1.3: Invalid Phone
- [x] Enter "123" in phone field (less than 10 digits)
- [x] Click elsewhere or submit
- [x] Expected: Error "Please enter a valid phone number"

#### Test 1.4: Invalid Age
- [x] Enter age "17" (below 18)
- [x] Click elsewhere or submit
- [x] Expected: Error "Age must be between 18 and 120"
- [x] Repeat with age "121"
- [x] Expected: Same error message

#### Test 1.5: Short First/Last Name
- [x] Enter "J" in First Name
- [x] Enter "D" in Last Name
- [x] Expected: Errors "First name must be at least 2 characters", "Last name must be at least 2 characters"

#### Test 1.6: Password Mismatch
- [x] Enter "Password123" in Password field
- [x] Enter "Password456" in Confirm Password field
- [x] Expected: Error "Passwords do not match"

#### Test 1.7: Short Password
- [x] Enter "12345" in Password field
- [x] Expected: Error "Password must be at least 6 characters"

### 2. Password Strength Indicator Tests
**Location:** `http://localhost:3000/register/patient`

#### Test 2.1: Weak Password
- [x] Enter "123456" in password field
- [x] Expected: Progress bar shows 1/3 (red), label shows "Weak"
- [x] Expected feedback items:
  - "At least 12 characters for stronger password"
  - "Include uppercase letters"
  - "Include numbers" (may not show if only numbers)
  - "Include special characters"

#### Test 2.2: Fair Password
- [x] Enter "Password1" in password field
- [x] Expected: Progress bar shows ~2/3 (yellow), label shows "Fair"
- [x] Expected feedback items:
  - "At least 12 characters for stronger password"
  - "Include special characters"

#### Test 2.3: Strong Password
- [x] Enter "StrongP@ss123" in password field
- [x] Expected: Progress bar shows 3/3 (green), label shows "Strong"
- [x] Expected: No feedback items should display

#### Test 2.4: Show/Hide Password Toggle
- [x] Click eye icon in password field
- [x] Expected: Password becomes visible
- [x] Click again
- [x] Expected: Password becomes hidden (dots)
- [x] Note: Both password and confirm password toggle together

### 3. Valid Submission Test (Full Registration)
**Location:** `http://localhost:3000/register/patient`

#### Test 3.1: Complete Patient Registration
- [x] Fill form with valid data:
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
- [x] Click "Create Account"
- [x] Expected: Loading spinner shows "Creating Account..."
- [x] Expected: Success message appears "Registration successful! Redirecting to dashboard..."
- [x] Expected: Auto-redirect to `/patient/dashboard` after 2 seconds
- [x] Expected: Dashboard loads with welcome message
- [x] Check browser console (F12) for any errors - Expected: None

#### Test 3.2: Verify Token Saved
- [x] After successful registration, open DevTools (F12)
- [x] Go to "Application" → "Local Storage" → `http://localhost:3000`
- [x] Expected: See keys `token`, `user` (with patient data), `role` = "patient"
- [x] Expected: Token should start with "eyJ..." (JWT format)

## Doctor Registration Flow Testing

### 4. Form Validation Tests (No Backend Call)
**Location:** `http://localhost:3000/register/doctor`

#### Test 4.1: Empty Form Submission
- [x] Click "Create Doctor Account" with empty form
- [x] Expected: All fields show error messages
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
- [x] Leave "Speciality" as "Select Speciality" (default)
- [x] Fill other fields validly
- [x] Click "Create Doctor Account"
- [x] Expected: Error "Speciality is required"

#### Test 4.3: Invalid License
- [x] Enter "LIC" in license field (less than 5 characters)
- [x] Fill other fields validly
- [x] Click "Create Doctor Account"
- [x] Expected: Error "License number must be at least 5 characters"

#### Test 4.4: Invalid Experience
- [x] Enter "-5" in experience field
- [x] Fill other fields validly
- [x] Click "Create Doctor Account"
- [x] Expected: Error "Please enter a valid years of experience"
- [x] Repeat with "71"
- [x] Expected: Same error

### 5. Password Strength Indicator Tests (Doctor)
**Location:** `http://localhost:3000/register/doctor`

#### Test 5.1: Feedback Display
- [x] Enter "Pass" in password field
- [x] Expected: Progress bar (red, 1/3)
- [x] Expected: Feedback list shows suggestions:
  - "At least 12 characters for stronger password"
  - "Include uppercase letters"
  - "Include numbers"
  - "Include special characters"
- [x] NOTE: This is the fix we just applied! If feedback doesn't show, the fix didn't work.

#### Test 5.2: Confirm Password Visibility Toggle
- [x] Click eye icon
- [x] Expected: Both password AND confirm password fields become visible
- [x] Click again
- [x] Expected: Both become hidden

### 6. Valid Doctor Registration
**Location:** `http://localhost:3000/register/doctor`

#### Test 6.1: Complete Doctor Registration
- [x] Fill form with valid data:
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
- [x] Click "Create Doctor Account"
- [x] Expected: Loading spinner shows "Creating Account..."
- [x] Expected: Success message "Registration successful! Redirecting to dashboard..."
- [x] Expected: Auto-redirect to `/doctor/dashboard` after 2 seconds
- [x] Expected: Dashboard loads (may be generic DashboardPage for now)
- [x] Check browser console - Expected: No errors

#### Test 6.2: Verify Doctor Token Saved
- [x] After successful registration, open DevTools (F12)
- [x] Go to "Application" → "Local Storage" → `http://localhost:3000`
- [x] Expected: See keys `token`, `user` (with doctor data), `role` = "doctor"
- [x] Expected: Token should be valid JWT

## Patient Dashboard After Login Testing

### 7. PatientDashboard Page Tests
**Location:** Automatically navigated to after patient registration, or manually: `http://localhost:3000/patient/dashboard`

#### Test 7.1: Authentication Protection
- [x] Without logging in, try to access `http://localhost:3000/patient/dashboard` directly
- [x] Expected: Redirect to `/login` page
- [x] Login as patient (use registered account or test account if available)
- [x] Expected: Can now access `/patient/dashboard`

#### Test 7.2: Dashboard Content
- [x] Verify welcome banner displays: "Welcome back, [FirstName]!" (should be "Welcome back, John!")
- [x] Verify 4 stat cards display:
  - "Upcoming Appointments" with number
  - "Active Prescriptions" with number
  - "Total Doctors" with number
  - "Medical Records" with number
- [x] All stat cards should have icons
- [x] All stat cards should be clickable (change cursor to pointer on hover)

#### Test 7.3: Recent Appointments Section
- [x] If patient has appointments, verify they display with:
  - Doctor name
  - Appointment date/time
  - Appointment type
- [x] If no appointments, verify empty state displays with helpful message
- [x] Verify appointments are sorted by date (newest first)

#### Test 7.4: Active Medications Section
- [x] If patient has prescriptions, verify they display with:
  - Medicine name
  - Dosage
  - Frequency (e.g., 2x daily)
  - Doctor name
- [x] If no medications, verify empty state with message

#### Test 7.5: Quick Action Buttons
- [x] Verify 4 buttons exist:
  - "View Profile" 
  - "Book Appointment" 
  - "Medical History"
  - "Find Doctors"
- [x] Click "View Profile" → Expected: Navigate to `/patient/profile`
- [x] Click back button then click "Medical History" → Expected: Navigate to `/patient/medical-history`
- [x] Click back button then click "Find Doctors" → Expected: Navigate to `/doctors`
- [x] Click back button then "Book Appointment" works (may not have full functionality yet)

### 8. PatientProfileView Tests
**Location:** `http://localhost:3000/patient/profile` (click "View Profile" from dashboard)

#### Test 8.1: Profile Display
- [x] Verify sidebar displays:
  - Avatar with patient initials (e.g., "JD" for John Doe)
  - Patient name
  - "Active" status badge (green)
  - "Member Since" date
- [x] Verify main content shows:
  - Personal Information: firstName, lastName, age, gender
  - Contact Information: email (clickable), phone (clickable)
  - Medical Overview: Allergies, Conditions, Medications
  - Account Details: Status, Member Since, Last Updated

#### Test 8.2: Action Buttons
- [x] "Edit Profile" button → Navigate to `/patient/profile/edit`
- [x] "Medical History" button → Navigate to `/patient/medical-history`
- [x] Back button → Navigate to `/patient/dashboard`

### 9. PatientProfileEdit Tests
**Location:** `http://localhost:3000/patient/profile/edit` (click "Edit Profile" from profile view)

#### Test 9.1: Form Pre-filled
- [x] Verify form is pre-populated with current patient data
- [x] All fields should have current values
- [x] Verify gender dropdown shows current selection

#### Test 9.2: Form Validation
- [x] Clear first name field and try to save
- [x] Expected: Error "First name is required"
- [x] Enter "A" in first name
- [x] Expected: Error "First name must be at least 2 characters"
- [x] Test other validations similarly

#### Test 9.3: Successful Update
- [x] Change first name from "John" to "Jonathan"
- [x] Click "Save Changes"
- [x] Expected: Success toast appears
- [x] Expected: Auto-redirect to `/patient/profile` after 2 seconds
- [x] Go back to edit
- [x] Expected: First name should now be "Jonathan"

#### Test 9.4: Cancel Button
- [x] Make a change (e.g., change age)
- [x] Click "Cancel"
- [x] Expected: Navigate back to `/patient/profile` WITHOUT saving
- [x] Verify age wasn't changed

### 10. MedicalHistoryView Tests
**Location:** `http://localhost:3000/patient/medical-history` (click "Medical History" from dashboard/profile)

#### Test 10.1: Sections Display
- [x] Verify 3 main sections:
  - Known Allergies (with allergy count)
  - Medical Conditions (with condition count)
  - Current Medications (with medication count)
  - Health Summary (3 stat cards at bottom)

#### Test 10.2: Allergy Display
- [x] If patient has allergies, verify they display as red badges with warning icons
- [x] If no allergies, verify empty state message: "No known allergies recorded"

#### Test 10.3: Condition Display
- [x] If patient has conditions, verify as orange badges
- [x] If no conditions, verify empty state message: "No medical conditions recorded"

#### Test 10.4: Medication Display
- [x] If patient has medications, verify table with columns:
  - Medication name
  - Dosage
  - Frequency
  - Status (should show "Active")
- [x] If no medications, verify empty state message: "No current medications"

#### Test 10.5: Summary Stats
- [x] Verify 3 stat cards showing:
  - Number of allergies (red box)
  - Number of conditions (orange box)
  - Number of active medications (green box)

#### Test 10.6: Navigation
- [x] "Back to Profile" button navigates to `/patient/profile`
- [x] Also verify action button at bottom works

## Header/Navigation Tests

### 11. Header Component Tests
**Location:** Visible on all pages

#### Test 11.1: Unauthenticated State
- [x] Visit any page without login
- [x] Expected: Header shows branding/logo
- [x] Expected: "Login" and "Register" links visible
- [x] Expected: No user dropdown

#### Test 11.2: Authenticated State (Patient)
- [x] Login as patient
- [x] Expected: Header shows user name or "Welcome, [FirstName]"
- [x] Expected: Dropdown menu available
- [x] Expected: "Profile" link in dropdown
- [x] Expected: "Logout" link in dropdown
- [x] Click "Profile" → Navigate to `/patient/profile`
- [x] Click dropdown again, click "Logout"
- [x] Expected: Token removed from localStorage
- [x] Expected: Redirect to `/login`

#### Test 11.3: Authenticated State (Doctor)
- [x] Login as doctor (or register new doctor)
- [x] Expected: Header shows doctor name
- [x] Expected: "Doctor Dashboard" or "Dashboard" link visible
- [x] Click on it → Navigate to `/doctor/dashboard`

## Network Error Handling

### 12. Backend Server Down Tests
**Location:** Stop docker-compose before tests

#### Test 12.1: Patient Registration with Server Down
- [x] Stop backend: `docker-compose down`
- [x] Try to register as patient with valid data
- [x] Expected: Error message appears: "Network error. Please check if backend server is running on http://localhost:5000"

#### Test 12.2: Recovery After Server Restart
- [x] Restart backend: `docker-compose up -d`
- [x] Try registration again
- [x] Expected: Registration succeeds
- [x] Expected: Redirect to dashboard works

## Responsive Design Tests

### 13. Mobile Responsiveness
**Location:** All pages

#### Test 13.1: Patient Dashboard Mobile
- [x] Open DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
- [x] Set viewport to iPhone 12 (390x844)
- [x] Expected: Stat cards stack vertically (1 per row, not 4)
- [x] Expected: All content is readable, no horizontal scroll
- [x] Expected: Buttons are easily clickable (at least 44x44px)

#### Test 13.2: Registration Form Mobile
- [x] Set viewport to 375px wide
- [x] Expected: Form fields stack vertically
- [x] Expected: No horizontal scroll
- [x] Expected: Password strength indicator is visible

#### Test 13.3: Profile View Mobile
- [x] Set viewport to mobile
- [x] Expected: Sidebar appears as full-width section at top
- [x] Expected: Content cards stack in single column
- [x] Expected: Medical overview badges/icons readable

## Summary & Sign-Off

After completing all tests above:

- [x] Patient registration works end-to-end
- [x] Doctor registration works end-to-end  
- [x] All 4 patient pages accessible and functional
- [x] Form validation working correctly
- [x] Error handling displays proper messages
- [x] Success redirects work properly
- [x] Protected routes prevent unauthorized access
- [x] Header shows user info and allows logout
- [x] Mobile design is responsive and usable
- [x] No console errors in DevTools
- [x] No TypeScript compilation errors

**Status:** ✅ READY FOR GIT COMMIT when all tests pass

## Notes for Tester
- If any test fails, note the test number and expected vs actual behavior
- Check browser console (F12) for JavaScript errors
- Check Network tab in DevTools to see API calls being made
- If API errors occur, check backend logs: `docker-compose logs -f backend`
- For styling issues, right-click and "Inspect" element to see applied CSS classes


## Maintenance log
Project tree was cleared and all markdown files were updated on 2026-03-26.
