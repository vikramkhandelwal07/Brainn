import { useEffect, useRef } from 'react';
import IconButton from "./IconButton";

export default function Confirmation({
  modalData,
  isOpen = true,
  onClose,
  className = ""
}) {
  const modalRef = useRef(null);
  const firstButtonRef = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  // Enhanced button handler that can optionally close modal
  const handleButton1Click = () => {
    modalData?.btn1Handler?.();
    if (modalData?.btn1ClosesModal !== false) {
      onClose?.();
    }
  };

  const handleButton2Click = () => {
    modalData?.btn2Handler?.();
    if (modalData?.btn2ClosesModal !== false) {
      onClose?.();
    }
  };

  if (!isOpen || !modalData) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-auto bg-black/20 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className={`w-11/12 max-w-[400px] rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-2xl transition-all duration-200 ease-out ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2
          id="modal-title"
          className="text-2xl font-semibold text-gray-100 leading-tight"
        >
          {modalData.text1}
        </h2>

        {/* Description */}
        {modalData.text2 && (
          <p
            id="modal-description"
            className="mt-3 mb-6 leading-relaxed text-gray-300"
          >
            {modalData.text2}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-end">
          {modalData.btn1Text && (
            <IconButton
              ref={firstButtonRef}
              onclick={handleButton1Click}
              text={modalData.btn1Text}
              className={modalData.btn1Variant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : ''}
            />
          )}

          {modalData.btn2Text && (
            <button
              className="cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 active:bg-gray-400 py-2.5 px-4 font-semibold text-gray-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={handleButton2Click}
              type="button"
            >
              {modalData.btn2Text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}