import React, { useEffect, useState } from 'react';

const ErrorPopup = ({ 
  isOpen, 
  onClose, 
  title = "Error Occurred", 
  message = "Something went wrong. Please try again.",
  duration = 5000, // Auto close after 5 seconds
  autoClose = true 
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, autoClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300); // Match this with animation duration
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm
          transition-opacity duration-300
          ${isExiting ? 'opacity-0' : 'opacity-100'}
        `}
        onClick={handleClose}
      />

      {/* Popup */}
      <div 
        className={`
          relative bg-white rounded-lg shadow-xl w-full max-w-md
          transform transition-all duration-300 
          ${isExiting 
            ? 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' 
            : 'opacity-100 translate-y-0 sm:scale-100'
          }
        `}
      >
        {/* Top Bar with Color Indicator */}
        <div className="bg-red-500 h-1 rounded-t-lg" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 p-2"
        >
          <svg 
            className="w-5 h-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <svg 
              className="h-6 w-6 text-red-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-500">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 
                       rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 
                       focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 
                       rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 
                       focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>

        {/* Progress Bar (only shown when autoClose is true) */}
        {autoClose && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-lg overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-linear"
              style={{ 
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}

        {/* Add keyframes for progress bar animation */}
        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
};

// Example usage component
const ExampleUsage = () => {
  const [showError, setShowError] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <button
        onClick={() => setShowError(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 
                 focus:ring-offset-2"
      >
        Show Error Popup
      </button>

      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Connection Error"
        message="Unable to connect to the server. Please check your internet connection and try again."
      />
    </div>
  );
};

export default ExampleUsage;