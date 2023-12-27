import React, { useState } from 'react';

import {useUser} from './UserContext'
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useUser();
    const navigate =useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!email.trim() || !password.trim()) {
            alert('Please enter both email and password.');
            return;
        }
        let user  ={email:email,password:password};
        setEmail('');
        setPassword('');
        let response= await fetch('http://localhost:8080/login-event-manager',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        const responseData = await response.json();
        if(responseData.code===2){
            console.log("Login succeed")
            let user= responseData.user;
            console.log(user);
            setUser(user);
            navigate('/events');
            return;
        }
        alert(responseData.message);



    };

    return (
        <section className="scroll">
            <div className="form login">
                <div className="form-content">
                    <header>Login</header>
                    <form onSubmit={handleLogin}>
                        <div className="field input-field">
                            <input
                                type="email"
                                placeholder="Email"
                                className="input"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="field input-field">
                            <input
                                type="password"
                                placeholder="Password"
                                className="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <i className='bx bx-hide eye-icon'></i>
                        </div>

                        <div className="form-link">
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>

                        <div className="field button-field">
                            <button type="submit">Login</button>
                        </div>
                    </form>

                    <div className="form-link">
                        <span>Don't have an account? <a href="#" className="link signup-link">Signup</a></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
