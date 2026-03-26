# Phase 2.2 Quick Reference Guide

**Last Updated**: March 24, 2026

---

## 🚀 Quick Start for Development

### To Test Login/Authentication
```bash
cd frontend
npm run dev

# Navigate to http://localhost:3000
# Click Login
# Use test credentials (Patient or Doctor)
# Should see logged-in user in Header dropdown
```

### To Build a New Page
**Template for Patient Page** (PatientDashboard, ProfileView, etc.):
```jsx
import { useAuth } from '../context/AuthContext';
import { usePatient } from '../context/PatientContext';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Card from '../components/Card';

export function MyPatientPage() {
  const { user } = useAuth();
  const { currentPatient, loading, error, fetchCurrentPatient } = usePatient();
  
  useEffect(() => {
    if (user?.id) {
      fetchCurrentPatient(user._id);
    }
  }, [user]);
  
  if (loading) return <LoadingSpinner text="Loading patient data..." />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <Card title={`Welcome, ${currentPatient?.firstName}`}>
      {/* Your content here */}
    </Card>
  );
}

export default MyPatientPage;
```

**Template for Doctor Page** (Same pattern but use `useDoctor()`):
```jsx
import { useDoctor } from '../context/DoctorContext';
// Rest is same pattern
```

---

## 📚 Component Usage Quick Reference

### FormInput
```jsx
<FormInput
  label="Patient Name"
  name="firstName"
  type="text"
  value={formData.firstName}
  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
  error={errors.firstName}
  required
/>
```

### Card
```jsx
<Card
  title="Patient Profile"
  subtitle="Personal Information"
  actions={
    <button className="text-blue-600">Edit</button>
  }
>
  Card content goes here
</Card>
```

### LoadingSpinner
```jsx
<LoadingSpinner size="md" text="Loading..." />
// sizes: sm, md, lg
```

### ErrorMessage
```jsx
<ErrorMessage
  message="Failed to load data"
  onRetry={handleRetry}
  dismissible
/>
```

### SuccessToast
```jsx
{showSuccess && <SuccessToast message="Profile updated!" duration={3000} />}
```

### ProfilePictureUpload
```jsx
<ProfilePictureUpload
  currentImageUrl={currentDoctor?.profilePicture}
  onUpload={handleImageUpload}
  maxSizeMB={5}
/>
```

---

## 🔐 Protected Routes

### Add New Protected Route
```jsx
// In App.jsx
<Route
  path="/patient/my-page"
  element={
    <ProtectedRoute 
      element={<MyPatientPage />} 
      allowedRoles="patient" 
    />
  }
/>
```

### Check Authentication in Component
```jsx
const { isAuthenticated, role } = useAuth();

if (role !== 'patient') {
  return <Navigate to="/doctor/dashboard" />;
}
```

---

## 🔌 API Integration Examples

### Fetch Patient Data
```jsx
const { user } = useAuth();
const { currentPatient, fetchCurrentPatient } = usePatient();

// In useEffect
fetchCurrentPatient(user._id)
  .then(data => console.log('Patient loaded:', data))
  .catch(err => console.error('Error:', err));
```

### Update Patient
```jsx
const { updatePatient } = usePatient();

const handleUpdate = async (updatedData) => {
  try {
    const result = await updatePatient(user._id, updatedData);
    // Success - show toast
    setShowSuccess(true);
  } catch (err) {
    // Error - show error message
    setError(err.message);
  }
};
```

### Update Doctor Schedule
```jsx
const { updateDoctorSchedule } = useDoctor();

const handleSaveSchedule = async (newSchedule) => {
  const updatedSchedule = {
    schedule: {
      monday: { startTime: '09:00', endTime: '17:00', available: true },
      // ... other days
    }
  };
  
  await updateDoctorSchedule(user._id, newSchedule.schedule);
};
```

---

## 📱 Responsive Design Breakpoints

All components built with Tailwind responsive classes:

```jsx
// Example responsive classes
<div className="
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
  gap-4 sm:gap-6 lg:gap-8
">
  {/* Responsive grid */}
</div>
```

**Breakpoints**:
- `sm`: 640px (tablets)
- `md`: 768px (landscape tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large screens)

---

## 🧪 Testing Checklist

### Before Submitting a Page
- [ ] Test login/logout works
- [ ] Page loads with real data
- [ ] Loading spinner appears
- [ ] Error handling shows properly
- [ ] All form validations work
- [ ] Responsive on mobile (use DevTools)
- [ ] No console errors
- [ ] Header shows user info and dropdown

### Browser DevTools
```
F12 → Console Tab
Look for any red errors - Fix them!

F12 → Network Tab
Verify API calls are being made with JWT token
Should see "Authorization: Bearer [token]" in headers
```

---

## 🐛 Common Issues & Solutions

### Issue: useAuth() returns undefined
**Solution**: Make sure App.jsx is wrapped with `<AuthProvider>`

### Issue: Page shows empty state but no loading spinner
**Solution**: Check useEffect dependencies, might need to add user._id

### Issue: API calls fail with 401
**Solution**: Token might be expired or not being sent. Check:
1. localStorage has 'token' and 'user'
2. Header.jsx shows user info
3. Network tab shows Authorization header

### Issue: ProtectedRoute redirects to wrong page
**Solution**: Check that role was stored correctly:
```jsx
console.log('Current role:', localStorage.getItem('role'));
```

### Issue: Context data is null
**Solution**: Make sure you're using the hook INSIDE a component wrapped by the provider

---

## 📊 State Flow Diagram

```
User Logs In
    ↓
AuthContext.login(userData, token, role)
    ↓
Stored in localStorage
    ↓
Header reads from AuthContext
    ↓
Page mounts inside ProtectedRoute
    ↓
Page component calls usePatient() or useDoctor()
    ↓
Context method called (e.g., fetchCurrentPatient)
    ↓
API call made with JWT token
    ↓
Data stored in context state
    ↓
Component re-renders with data
    ↓
LoadingSpinner removed, content shows
```

---

## 📋 Files You'll Create (Week 2-3)

**Week 2 - Patient Pages** (4 files):
1. `/frontend/src/pages/PatientDashboard.jsx`
2. `/frontend/src/pages/PatientProfileView.jsx`
3. `/frontend/src/pages/PatientProfileEdit.jsx`
4. `/frontend/src/pages/MedicalHistoryView.jsx`

**Week 3 - Doctor Pages** (4 files):
1. `/frontend/src/pages/DoctorDashboard.jsx`
2. `/frontend/src/pages/DoctorProfileView.jsx`
3. `/frontend/src/pages/DoctorProfileEdit.jsx`
4. `/frontend/src/pages/DoctorScheduleManager.jsx`

**Update App.jsx** (Add routes for all new pages)

---

## 🔗 Important Links

**Documentation**:
- [Full Technical Spec](PHASE_2_2_SPEC.md)
- [Implementation Checklist](PHASE_2_2_CHECKLIST.md)
- [Week 1 Report](PHASE_2_2_WEEK1_REPORT.md)
- [Overall Summary](PHASE_2_2_SUMMARY.md)

**API Docs**:
- Backend routes: `/backend/src/routes/`
- API base URL: `http://localhost:5000/api`

**Getting Help**:
1. Check the specific documentation for that task
2. Look at usage examples in this guide
3. Review component source code (has JSDoc comments)
4. Check Network tab in DevTools for API issues

---

## ⚡ Pro Tips

1. **Test as you build** - Don't wait until end to test
2. **Use DevTools** - Network tab will show all API calls
3. **Console logs** - Use `console.log()` to debug data flow
4. **Mobile first** - Always test on phone-sized screen first
5. **Component reuse** - Don't create new components if library one exists
6. **Error handling** - Always show user what went wrong
7. **Loading states** - Always show spinner while fetching
8. **Form validation** - Validate on change, show helpful messages

---

## 🎯 Success Indicators

Page is ready when:
- ✅ Loads without errors
- ✅ Shows loading state while fetching
- ✅ Displays data from API
- ✅ Handles errors gracefully
- ✅ Forms work with validation
- ✅ Responsive on all screen sizes
- ✅ No console errors
- ✅ User can logout and app state clears

---

**Happy coding! 🚀**

Questions? Check the detailed documentation mentioned above.


## Maintenance log
Project tree was cleared and all markdown files were updated on 2026-03-26.
