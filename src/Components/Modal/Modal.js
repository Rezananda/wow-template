import React from "react";

const Modal = ({ children, handleClose }) => {
  return (
    <>
      <div
        className="justify-center flex fixed inset-0 z-50"
        onClick={handleClose}
      >
        <div className="relative mx-auto md:max-w-3xl w-full h-full">
          {children}
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
