// SponsorsList.js

import React, { useState, useEffect } from 'react';
import './SponsorsList.css';

const SponsorsList = () => {
    const [sponsors, setSponsors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSponsor, setSelectedSponsor] = useState(null);

    useEffect(() => {
        // Fetch sponsors data from the server
        fetchSponsors();
    }, []);

    const fetchSponsors = async () => {
        try {
            const response = await fetch('http://localhost:8080/dashboard/sponsors');
            if (!response.ok) {
                throw new Error('Failed to fetch sponsors');
            }
            const sponsorsData = await response.json();
            setSponsors(sponsorsData.sponsors);
        } catch (error) {
            console.error('Error fetching sponsors:', error.message);
        }
    };

    const handleDeleteClick = (sponsor) => {
        setSelectedSponsor(sponsor);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/dashboard/delete-sponsor`, {
                method: 'DELETE',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    id:selectedSponsor.id
                })
            });
            if (!response.ok) {
                throw new Error('Failed to delete sponsor');
            }
            // Update the sponsors list after deletion
            fetchSponsors();
        } catch (error) {
            console.error('Error deleting sponsor:', error.message);
        } finally {
            // Close the modal after deletion
            setShowModal(false);
        }
    };

    const handleCancelDelete = () => {
        // Close the modal without deleting
        setShowModal(false);
    };

    return (
        <div className="sponsors-list-container">
            <h1>Sponsors List</h1>
            <ul className="sponsors-list">
                {sponsors.map((sponsor) => (
                    <li key={sponsor.id} className="sponsor-item">
                        <div className="sponsor-details">
                            <h3>{sponsor.name}</h3>
                            <p>Phone: {sponsor.phone}</p>
                            <p>Email: {sponsor.email}</p>
                        </div>
                        <button onClick={() => handleDeleteClick(sponsor)} className="delete-button">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Delete Sponsor</h2>
                        <p>Are you sure you want to delete {selectedSponsor?.name}?</p>
                        <button onClick={handleConfirmDelete} className="sponsors-delete-button">
                            Confirm, Delete
                        </button>
                        <button onClick={handleCancelDelete} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SponsorsList;
