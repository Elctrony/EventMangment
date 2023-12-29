import React, { useState, useEffect } from 'react';
import  './Venuelist.css'
import './AttendeeList.css'
import  VenueCard from './Venue'
import {useNavigate} from "react-router-dom";



const SelectConfirmationModal = ({isOpen, onCancel, onConfirm,venue }) => {
    console.log(venue);
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Confirm Selection</h2>
                <p>Are you sure you want to Delete {venue?.id}?</p>
                <div className="modal-buttons">
                    <button className="close-modal-button" onClick={onConfirm}>
                        Yes, Delete
                    </button>
                    <button className="submit-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
const VenueList = ({ venues, onSelect }) => (
    <div className="venues-grid">
        {venues.map((venue) => (
            <VenueCard key={venue.id} {...venue} onSelect={()=>onSelect(venue)} />
        ))}
    </div>
);

const FilterSection = ({ onFilterChange }) => {

    const [priceOptions,setPriceOptions]=useState([]);
    const [locationOptions,setLocationOptions]=useState([]);
    const [ratings, setRatings] = useState([4, 3, 2, 1]); // Add the desired rating options

    useEffect(() => {

        setPriceOptions([50,100,250,500,1000,1500,2000]);
        const fetchData= async ()=>{
            try {
                const response = await fetch('http://localhost:8080/venues-location');
                const data = await response.json();
                const locquery = JSON.parse(data);

                //console.log(formattedDate);
                const locations = locquery.map((item)=>item.location);
                setLocationOptions(locations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, []);
    return ( <div className="filter-section">
        <select className="filter-select" id="locationFilter" onChange={onFilterChange}>
            <option value="">All Locations</option>
            {locationOptions.map((location) => (
                <option value={`${location}`}>{location}</option>
            ))}
        </select>

        <select className="filter-select" id="priceFilter" onChange={onFilterChange}>
            <option value="">All Prices</option>
            {priceOptions.map((price) => (
                <option  value={`${price}`}>{price} or Below</option>
            ))}
        </select>
        <select className="filter-select" id="ratingFilter" onChange={onFilterChange}>
            <option value="">All Ratings</option>
            {ratings.map((rating) => (
                <option key={rating} value={rating}>
                    {rating} and above
                </option>
            ))}
        </select>
    </div>
   );
};

const AvailableVenues = () => {
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const navigate = useNavigate();



    const showAlert= ()=>{
        alert("You have to select Event first");
    }
    const deleteVenue = async(venuId) => {
        let respone= await fetch('http://localhost:8080/dashboard/delete-venue',{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:venuId
            })
        });
        return (respone.status===200);
    };

    const fetchData = async ()=>{
        try {
            const locationFilter = document.getElementById('locationFilter').value;
            const priceFilter = document.getElementById('priceFilter').value;
            const ratingFilter = document.getElementById('ratingFilter').value;
            let queryParams={};
            if(locationFilter !==''){
                queryParams.location = locationFilter
            }
            if(priceFilter !==''){
                queryParams.price = priceFilter
            }
            if(ratingFilter!==''){
                queryParams.rating= ratingFilter;
            }
            const response = await fetch(`http://localhost:8080/venues?${new URLSearchParams(queryParams)}`);
            const data = await response.json();
            const filtered = JSON.parse(data);
            console.log(filtered);

            //console.log(formattedDate);
            setFilteredVenues(filtered);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const filterVenues = () => {
        console.log("Filter Trigger");
        fetchData();
       // Run once on component mount

    };

    useEffect(() => {
        fetchData()
        // filterVenues();
    }, []);


    const confirmSelectTeam =async () => {
        console.log(selectedVenue,"Confirm");
        let res = await deleteVenue(selectedVenue.id);
        if(!res){
            alert('Request failed');
            return;
        }
        setShowModal(false);
        setFilteredVenues((prevState)=>{
            return prevState.filter((item)=>{

                return item.id !==selectedVenue.id;
            })
        })
    };

    const closeDeleteModal = () => {
        console.log(selectedVenue,"Close");
        setSelectedVenue(null)
        setShowModal(false);
    };
    const handleClick = (venue)=>{
        setSelectedVenue(venue);
        console.log(venue,"Clicked");

        setShowModal(true)
    };
    return (
        <>
        <div className="container">
            <h1>Available Venues</h1>
            <FilterSection onFilterChange={filterVenues} />
            <VenueList venues={filteredVenues} onSelect={handleClick} />
        </div>
            {showModal && (<div className={`modal ${showModal ? 'open' : ''}`}>
                    <div className="modal-content">
                        <h2>Confirm Selection</h2>
                        <p>Are you sure you want to Delete {selectedVenue?.name}?</p>
                        <div className="modal-buttons">
                            <button className="close-modal-button" onClick={confirmSelectTeam}>
                                Yes, Delete
                            </button>
                            <button className="submit-button" onClick={closeDeleteModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AvailableVenues;
