import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { PatientProvider } from './context/PatientContext'
import { DoctorProvider } from './context/DoctorContext'
import { ProtectedRoute } from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DoctorsPage from './pages/DoctorsPage'
import PatientRegisterPage from './pages/PatientRegisterPage'
import DoctorRegisterPage from './pages/DoctorRegisterPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <DoctorProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register/patient" element={<PatientRegisterPage />} />
                  <Route path="/register/doctor" element={<DoctorRegisterPage />} />
                  <Route path="/doctors" element={<DoctorsPage />} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={<ProtectedRoute element={<DashboardPage />} />}
                  />
                  <Route
                    path="/patient/dashboard"
                    element={<ProtectedRoute element={<DashboardPage />} allowedRoles="patient" />}
                  />
                  <Route
                    path="/doctor/dashboard"
                    element={<ProtectedRoute element={<DashboardPage />} allowedRoles="doctor" />}
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </DoctorProvider>
      </PatientProvider>
    </AuthProvider>
  )
}

export default App
