import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Toast;