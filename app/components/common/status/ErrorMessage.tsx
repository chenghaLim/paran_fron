import React from 'react';

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }:ErrorMessageProps) => {
  return (
    <div className="text-red-500 p-5 text-center">
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;