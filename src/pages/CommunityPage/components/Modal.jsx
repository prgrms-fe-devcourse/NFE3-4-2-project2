import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg relative"
        style={{
          width: "882px",  
          height: "537px", 
          padding: "2rem", 
        }}
      >
        <button
          className="absolute top-15 right-20 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;