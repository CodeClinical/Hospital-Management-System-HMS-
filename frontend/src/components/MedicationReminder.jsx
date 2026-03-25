import React, { useState, useEffect } from 'react';
import { usePrescription } from '../context/PrescriptionContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';

/**
 * MedicationReminder Component
 * Displays medication reminders for active prescriptions
 * Shows upcoming doses and medication schedules
 */
const MedicationReminder = () => {
  const { user } = useAuth();
  const { prescriptions, getActivePrescriptions } = usePrescription();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [upcomingReminders, setUpcomingReminders] = useState([]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Calculate upcoming reminders
  useEffect(() => {
    if (user?.role === 'patient' && prescriptions.length > 0) {
      const activePrescriptions = getActivePrescriptions();
      const reminders = [];

      activePrescriptions.forEach(prescription => {
        prescription.medicines.forEach(medicine => {
          const nextDose = calculateNextDose(medicine, prescription.diagnosisDate);
          if (nextDose) {
            reminders.push({
              id: `${prescription._id}-${medicine.name}`,
              prescriptionId: prescription._id,
              medicine: medicine,
              nextDose: nextDose,
              timeUntilDose: nextDose - currentTime
            });
          }
        });
      });

      // Sort by time until dose and take next 5
      reminders.sort((a, b) => a.timeUntilDose - b.timeUntilDose);
      setUpcomingReminders(reminders.slice(0, 5));
    }
  }, [prescriptions, currentTime, user, getActivePrescriptions]);

  // Calculate next dose time based on frequency
  const calculateNextDose = (medicine, diagnosisDate) => {
    const now = new Date();
    const diagnosisTime = new Date(diagnosisDate);

    // For simplicity, assume medications start at diagnosis time
    // In a real app, you'd want more sophisticated scheduling
    let nextDose = new Date(diagnosisTime);

    switch (medicine.frequency) {
      case 'Once daily':
        // Find next occurrence today or tomorrow
        nextDose.setHours(9, 0, 0, 0); // Assume 9 AM
        if (nextDose <= now) {
          nextDose.setDate(nextDose.getDate() + 1);
        }
        break;

      case 'Twice daily':
        // Morning and evening doses
        const morningDose = new Date(now);
        morningDose.setHours(9, 0, 0, 0);
        const eveningDose = new Date(now);
        eveningDose.setHours(18, 0, 0, 0);

        if (now < morningDose) {
          nextDose = morningDose;
        } else if (now < eveningDose) {
          nextDose = eveningDose;
        } else {
          // Next morning
          nextDose = new Date(morningDose);
          nextDose.setDate(nextDose.getDate() + 1);
        }
        break;

      case 'Three times daily':
        // Three doses per day
        const dose1 = new Date(now);
        dose1.setHours(8, 0, 0, 0);
        const dose2 = new Date(now);
        dose2.setHours(14, 0, 0, 0);
        const dose3 = new Date(now);
        dose3.setHours(20, 0, 0, 0);

        if (now < dose1) {
          nextDose = dose1;
        } else if (now < dose2) {
          nextDose = dose2;
        } else if (now < dose3) {
          nextDose = dose3;
        } else {
          // Next day first dose
          nextDose = new Date(dose1);
          nextDose.setDate(nextDose.getDate() + 1);
        }
        break;

      case 'Twice weekly':
        // For simplicity, assume Monday and Thursday
        const dayOfWeek = now.getDay();
        if (dayOfWeek < 1) { // Before Monday
          nextDose.setDate(now.getDate() + (1 - dayOfWeek));
        } else if (dayOfWeek < 4) { // Monday to Wednesday
          nextDose.setDate(now.getDate() + (4 - dayOfWeek));
        } else if (dayOfWeek < 1) { // Thursday to Sunday
          nextDose.setDate(now.getDate() + (8 - dayOfWeek));
        }
        nextDose.setHours(9, 0, 0, 0);
        break;

      case 'As needed':
        // No scheduled reminder for as-needed medications
        return null;

      default:
        return null;
    }

    return nextDose;
  };

  // Format time until dose
  const formatTimeUntil = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return 'Now';
    }
  };

  // Format dose time
  const formatDoseTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get urgency class based on time until dose
  const getUrgencyClass = (timeUntil) => {
    const hours = timeUntil / (1000 * 60 * 60);
    if (hours <= 1) return 'bg-red-50 border-red-200';
    if (hours <= 2) return 'bg-yellow-50 border-yellow-200';
    return 'bg-blue-50 border-blue-200';
  };

  // Only show for patients
  if (user?.role !== 'patient') {
    return null;
  }

  if (upcomingReminders.length === 0) {
    return (
      <Card className="bg-white">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Medication Reminders</h3>
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600">No upcoming medication reminders</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Medication Reminders</h3>
      <div className="space-y-3">
        {upcomingReminders.map(reminder => (
          <div
            key={reminder.id}
            className={`border rounded-lg p-4 ${getUrgencyClass(reminder.timeUntilDose)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{reminder.medicine.name}</h4>
                <p className="text-sm text-gray-600">
                  {reminder.medicine.dosage} • {reminder.medicine.frequency}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Next dose: {formatDoseTime(reminder.nextDose)}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  reminder.timeUntilDose <= 3600000 ? 'text-red-600' : // 1 hour
                  reminder.timeUntilDose <= 7200000 ? 'text-yellow-600' : // 2 hours
                  'text-blue-600'
                }`}>
                  {formatTimeUntil(reminder.timeUntilDose)}
                </div>
                <div className="text-xs text-gray-500">until dose</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Reminders are calculated based on typical medication schedules.
          Always follow your doctor's specific instructions.
        </p>
      </div>
    </Card>
  );
};

export default MedicationReminder;