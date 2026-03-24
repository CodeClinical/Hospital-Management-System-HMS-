# API Testing Guide

## Using Postman to Test HMS API

### Import the Collection

1. Open Postman
2. Click "Import"
3. Paste the URL or import the collection JSON
4. Select the environment

### Environment Variables

Create a new environment in Postman with these variables:

```json
{
  "base_url": "http://localhost:5000/api",
  "patient_token": "your_jwt_token_here",
  "doctor_token": "your_jwt_token_here",
  "patient_id": "patient_id_from_db",
  "doctor_id": "doctor_id_from_db"
}
```

### Test Endpoints

#### 1. Patient Registration
```
POST {{base_url}}/auth/register/patient
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 30,
  "gender": "Male",
  "phone": "1234567890"
}
```

Expected Response:
```json
{
  "success": true,
  "message": "Patient registered successfully",
  "token": "eyJhbGc...",
  "patient": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

#### 2. Patient Login
```
POST {{base_url}}/auth/login/patient
{
  "email": "john@example.com",
  "password": "password123"
}
```

Save the token to environment variable `patient_token`

#### 3. Doctor Registration
```
POST {{base_url}}/auth/register/doctor
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "9876543210",
  "speciality": "Cardiology",
  "license": "MED123456"
}
```

#### 4. Get All Doctors
```
GET {{base_url}}/doctors
```

#### 5. Get Patients
```
GET {{base_url}}/patients
```

#### 6. Get Patient by ID
```
GET {{base_url}}/patients/{{patient_id}}
```

#### 7. Update Patient
```
PUT {{base_url}}/patients/{{patient_id}}
Authorization: Bearer {{patient_token}}
{
  "age": 31,
  "phone": "9999999999"
}
```

#### 8. Create Appointment
```
POST {{base_url}}/appointments
Authorization: Bearer {{patient_token}}
{
  "patientId": "{{patient_id}}",
  "doctorId": "{{doctor_id}}",
  "date": "2026-04-15",
  "time": "10:00 AM",
  "reason": "Regular checkup"
}
```

#### 9. Get Appointments
```
GET {{base_url}}/appointments?patientId={{patient_id}}
```

#### 10. Create Prescription
```
POST {{base_url}}/prescriptions
Authorization: Bearer {{doctor_token}}
{
  "patientId": "{{patient_id}}",
  "doctorId": "{{doctor_id}}",
  "medicines": [
    {
      "name": "Aspirin",
      "dosage": "500mg",
      "frequency": "Twice daily",
      "duration": "7 days",
      "instructions": "Take with food"
    }
  ],
  "notes": "Follow up after 1 week"
}
```

#### 11. Get Prescriptions
```
GET {{base_url}}/prescriptions?patientId={{patient_id}}
```

#### 12. Cancel Appointment
```
PATCH {{base_url}}/appointments/{{appointment_id}}/cancel
Authorization: Bearer {{patient_token}}
{
  "reason": "Unable to attend"
}
```

## Testing Checklist

### Authentication
- [ ] Patient can register
- [ ] Patient can login
- [ ] Doctor can register
- [ ] Doctor can login
- [ ] Invalid credentials return 401
- [ ] Missing fields return 400

### Patient CRUD
- [ ] Get all patients
- [ ] Get patient by ID
- [ ] Update patient (with auth)
- [ ] Delete patient (with auth)
- [ ] Get patient medical history
- [ ] Invalid ID returns 404

### Doctor CRUD
- [ ] Get all doctors
- [ ] Get doctor by ID
- [ ] Get doctor schedule
- [ ] Update doctor (with auth)
- [ ] Delete doctor (with auth)

### Appointments
- [ ] Create appointment (with auth)
- [ ] Get all appointments
- [ ] Get appointment by ID
- [ ] Update appointment (with auth)
- [ ] Cancel appointment (with auth)
- [ ] Delete appointment (with auth)
- [ ] Query by patientId
- [ ] Query by doctorId

### Prescriptions
- [ ] Create prescription (with auth)
- [ ] Get all prescriptions
- [ ] Get prescription by ID
- [ ] Get prescriptions by patient ID
- [ ] Update prescription (with auth)
- [ ] Delete prescription (with auth)

## Common Issues & Solutions

### 401 Unauthorized
- Check if token is valid and not expired
- Ensure token is included in Authorization header
- Format: `Authorization: Bearer <token>`

### 400 Bad Request
- Check required fields are provided
- Validate email format
- Ensure phone number format is correct

### 404 Not Found
- Verify the ID exists in database
- Check if MongoDB has the records
- Use MongoDB Atlas or `mongosh` to verify

### 500 Internal Server Error
- Check backend logs for error details
- Ensure MongoDB is connected
- Verify environment variables are set

## Sample Test Data

### Patient
```json
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice@example.com",
  "password": "SecurePassword123",
  "age": 28,
  "gender": "Female",
  "phone": "5551234567"
}
```

### Doctor
```json
{
  "firstName": "Robert",
  "lastName": "Brown",
  "email": "robert@example.com",
  "password": "SecurePassword123",
  "phone": "5559876543",
  "speciality": "Orthopedics",
  "license": "ORD456789"
}
```

## Performance Testing

### Load Testing
Use tools like Apache JMeter or Postman's collection runner to test:
- Multiple concurrent requests
- Response time under load
- Database query performance

### Stress Testing
- Increase request load gradually
- Monitor memory usage
- Check for memory leaks

## Documentation

For complete API documentation, see [SETUP.md](SETUP.md)
