import React from 'react';

interface AlertProps {
  message: string,
  isOpen: boolean,
  onClose: () => void,
  onConfirm?: () => void,
  showConfirm?: boolean,
}

export default function Alert({message, isOpen, onClose, onConfirm, showConfirm = false }: AlertProps){
  if (!isOpen) return null;
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="mb-4">{message}</p>
          {showConfirm ? (
              <div>
                <button
                    onClick={onConfirm}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  예
                </button>
                <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  아니오
                </button>
              </div>
          ) : (
              <button
                  onClick={onClose}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                확인
              </button>
          )}
        </div>
      </div>
  );
};
