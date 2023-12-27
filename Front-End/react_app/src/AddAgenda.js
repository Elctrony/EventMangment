import React, {useState} from "react";
import './add-agenda.css'

const PopupForm = ({ eventId,onClose }) => {
    const [formData, setFormData] = useState({
        sttime: '',
        duration: '',
        description: '',
        speakerId: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Add your logic to handle form submission
        console.log('Form submitted with data:', formData);

        // Reset form fields after submission

        let body={
            eventid:parseInt(eventId),
            sttime: formData.sttime,
            duration:parseInt(formData.duration),
            description:formData.description,
            speakerid:parseInt(formData.speakerId),

        }
        let res= await fetch('http://localhost:8080/add-session',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        let respone = await res.json();
        console.log(respone);

        onClose(formData); // Close the popup after submission

        setFormData({
            sttime: '',
            duration: '',
            description: '',
            speakerId: '',
        });
    };

    return (
        <div className="popup-form">
            <div className="popup-content">
                <h2>Add Session</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-line">
                        <label>
                            Start Time:
                            <input
                                type="time"
                                name="sttime"
                                value={formData.sttime}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="form-line">
                        <label>
                            Duration:
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="form-line">
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="form-line">
                        <label>
                            Speaker ID:
                            <input
                                type="text"
                                name="speakerId"
                                value={formData.speakerId}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="form-line">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;