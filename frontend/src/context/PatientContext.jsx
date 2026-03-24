import React from 'react';

export const PatientContext = React.createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getPatients = async () => {
    setLoading(true);
    try {
      // API call to fetch patients
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PatientContext.Provider value={{ patients, loading, error, getPatients }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => React.useContext(PatientContext);
