# Database Schema Documentation

## Patient Collection

### Structure
```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, min 6),
  age: Number (required),
  gender: String (enum: ['Male', 'Female', 'Other']),
  phone: String (required, unique),
  address: String,
  medicalHistory: {
    conditions: [String],
    allergies: [String],
    medications: [String]
  },
  role: String (default: 'patient', enum: ['patient', 'admin', 'doctor']),
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- `email` (unique)
- `phone` (unique)

### Sample Data
```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "$2a$10$...",
  "age": 30,
  "gender": "Male",
  "phone": "1234567890",
  "address": "123 Main St, City",
  "medicalHistory": {
    "conditions": ["Hypertension", "Diabetes"],
    "allergies": ["Penicillin"],
    "medications": ["Lisinopril", "Metformin"]
  },
  "role": "patient",
  "createdAt": ISODate("2026-03-24T10:00:00Z"),
  "updatedAt": ISODate("2026-03-24T10:00:00Z")
}
```

## Doctor Collection

### Structure
```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, min 6),
  phone: String (required, unique),
  speciality: String (required),
  license: String (required),
  experience: Number (default: 0),
  schedule: {
    Monday: { startTime: String, endTime: String, available: Boolean },
    Tuesday: { startTime: String, endTime: String, available: Boolean },
    Wednesday: { startTime: String, endTime: String, available: Boolean },
    Thursday: { startTime: String, endTime: String, available: Boolean },
    Friday: { startTime: String, endTime: String, available: Boolean },
    Saturday: { startTime: String, endTime: String, available: Boolean },
    Sunday: { startTime: String, endTime: String, available: Boolean }
  },
  bio: String,
  consultationFee: Number (default: 0),
  role: String (default: 'doctor', enum: ['patient', 'admin', 'doctor']),
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- `email` (unique)
- `phone` (unique)
- `speciality`

### Sample Data
```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "password": "$2a$10$...",
  "phone": "9876543210",
  "speciality": "Cardiology",
  "license": "MED123456",
  "experience": 8,
  "schedule": {
    "Monday": { "startTime": "09:00", "endTime": "17:00", "available": true },
    "Tuesday": { "startTime": "09:00", "endTime": "17:00", "available": true },
    "Wednesday": { "startTime": "09:00", "endTime": "17:00", "available": true },
    "Thursday": { "startTime": "09:00", "endTime": "17:00", "available": true },
    "Friday": { "startTime": "09:00", "endTime": "17:00", "available": true },
    "Saturday": { "startTime": "10:00", "endTime": "14:00", "available": false },
    "Sunday": { "startTime": "", "endTime": "", "available": false }
  },
  "bio": "Experienced Cardiologist with 8 years of practice",
  "consultationFee": 100,
  "role": "doctor",
  "createdAt": ISODate("2026-03-24T10:00:00Z"),
  "updatedAt": ISODate("2026-03-24T10:00:00Z")
}
```

## Appointment Collection

### Structure
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: Patient, required),
  doctorId: ObjectId (ref: Doctor, required),
  date: Date (required),
  time: String (required),
  status: String (enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'], default: 'scheduled'),
  reason: String,
  notes: String,
  cancelledAt: Date,
  cancelledReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- `patientId`
- `doctorId`
- `date`
- `status`

### Sample Data
```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "patientId": ObjectId("507f1f77bcf86cd799439011"),
  "doctorId": ObjectId("507f1f77bcf86cd799439012"),
  "date": ISODate("2026-04-15T00:00:00Z"),
  "time": "10:00 AM",
  "status": "scheduled",
  "reason": "Regular heart checkup",
  "notes": "Patient has family history of heart disease",
  "createdAt": ISODate("2026-03-24T10:00:00Z"),
  "updatedAt": ISODate("2026-03-24T10:00:00Z")
}
```

## Prescription Collection

### Structure
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: Patient, required),
  doctorId: ObjectId (ref: Doctor, required),
  medicines: [
    {
      name: String (required),
      dosage: String (required),
      frequency: String (enum: ['Once daily', 'Twice daily', 'Three times daily', 'Twice weekly', 'As needed'], required),
      duration: String (required),
      instructions: String
    }
  ],
  notes: String,
  diagnosisDate: Date (default: now),
  expiryDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- `patientId`
- `doctorId`
- `diagnosisDate`

### Sample Data
```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439014"),
  "patientId": ObjectId("507f1f77bcf86cd799439011"),
  "doctorId": ObjectId("507f1f77bcf86cd799439012"),
  "medicines": [
    {
      "name": "Aspirin",
      "dosage": "500mg",
      "frequency": "Twice daily",
      "duration": "7 days",
      "instructions": "Take with food to avoid stomach upset"
    },
    {
      "name": "Metformin",
      "dosage": "1000mg",
      "frequency": "Twice daily",
      "duration": "30 days",
      "instructions": "Take with meals"
    }
  ],
  "notes": "Follow up after 1 week. Monitor blood sugar levels.",
  "diagnosisDate": ISODate("2026-03-24T10:00:00Z"),
  "expiryDate": ISODate("2026-04-24T10:00:00Z"),
  "createdAt": ISODate("2026-03-24T10:00:00Z"),
  "updatedAt": ISODate("2026-03-24T10:00:00Z")
}
```

## Database Relationships

### Patient ↔ Appointment ↔ Doctor
```
Patient (1) ─── (N) Appointment ─── (1) Doctor
```

### Patient ↔ Prescription ← Doctor
```
Patient (1) ─── (N) Prescription ── (1) Doctor
```

## Queries Examples

### MongoDB Queries

#### Find all appointments for a patient
```javascript
db.appointments.find({ 
  patientId: ObjectId("507f1f77bcf86cd799439011") 
})
```

#### Find all appointments with a specific doctor
```javascript
db.appointments.find({ 
  doctorId: ObjectId("507f1f77bcf86cd799439012") 
})
```

#### Find appointments scheduled for a specific date
```javascript
db.appointments.find({ 
  date: { 
    $gte: ISODate("2026-04-15"),
    $lt: ISODate("2026-04-16")
  }
})
```

#### Find all medical conditions for a patient
```javascript
db.patients.findOne(
  { _id: ObjectId("507f1f77bcf86cd799439011") },
  { "medicalHistory.conditions": 1 }
)
```

#### Find doctors by speciality
```javascript
db.doctors.find({ speciality: "Cardiology" })
```

#### Find all active prescriptions
```javascript
db.prescriptions.find({ 
  expiryDate: { $gt: new Date() } 
})
```

## Backup & Recovery

### Backup MongoDB
```bash
mongodump --uri "mongodb://localhost:27017/hms" --out ./backup
```

### Restore MongoDB
```bash
mongorestore --uri "mongodb://localhost:27017/hms" ./backup/hms
```

### MongoDB Atlas Backup
Use MongoDB Atlas automated backup feature or backup snapshots.


## Maintenance log
Project tree was cleared and all markdown files were updated on 2026-03-26.
