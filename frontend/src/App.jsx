import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DoctorsPage from './pages/DoctorsPage'
import PatientRegisterPage from './pages/PatientRegisterPage'
import DoctorRegisterPage from './pages/DoctorRegisterPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/patient" element={<PatientRegisterPage />} />
            <Route path="/register/doctor" element={<DoctorRegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/patient/dashboard" element={<DashboardPage />} />
            <Route path="/doctor/dashboard" element={<DashboardPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
