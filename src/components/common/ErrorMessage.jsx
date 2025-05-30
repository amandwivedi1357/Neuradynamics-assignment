import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded shadow-sm">
      <div className="flex items-center">
        <AlertTriangle className="text-red-500 mr-3" size={24} />
        <div>
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-700">{message || 'Something went wrong. Please try again later.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;