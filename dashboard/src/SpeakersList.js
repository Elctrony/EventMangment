import React, { useState, useEffect } from 'react';
import './SpeakersList.css'; // Add your CSS styling

const SpeakersList = () => {
    const [speakers, setSpeakers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);

    useEffect(() => {
        // Fetch speakers data from the server
        const fetchSpeakers = async () => {
            try {
                const response = await fetch('http://localhost:8080/dashboard/speakers'); // Replace with your server URL
                if (!response.ok) {
                    alert('Failed to fetch speakers')
                    throw new Error('Failed to fetch speakers');
                }
                const data = await response.json();
                setSpeakers(data.speakers);
            } catch (error) {
                console.error('Error fetching speakers:', error.message);
            }
        };

        fetchSpeakers();
    }, []); // Run this effect only once on component mount

    const handleDeleteClick = (speaker) => {
        setShowModal(true);
        setSelectedSpeaker(speaker);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:8080/dashboard/delete-speaker`, {
                method: 'DELETE',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                     id:selectedSpeaker.id
                })
            }); // Replace with your server URL and endpoint
            if (!response.ok) {
                alert('Failed to delete speaker')
                throw new Error('Failed to delete speaker');
            }

            // Remove the deleted speaker from the local state
            setSpeakers((prevSpeakers) => prevSpeakers.filter((s) => s.id !== selectedSpeaker.id));
            setShowModal(false);
            setSelectedSpeaker(null);
        } catch (error) {
            console.error('Error deleting speaker:', error.message);
        }
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
        setSelectedSpeaker(null);
    };

    return (
        <div className="speakers-list-container">
            <h1>Speakers List</h1>
            <ul className="speakers-list">
                {speakers.map((speaker) => (
                    <li key={speaker.id} className="speaker-item">
                        <div className="speaker-details">
                            <h2>{`${speaker.fname} ${speaker.lname}`}</h2>
                            <p>ID: {speaker.id}</p>
                            <p>Phone: {speaker.phone}</p>
                            <p>Email: {speaker.email}</p>
                        </div>
                        <button className="delete-button" onClick={() => handleDeleteClick(speaker)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete {`${selectedSpeaker?.fname} ${selectedSpeaker?.lname}`}?</p>
                        <button className="speaker-delete-button" onClick={handleDeleteConfirm}>
                            Confirm
                        </button>
                        <button className="cancel-button" onClick={handleDeleteCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpeakersList;
