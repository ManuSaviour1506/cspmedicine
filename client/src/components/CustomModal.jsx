// client/src/components/CustomModal.jsx
import React from 'react';
import { XCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CustomModal = ({ 
  isOpen, 
  onClose, 
  title = 'Notification', 
  message, 
  type = 'info', // 'info', 'success', 'error', 'confirm'
  showActions = false, 
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  let Icon, iconColor;
  switch (type) {
    case 'success':
      Icon = CheckCircle;
      iconColor = 'text-green-500';
      break;
    case 'error':
      Icon = XCircle;
      iconColor = 'text-red-500';
      break;
    case 'confirm':
      Icon = AlertTriangle;
      iconColor = 'text-yellow-500';
      break;
    default:
      Icon = Info;
      iconColor = 'text-blue-500';
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full transform scale-100 transition-transform duration-300">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon size={28} className={iconColor} />
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
          <div className="text-gray-600 mb-6 text-base">
            <p>{message}</p>
          </div>
          
          <div className="flex justify-end space-x-3">
            {showActions ? (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t(cancelText)}
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {t(confirmText)}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {t('ok') || 'OK'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
