import React, {useEffect, useState} from 'react';
import './SponserOffers.css'
import SponsorsCoordinator from "./SponserCoordinator";
import ExpensesForm from "./ExpensesForm";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "./UserContext";


const SponsorOffersList = () => {

    const {id}=useParams()
    const navigate = useNavigate();
    console.log("Event ID:",id);

    const {user,setUser}=useUser();
    if(!id){
        navigate('/');
    }
    const statusMapping = {
        2: 'accepted',
        1: 'pending',
        0: 'rejected',
    };


    const [sponsorOffers, setSponsorOffers] = useState([

    ]);


    useEffect(() => {
        const fetchData=async ()=>{
            try {
                let url = 'http://localhost:8080/event-sponsor-offers/' + id;
                console.log(url);
                let repsone = await fetch(url);
                let result = await repsone.json();
                let offers = JSON.parse(result);
                console.log(offers)
                setSponsorOffers(offers);
            }catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id]);
    const handleSubmit = async (sponsorData)=>{
        console.log(sponsorData);


        if(!sponsorData.sponsorId){
            alert("You have to select Sponsor to make Offer");
            return;
        }
        let body={
            eventId:parseInt(id),
            sponsorId:parseInt(sponsorData.sponsorId),
            price:sponsorData.offerPrice,
            isVip:sponsorData.isVIP
        };
        let respone = await fetch('http://localhost:8080/sponsors/add-offer',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
        })
        if(respone.status!==201){
            alert('There is an error in the Request');
            return;
        }
        let result = await respone.json();
        console.log(result);
        sponsorData.id = result.offer.id;
        sponsorData.name =sponsorData.sponsorName
        sponsorData.price = sponsorData.offerPrice
        sponsorData.isvip = result.offer.isvip;
        sponsorData.status=1;
        setSponsorOffers([...sponsorOffers,sponsorData]);
        console.log("SUBMIT")
    };
    const handleClose=()=>{

            console.log("CLOSE")
            setShowCoorinator(false)
    }
    const [showCoordinator,setShowCoorinator] = useState(false);
    console.log(showCoordinator);
    return (
        <>
        <div className="sponsor-offers-container">
            <h1>Sponsor Offers List</h1>
            <ul className="sponsor-offers-list">
                {sponsorOffers.map((offer) => (
                    <li key={offer.id} className={`sponsor-offer-item ${statusMapping[offer.status]} ${offer.isvip ? 'special' : ''}`}>
                        <div className="offer-details">
                            <p><strong>Sponsor Name:</strong> {offer.name}</p>
                            <p><strong>Offer Price:</strong> ${offer.price}</p>
                            <p><strong>Status:</strong> {statusMapping[offer.status]}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {user.type===2?
                <button className="add-event-button" onClick={()=>setShowCoorinator(true)}>
                    Call for Sponsor
                </button>:<></>}
        </div>
            {showCoordinator&&<SponsorsCoordinator
                onSubmit={handleSubmit}
                onClose={handleClose}/>}
        </>
    );
};

export default SponsorOffersList;
