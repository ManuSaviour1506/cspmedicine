// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import medicineService from '../services/medicineService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar.jsx';

// Function to play the alarm sound continuously
const playAlarm = (audioRef) => {
  try {
    if (audioRef.current) {
      audioRef.current.loop = true; // Loop the alarm
      audioRef.current.play().catch(error => {
        console.warn("Audio playback failed (usually due to browser's autoplay policy). User interaction is required.", error);
      });
    }
  } catch (e) {
    console.error("Failed to play alarm audio:", e);
  }
};

// Function to stop the alarm sound
const stopAlarm = (audioRef) => {
  try {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.loop = false;
    }
  } catch (e) {
    console.error("Failed to stop alarm audio:", e);
  }
};

// Function to check if it's time for any medicine
const shouldRingAlarm = (medicines) => {
  const now = new Date();
  // Format current time to HH:MM (24-hour)
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  // Check if any medicine time matches the current minute
  const matchedMedicines = medicines.filter(med => med.time === currentTime);
  return matchedMedicines;
};

const Dashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [showAlarmPopup, setShowAlarmPopup] = useState(false);
  const [currentAlarmMedicines, setCurrentAlarmMedicines] = useState([]);
  const audioRef = React.useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

  // Handle medicine deletion
  const handleDelete = async (id, medicineName) => {
    if (window.confirm(t('confirmDelete') || `Are you sure you want to delete ${medicineName}?`)) {
      try {
        await medicineService.deleteMedicine(id);
        setMedicines(medicines.filter(med => med._id !== id));
        alert(t('deleteSuccess') || 'Medicine deleted successfully!');
      } catch (error) {
        console.error('Failed to delete medicine:', error);
        alert(t('deleteFailed') || 'Failed to delete medicine. Please try again.');
      }
    }
  };

  // Handle alarm confirmation (medicine taken)
  const handleMedicineTaken = () => {
    stopAlarm(audioRef);
    setShowAlarmPopup(false);
    setCurrentAlarmMedicines([]);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Polling to check for reminders every minute
    const checkReminders = () => {
      const fetchMedicines = async () => {
        try {
          const data = await medicineService.getMedicines();
          setMedicines(data);
          
          // Trigger alarm check immediately after fetching medicines
          const alarmedMedicines = shouldRingAlarm(data);
          if (alarmedMedicines.length > 0) {
            setCurrentAlarmMedicines(alarmedMedicines);
            setShowAlarmPopup(true);
            playAlarm(audioRef);
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
    return () => {
      clearInterval(intervalId);
      stopAlarm(audioRef);
    };
  }, [isAuthenticated, navigate, logout]);

  return (
    <>
      <Navbar />
      
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
      
      {/* Alarm Popup Modal */}
      {showAlarmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl animate-pulse">
            <div className="text-center">
              <div className="mb-4">
                <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {t('medicineReminder') || 'Medicine Reminder!'}
              </h2>
              <div className="mb-6 text-left bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-gray-700">
                  {t('timeToTake') || 'Time to take your medicine:'}
                </p>
                {currentAlarmMedicines.map((med, index) => (
                  <div key={index} className="mb-2 p-2 bg-white rounded border-l-4 border-blue-500">
                    <p className="font-bold text-blue-600">{med.name}</p>
                    <p className="text-sm text-gray-600">{t('dosage')}: {med.dosage}</p>
                    <p className="text-sm text-gray-600">{t('time')}: {med.time}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={handleMedicineTaken}
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-semibold text-lg transition-all"
              >
                {t('medicineTaken') || 'I\'ve Taken My Medicine'}
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div key={med._id} className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{med.name}</h3>
                <p className="text-gray-600"><strong>{t('dosage')}:</strong> {med.dosage}</p>
                <p className="text-gray-600"><strong>{t('time')}:</strong> {med.time}</p>
                <p className="text-gray-600"><strong>{t('frequency')}:</strong> {med.frequency}</p>
                
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-medicine/${med._id}`)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none text-sm"
                  >
                    {t('edit') || 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDelete(med._id, med.name)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none text-sm"
                  >
                    {t('delete') || 'Delete'}
                  </button>
                </div>
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