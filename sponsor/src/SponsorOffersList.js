import React, { useState, useEffect } from 'react';
import './SponsorOffersList.css'
import {useUser} from "./UserContext";
import {useNavigate} from "react-router-dom";

const SponsorOffersList = () => {
    const [offers, setOffers] = useState([]);
    const navigate =useNavigate();
    const {user, setUser} = useUser();


    const fetchSponsorOffers = async () => {
        // Assuming you have an endpoint for fetching sponsor offers
        try {
            let url ='http://localhost:8080/sponsor-offers/'+user.id;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            setOffers(data);
        } catch (error) {
            console.error('Error fetching sponsor offers:', error);
        }
    };
    useEffect(() => {
        if(!user||!user.id){
            navigate('/login');
            return;
        }

        fetchSponsorOffers();
    }, []);

    const handleAccept = async (offerId) => {
        try {
            const response = await fetch(`http://localhost:8080/sponsor-offers/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ offerId }),
            });

            if (response.status === 200) {
                // Successfully accepted offer, you might want to update the UI accordingly
                fetchSponsorOffers(); // Refresh the list after accepting
            } else {
                console.error('Failed to accept offer:', response.statusText);
            }
        } catch (error) {
            console.error('Error accepting offer:', error);
        }
    };

    const handleReject = async (offerId) => {
        try {
            const response = await fetch(`http://localhost:8080/sponsor-offers/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ offerId }),
            });

            if (response.status === 200) {
                // Successfully rejected offer, you might want to update the UI accordingly
                fetchSponsorOffers(); // Refresh the list after rejecting
            } else {
                console.error('Failed to reject offer:', response.statusText);
            }
        } catch (error) {
            console.error('Error rejecting offer:', error);
        }
    };


    return (
        <div className="sponsor-offers-list-container">
            <h1>Sponsor Offers List</h1>
            <table className="sponsor-offers-table">
                <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Description</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {offers.map((offer) => (
                    <tr key={offer.id}>
                        <td>{offer.eventname}</td>
                        <td>{offer.description}</td>
                        <td>{offer.date}</td>
                        <td>{offer.price}</td>
                        {offer.status===1?<td>
                            <button className="accept-btn" onClick={() => handleAccept(offer.id)}>
                                Accept
                            </button>
                            <button className="reject-btn" onClick={() => handleReject(offer.id)}>
                                Reject
                            </button>
                        </td>:offer.status===2?<td>Accepted</td>:<td>Rejected</td>}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SponsorOffersList;
