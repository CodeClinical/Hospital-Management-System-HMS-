import React, { useState, useEffect } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import { useDoctor } from '../context/DoctorContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import FormInput from '../components/FormInput';

/**
 * CancelRescheduleModal Component
 * Modal for cancelling or rescheduling appointments
 * Handles both patient and doctor actions
 */
const CancelRescheduleModal = ({ isOpen, onClose, appointment, mode, onSuccess }) => {
  const { cancelAppointment, rescheduleAppointment, loading } = useAppointment();
  const { fetchAvailableSlots } = useDoctor();

  const [formData, setFormData] = useState({
    reason: '',
    newDate: '',
    newTime: '',
    notes: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        reason: '',
        newDate: '',
        newTime: '',
        notes: ''
      });
      setError('');
      setAvailableSlots([]);
    }
  }, [isOpen, mode]);

  // Fetch available slots when date changes (for reschedule mode)
  useEffect(() => {
    if (mode === 'reschedule' && formData.newDate && appointment?.doctorId?._id) {
      fetchSlotsForDate(formData.newDate);
    }
  }, [formData.newDate, appointment, mode]);

  const fetchSlotsForDate = async (date) => {
    setLoadingSlots(true);
    try {
      const slots = await fetchAvailableSlots(appointment.doctorId._id, date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      setError('Failed to load available time slots');
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleCancel = async () => {
    if (!formData.reason.trim()) {
      setError('Please provide a reason for cancellation');
      return;
    }

    setSubmitting(true);
    try {
      await cancelAppointment(appointment._id, formData.reason);
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      setError(error.message || 'Failed to cancel appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReschedule = async () => {
    if (!formData.newDate || !formData.newTime) {
      setError('Please select both date and time for rescheduling');
      return;
    }

    if (!formData.reason.trim()) {
      setError('Please provide a reason for rescheduling');
      return;
    }

    setSubmitting(true);
    try {
      await rescheduleAppointment(appointment._id, {
        newDate: formData.newDate,
        newTime: formData.newTime,
        reason: formData.reason,
        notes: formData.notes
      });
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      setError(error.message || 'Failed to reschedule appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'cancel') {
      handleCancel();
    } else {
      handleReschedule();
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'cancel' ? 'Cancel Appointment' : 'Reschedule Appointment'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <ErrorMessage message={error} className="mb-4" />
          )}

          {/* Appointment Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Appointment</h3>
            <div className="text-sm text-gray-900">
              <p className="font-medium">
                Dr. {appointment?.doctorId?.firstName} {appointment?.doctorId?.lastName}
              </p>
              <p>{appointment?.doctorId?.speciality}</p>
              <p className="mt-1">
                {appointment?.date && new Date(appointment.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p>
                {appointment?.time && new Date(`2000-01-01 ${appointment.time}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Reason */}
            <FormInput
              label={mode === 'cancel' ? 'Reason for Cancellation' : 'Reason for Rescheduling'}
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder={mode === 'cancel' ? 'Please explain why you need to cancel...' : 'Please explain why you need to reschedule...'}
              required
              textarea
              rows={3}
            />

            {/* Reschedule Fields */}
            {mode === 'reschedule' && (
              <>
                {/* New Date */}
                <FormInput
                  label="New Date"
                  name="newDate"
                  type="date"
                  value={formData.newDate}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  required
                />

                {/* New Time */}
                {formData.newDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Time
                    </label>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-4">
                        <LoadingSpinner size="sm" text="Loading available slots..." />
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <select
                        name="newTime"
                        value={formData.newTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a time slot</option>
                        {availableSlots.map((slot, index) => (
                          <option key={index} value={slot.time}>
                            {new Date(`2000-01-01 ${slot.time}`).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm text-gray-500 py-2">
                        No available slots for this date. Please select a different date.
                      </p>
                    )}
                  </div>
                )}

                {/* Additional Notes */}
                <FormInput
                  label="Additional Notes (Optional)"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information..."
                  textarea
                  rows={2}
                />
              </>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || loading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
              mode === 'cancel'
                ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'
                : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
            }`}
          >
            {submitting ? (mode === 'cancel' ? 'Cancelling...' : 'Rescheduling...') : (mode === 'cancel' ? 'Cancel Appointment' : 'Reschedule Appointment')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelRescheduleModal;