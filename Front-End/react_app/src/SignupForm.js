import React, { useState } from 'react';
import './SignupForm.css'; // Import your CSS file

import {useUser} from './UserContext'
const SignupForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
    });


    // Update form data on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();

        // Perform signup logic here
        // console.log('Form Data:', formData);
        console.log();
        // Reset the form after submission (optional)
        let response= await fetch('http://localhost:8080/add-event-manager',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const responseData = await response.json();
        console.log('Response data:', responseData);
        setFormData({
            fname: '',
            lname: '',
            number: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    return (

        <section className="scroll">
            <div className="form manger">
                <div className="form-content">
                    <header>Signup</header>
                    <form onSubmit={handleSignup}>
                        <div className="field input-field">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input"
                                name="fname"
                                value={formData.fname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field input-field">
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="input"
                                name="lname"
                                value={formData.lname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field input-field">
                            <input
                                type="text"
                                placeholder="phone"
                                className="input"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field input-field">
                            <input
                                type="email"
                                placeholder="Email"
                                className="input"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field input-field">
                            <input
                                type="password"
                                placeholder="Create password"
                                className="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className="field button-field">
                            <button type="submit">Signup</button>
                        </div>
                    </form>
                    <div className="form-link">
            <span>
              Already have an account? <a href="/login" className="link login-link">Login</a>
            </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupForm;
