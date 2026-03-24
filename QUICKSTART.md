# Quick Start Guide

Get HMS up and running in 5 minutes!

## Prerequisites

- Node.js v14+ ([Download](https://nodejs.org))
- MongoDB ([Local install](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

## Option 1: Local Setup (Recommended for Development)

### Step 1: Clone Repository
```bash
git clone https://github.com/CodeClinical/Hospital-Management-System-HMS-.git
cd Hospital-Management-System-HMS-
```

### Step 2: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Update `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hms
JWT_SECRET=your_secret_key_123
JWT_EXPIRE=7d
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup (New Terminal)
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend will run on `http://localhost:3000`

### Step 4: Access Application
Open browser and go to: `http://localhost:3000`

## Option 2: Docker Setup (Recommended for Production)

### Prerequisites
- Docker & Docker Compose installed

### Run with Docker
```bash
docker-compose up -d
```

Wait for containers to start (usually 30 seconds)

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

**Credentials:**
- MongoDB User: `admin`
- MongoDB Password: `password`

### Stop Services
```bash
docker-compose down
```

## Default Test Accounts

### Patient Account
- Email: `john@example.com`
- Password: `password123`
- Role: Patient

### Doctor Account
- Email: `jane@example.com`
- Password: `password123`
- Role: Doctor

## First Steps

### 1. Create a Patient Account
- Go to http://localhost:3000/login
- Click "Sign up"
- Fill in registration form
- Click "Register"

### 2. Create a Doctor Account
- Repeat above but select "Doctor" role during registration

### 3. Book an Appointment
- Login as patient
- Go to "Doctors" page
- Select a doctor
- Click "Book Appointment"
- Choose date and time
- Confirm booking

### 4. Create a Prescription
- Login as doctor
- Go to "Patients" or wait for appointment
- Create prescription with medicines
- Save and send to patient

## Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas connection string
- Or use Docker: `docker-compose up -d`

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```

**Solution:**
- Kill process: `lsof -ti:5000 | xargs kill -9`
- Or change PORT in .env file

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
- Ensure backend is running on port 5000
- Check VITE_API_BASE_URL in frontend .env.local
- Verify CORS is enabled in backend

### Module Not Found
```
Cannot find module 'express'
```

**Solution:**
- Run `npm install` in the backend/frontend directory
- Delete node_modules: `rm -rf node_modules`
- Run `npm install` again

## Next Steps

1. Explore the API:
   - Check [API_TESTING.md](API_TESTING.md) for endpoint examples
   - Use Postman to test endpoints

2. Read Documentation:
   - [SETUP.md](SETUP.md) - Complete setup guide
   - [DATABASE.md](DATABASE.md) - Database schema
   - [ROADMAP.md](ROADMAP.md) - Development phases

3. Start Developing:
   - Frontend components in `frontend/src/components`
   - Backend routes in `backend/src/routes`
   - Models in `backend/src/models`

4. Contributing:
   - Read [CONTRIBUTING.md](CONTRIBUTING.md)
   - Create feature branch
   - Submit pull requests

## Useful Commands

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
npm run lint     # Check code style
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code style
```

### Docker
```bash
docker-compose up       # Start services
docker-compose down     # Stop services
docker-compose logs -f  # View logs
docker-compose ps       # List services
```

### MongoDB (Local)
```bash
mongosh                 # Open MongoDB shell
show dbs               # List databases
use hms                # Use HMS database
show collections       # List collections
db.patients.find()     # Find all patients
```

## API Base URL

- Development: `http://localhost:5000/api`
- Used in frontend: `VITE_API_BASE_URL` in .env.local

## Need Help?

### Resources
- Check [SETUP.md](SETUP.md) for detailed documentation
- Review [API_TESTING.md](API_TESTING.md) for API endpoints
- Check [DATABASE.md](DATABASE.md) for schema information

### Ask Questions
1. Check existing GitHub issues
2. Open a new GitHub issue with details
3. Join discussions

## What's Next?

- 📖 Read the [SETUP.md](SETUP.md) guide
- 🧪 Test API endpoints using [API_TESTING.md](API_TESTING.md)
- 💻 Start building features
- 🚀 Deploy to production

---

Happy coding! 🎉

Questions? Open an issue or check the documentation.
