import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import sprite from "src/assets/icons/sprite.svg";

const Modal = ({ onClose, children }) => {
  const modalRoot = document.querySelector("#modal-root");
  const backdropRef = useRef(null);

  const handleClickOutside = e => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClickOutside}
      className="bg-waterloo/60 fixed inset-0 transition-opacity duration-300">
      <div className="bg-snow rounded-3xlg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-16">
        <button
          type="button"
          onClick={onClose}
          className="group absolute top-5 right-5 flex size-8 items-center justify-center bg-transparent focus:outline-none">
          <svg
            className="stroke-waterloo group-hover:stroke-sunset transition-colors duration-300 ease-in-out"
            width={16}
            height={16}>
            <use href={`${sprite}#icon-cross`}></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot || document.body
  );
};

export default Modal;
