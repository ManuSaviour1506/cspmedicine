// client/src/components/LanguageSelector.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`p-2 rounded-md ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('hi')}
        className={`p-2 rounded-md ${i18n.language === 'hi' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        HI
      </button>
      <button
        onClick={() => changeLanguage('te')}
        className={`p-2 rounded-md ${i18n.language === 'te' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        TE
      </button>
    </div>
  );
};

export default LanguageSelector;