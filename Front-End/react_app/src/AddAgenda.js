import React, {useState} from "react";
import './add-agenda.css'

const PopupForm = ({ eventId,onClose }) => {
    const [formData, setFormData] = useState({
        sttime: '',
        duration: '',
        description: '',
        speakerId: '',
        speakerPassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        sttime: '',
        duration: '',
        description: '',
        speakerId: '',
        speakerPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validate Start Time
        if (!formData.sttime) {
            errors.sttime = 'Start Time is required';
            isValid = false;
        }

        // Validate Duration
        if (!formData.duration || isNaN(formData.duration) || formData.duration <= 0) {
            errors.duration = 'Please enter a valid duration';
            isValid = false;
        }

        // Validate Description
        if (!formData.description) {
            errors.description = 'Description is required';
            isValid = false;
        }

        // Validate Speaker ID
        if (!formData.speakerId) {
            errors.speakerId = 'Speaker ID is required';
            isValid = false;
        }

        // Validate Speaker Password
        if (!formData.speakerPassword) {
            errors.speakerPassword = 'Speaker Password is required';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };
    const handleSubmit =async (e) => {
        e.preventDefault();
        // Add your logic to handle form submission
        console.log('Form submitted with data:', formData);
        if (!validateForm()) {
            return;
        }
        // Reset form fields after submission

        let body={
            eventid:parseInt(eventId),
            sttime: formData.sttime,
            duration:parseInt(formData.duration),
            description:formData.description,
            speakerid:parseInt(formData.speakerId),
            speakerpassword: formData.speakerPassword,

        }
        let res= await fetch('http://localhost:8080/add-session',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        let respone = await res.json();
        if(res.status===404){
            alert("There is no Speaker with this ID");
            return;
        }
        if(res.status===400||res.status===500){
            alert(respone.error);
            return;
        }
        if(res.status===201){
            alert("Session Added Successfully");
        }
        console.log(respone);
        onClose(formData); // Close the popup after submission

        setFormData({
            sttime: '',
            duration: '',
            description: '',
            speakerId: '',
            speakerPassword: ' ',
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
                        <div className="error-message">{formErrors.sttime}</div>
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
                        <div className="error-message">{formErrors.duration}</div>
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
                        <div className="error-message">{formErrors.description}</div>
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
                        <div className="error-message">{formErrors.speakerId}</div>
                    </div>

                    <div className="form-line">
                        <label>
                            Speaker Password:
                            <input
                                type="password"
                                name="speakerPassword"
                                value={formData.speakerPassword}
                                onChange={handleInputChange}
                            />
                        </label>
                        <div className="error-message">{formErrors.speakerPassword}</div>
                    </div>
                    <div className="form-line">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={()=>onClose(-1)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;