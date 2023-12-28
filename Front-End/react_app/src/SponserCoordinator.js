import React, { useState, useEffect } from 'react';
import './ExpensesForm.css';


const SponsorsCoordinator = ({ eventid,onClose, onSubmit }) => {
    if(!eventid){
        eventid=0;
    }
    const [sponserData, setSponserData] = useState({
        sponsorId:0,
        sponsorName: '',
        offerPrice: '',
        isVIP: false,
    });


    console.log("RELOAD",sponserData)
    const [errors, setErrors] = useState({
        sponsorName: '',
        offerPrice: '',
    });

    const [sponsorOptions, setSponsorOptions] = useState([]);

    useEffect(() => {
        // Fetch sponsor options from the server
        fetch('http://localhost:8080/sponsors')
            .then((response) => response.json())
            .then((data) => {
                // Assuming data is an array of sponsor names
                let sponsors =  JSON.parse(data);
                console.log(sponsors);
                if(sponsors[0]){
                    setSponserData({...sponserData,sponsorId:sponsors[0].id,sponsorName: sponsors[0].name })
                }
                setSponsorOptions(sponsors);
            })
            .catch((error) => console.error('Error fetching sponsor options:', error));
    }, [eventid]); // The empty dependency array ensures the effect runs only once on mount

    const validateForm = () => {
        let isValid = true;

        const newErrors = { sponsorName: '', offerPrice: '' };

        if (!sponserData.sponsorId||sponserData.sponsorId===-1) {
            console.log(sponserData);
            newErrors.sponsorName = 'Sponsor name is required';
            isValid = false;
        }

        if (!sponserData.offerPrice || sponserData.offerPrice <= 0) {
            newErrors.offerPrice = 'Offer amount must be greater than 0';
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(sponserData);
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>

                <h1>Sponsors Coordinator</h1>
                <form>
                    <label htmlFor="Sponsers">Sponsor :</label>
                    <select
                        id="Sponsers"
                        name="cars"
                        onChange={(e) =>{
                            console.log(e.target.value);
                            let spid = parseInt(e.target.value);
                            let sponName = sponsorOptions.find(item=>item.id===spid).name;

                            let newSponsorData  =sponserData;
                            newSponsorData.sponsorId=spid;
                            newSponsorData.sponsorName=sponName;
                            console.log(newSponsorData);

                            setSponserData(newSponsorData)
                        }}
                    >
                        {sponsorOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    {errors.sponsorName && (
                        <div className="error-message">{errors.sponsorName}</div>
                    )}
                    <label htmlFor="offerPrice">Offer Price</label>
                    <input
                        type="number"
                        id="offerPrice"
                        min="0"
                        value={sponserData.offerPrice}
                        onChange={(e) =>
                            setSponserData({ ...sponserData, offerPrice: e.target.value })
                        }
                        required
                    />
                    {errors.offerPrice && (
                        <div className="error-message">{errors.offerPrice}</div>
                    )}

                    <div>
                        <label>
                            VIP Sponsor
                            <input
                                type="checkbox"
                                checked={sponserData.isVIP}
                                onChange={(e) =>
                                    setSponserData({ ...sponserData, isVIP: e.target.checked })
                                }
                            />
                        </label>
                    </div>

                    <div className="button-container">
                        <button className="add-btn" type="button" onClick={handleSubmit}>
                            Send Offer
                        </button>
                        <button className="delete-btn" type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SponsorsCoordinator;
