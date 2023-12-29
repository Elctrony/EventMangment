import React, { useState } from 'react';

import {useUser} from './UserContext'
import {useNavigate} from "react-router-dom";

import './SignupForm.css'
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type,setType]=useState(1);
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

            let user  ={id:email,password:password};
            setEmail('');
            setPassword('');
            let response= await fetch('http://localhost:8080/login-speaker',{
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
                user.type=2;
                console.log(user);
                setUser(user);
                navigate('/');
                return;
            }
            alert(responseData.message);
    };

    return (
        <section className="scroll">
            <div className="form login">
                <div className="form-content">
                    <header>Speaker Login</header>
                    <form onSubmit={handleLogin}>
                        <div className="field input-field">
                            <input
                                type="text"
                                placeholder="ID"
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



                            <span className="error red-text"></span>
                        <div className="field button-field">
                            <button type="submit">Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default LoginForm;
