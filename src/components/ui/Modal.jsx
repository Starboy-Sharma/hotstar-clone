// @ts-nocheck
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose }) {

 const overlayEl = useRef(null);
 const modalEl = useRef(null);

 useEffect(() => {
     
    if (overlayEl.current === null || modalEl.current === null) return;

    const handleOutsideClick = (event) => {
        if (event.composedPath().includes(modalEl.current)) return;
        onClose();
    }
    const handleEscapeKey = (event) => {
        if (event.key === 'Escape') onClose();
    }

    overlayEl.current?.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
        overlayEl.current?.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', handleEscapeKey);
    }

 }, [onClose])

  return (
    <div className="overlay" style={{ display: isOpen ? 'block' : 'none' }} ref={overlayEl}>
      <div className="modal-container" ref={modalEl}>
        <div className="modal-header">
          <h2>Modal Header</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        <div className="modal-content">
          <p>Modal content goes here</p>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};