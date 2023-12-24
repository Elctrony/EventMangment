import React, { useState, useEffect } from 'react';
import  './Venuelist.css'
import  VenueCard from './Venue'
import moment from "moment/moment";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import alert from "bootstrap/js/src/alert";

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

    const navigate = useNavigate();

    const venues = [
        {id:1, name: 'Venue 1', location: 'Cairo', capacity: 100, price: 500, rating: 1 },
        {id:2, name: 'Venue 2', location: 'Giza', capacity: 150, price: 600, rating: 2.0 },
        {id:3, name: 'Venue 3', location: 'October', capacity: 100, price: 700, rating: 3.5 },
        {id:4, name: 'Venue 4', location: 'Tagmo3', capacity: 150, price: 800, rating: 4.0 },
        {id:5,name: 'Venue 5', location: 'City A', capacity: 100, price: 900, rating: 5 },
        {id:6, name: 'Venue 6', location: 'City B', capacity: 150, price: 1000, rating: 2.5 },
        {id:7, name: 'Venue 7', location: 'October', capacity: 100, price: 1100, rating: 3.5 },
        {id:8,name: 'Venue 8', location: 'Cairo', capacity: 150, price: 1200, rating: 4.5 },

        // Add more venues as needed
    ];

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let eventId = queryParams.get('eventid');
    if(eventId){
        eventId= parseInt(eventId);
    }
    console.log('event',eventId)

    const selectVenue = async(venuId) => {
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


    return (
        <div className="container">
            <h1>Available Venues</h1>
            <FilterSection onFilterChange={filterVenues} />
            <VenueList venues={filteredVenues} onSelect={selectVenue} />
        </div>
    );
};

export default AvailableVenues;
