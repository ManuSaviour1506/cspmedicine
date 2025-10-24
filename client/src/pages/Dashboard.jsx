// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import medicineService from '../services/medicineService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar.jsx';

// Function to play the alarm sound
const playAlarm = () => {
  try {
    // The path should be relative to the public directory
    const audio = new Audio('/alarm.mp3'); 
    audio.play().catch(error => {
      // Catch error if the browser prevents immediate playback (e.g., policy change)
      console.warn("Audio playback failed (usually due to browser's autoplay policy). User interaction is required.", error);
    });
  } catch (e) {
    console.error("Failed to play alarm audio:", e);
  }
};

// Function to check if it's time for any medicine
const shouldRingAlarm = (medicines) => {
  const now = new Date();
  // Format current time to HH:MM (24-hour)
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  // Check if any medicine time matches the current minute
  return medicines.some(med => med.time === currentTime);
};


const Dashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Polling to check for reminders every minute (or set an interval)
    const checkReminders = () => {
      const fetchMedicines = async () => {
        try {
          const data = await medicineService.getMedicines();
          setMedicines(data);

          // Trigger alarm check immediately after fetching medicines
          if (shouldRingAlarm(data)) {
            playAlarm();
          }

        } catch (error) {
          console.error('Failed to fetch medicines:', error);
          // If the request fails, assume token is invalid and log out
          logout();
        }
      };

      fetchMedicines();
    };

    // Check reminders immediately and then every 60 seconds (60000ms)
    checkReminders();
    const intervalId = setInterval(checkReminders, 60000); 

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, [isAuthenticated, navigate, logout]);


  return (
    <>
      <Navbar />
      <div className="p-8 font-sans">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t('dashboard')}</h1>
        </header>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate('/add-medicine')}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            {t('addMedicine')}
          </button>
        </div>

        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((med) => (
              <div key={med._id} className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{med.name}</h3>
                <p className="text-gray-600"><strong>{t('dosage')}:</strong> {med.dosage}</p>
                <p className="text-gray-600"><strong>{t('time')}:</strong> {med.time}</p>
                <p className="text-gray-600"><strong>{t('frequency')}:</strong> {med.frequency}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">{t('noMedicines')}</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;