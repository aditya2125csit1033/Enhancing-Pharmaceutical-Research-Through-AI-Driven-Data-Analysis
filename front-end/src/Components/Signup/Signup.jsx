import React, { useState } from 'react';
import './Signup.css';
import username_icon from '../Assets/username.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import backgroundVideo from '../Assets/background-video.mp4';

const Signup = () => {
    const [user, setUser] = useState({
        Username: "",
        Email: "",
        Password: "",
    });

    const [passwordStrength, setPasswordStrength] = useState("");
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
        
        if (name === "Password") {
            const length = value.length;
            if (length > 10) {
                setPasswordStrength("Strong");
            } else if (length >= 6) {
                setPasswordStrength("Moderate");
            } else if (length > 0) {
                setPasswordStrength("Weak");
            } else {
                setPasswordStrength("");
            }
        }

    };
    const handleValidation = () => {
        if (user.Username.length > 0 && user.Email.length > 0 && user.Password.length > 0) {
          return true; 
        } else {
          alert('All fields are required.');
          return false;
        }
      };
    
    const handleSubmit = async (e) => {
        
        console.log('Submitting user data:', user); 
        e.preventDefault();

        if(handleValidation()){
        try {
            const feed = await fetch('http://localhost:5000/checkUsername', {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Username: user.Username}), // Send the combined user data
            });
            const mineral = await feed.json();
            if(mineral.msg === "yes"){
                alert("Username already exists");
                return;
            }
             
            

            const response = await fetch('http://localhost:5000/register', {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user), // Send the combined user data
            });

            const data = await response.json(); // Await response.json()

            if (data.msg === "false1") {
                alert("Password must be at least 6 characters long, and include at least one letter, one number, and one special character.");
            } else if (data.msg === "false2") {
                alert("Please include an '@' in the email address and a '.' after '@'.");
            } else if (data.msg === "false3") {
                alert("Email already exists.");
            } else if (data.newPost) {
                alert("Registration successful!");
                window.location.href = "http://localhost:3000/";
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert("Details were not submitted. Please try again later.");
        }
    }

    };

    return (
        <div className='container'>
            {/* Background Video */}
            <video autoPlay muted loop className="background-video">
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="content">
                <div className="header">
                    <div className="textsign">Signup</div>
                    <div className="underline"></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input" >
                            <img src={username_icon} alt="Username Icon" />
                            <input
                                type="text"
                                placeholder='Name'
                                name="Username"
                                value={user.Username}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="input">
                            <img src={email_icon} alt="Email Icon" />
                            <input
                                type="email"
                                placeholder='Email'
                                name="Email"
                                value={user.Email}
                                onChange={handleInput}
                            />
                           
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="Password Icon" />
                            <input
                                type="password"
                                placeholder='Password'
                                name="Password"
                                value={user.Password}
                                onChange={handleInput}
                            />
                            {user.Password && (
                                <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                                    {passwordStrength}
                                </div>
                            )}
                            
                        </div>
                        
                        <div className="submit-container">
                            <div className="submit">
                                <button type="submit">Sign Up</button>
                            </div>
                            <div className="submit">
                                <button type="button"><a href="http://localhost:3000/">Login</a></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
