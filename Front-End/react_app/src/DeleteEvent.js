import React from "react";
import './DeleteConfirmationModal.css'
const DeleteConfirmationModal = ({isOpen, onCancel, onConfirm }) => {
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this Event?</p>
                <div className="modal-buttons">
                    <button className="yes-delete-button" onClick={onConfirm}>
                        Yes, Delete
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal