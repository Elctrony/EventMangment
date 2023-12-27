import React, { useState, useEffect } from 'react';
import  './Venuelist.css'
import  VenueCard from './Venue'
import moment from "moment/moment";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import './OrgSelection.css';

let selectId=-1;

const SelectConfirmationModal = ({isOpen, onCancel, onConfirm }) => {
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Confirm Selection</h2>
                <p>Are you sure you want to Select this Team?</p>
                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onConfirm}>
                        Yes, Select
                    </button>
                    <button className="yes-delete-button" onClick={onCancel}>
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
            <VenueCard key={venue.id} {...venue} onSelect={onSelect} />
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
    const [selectedVenue, setSelectVenue] = useState(false)

    const navigate = useNavigate();



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let eventId = queryParams.get('eventid');
    if(eventId){
        eventId= parseInt(eventId);
    }
    console.log('event',eventId)

    const showAlert= ()=>{
        alert("You have to select Event first");
    }
    const selectVenue = async(venuId) => {
        if(!eventId){
            showAlert()
            return;
        }
        let body={
            'venueid':venuId,
            'eventid':eventId
        }
        console.log(body);
        await fetch('http://localhost:8080/add-venue-event',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        navigate('/');

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
        console.log(selectId,"Confirm");
        await selectVenue(selectId);
        setSelectVenue(false);

        navigate('/');
    };

    const closeDeleteModal = () => {
        console.log(selectId,"Close");
        selectId=-1
        setSelectVenue(false);
    };
    const handleClick = (id)=>{
        selectId = id;

        console.log(selectId,"Clicked");

        setSelectVenue(true)
    };
    return (
        <>
        <div className="container">
            <h1>Available Venues</h1>
            <FilterSection onFilterChange={filterVenues} />
            <VenueList venues={filteredVenues} onSelect={handleClick} />
        </div>
            {selectedVenue && (
                <SelectConfirmationModal
                    isOpen={selectedVenue}
                    onConfirm={confirmSelectTeam}
                    onCancel={closeDeleteModal}
                />
            )}
        </>
    );
};

export default AvailableVenues;
