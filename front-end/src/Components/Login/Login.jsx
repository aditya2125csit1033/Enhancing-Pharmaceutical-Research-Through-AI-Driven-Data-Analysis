import React, { useState } from 'react';
import './Login.css';
import username_icon from '../Assets/username.png';
import password_icon from '../Assets/password.png';
import backgroundVideo from '../Assets/background-video.mp4';

const Login = () => {
    const [user, setUser] = useState({
        Username: "",
        Password: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            
        if(user.Username==="" && user.Password===""){
                 alert("Field value required");
                 return;
        }else if(user.Username===""){
                alert("Username is required");
                return;
            }else if(user.Password===""){
                alert("Password is required")
                return;
            }
            const response = await fetch('http://localhost:5000/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    Username: user.Username,
                    Password: user.Password
                }),
            });

            const data = await response.json();
            if (data.msg === "great") {
                const Username = user.Username;
                console.log("Username is ", Username);
                window.location.href = `http://localhost:3000/dashboard?Username=${Username}`;
            } else if (data.msg === "badomen") {
                alert("Wrong Password or email try again");
                return;
            }else if(data.msg === "Invalid username"){
                alert("Invalid Credentials")
            }

        } catch (error) {
            console.log("login", error);
        }
    };

    return (
        <div className='container'>
            {/* Background Video */}
            <video autoPlay muted loop className="background-video">
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='content'>
                <div className="header">
                    <div className="textlog">Login</div>
                    <div className="underline"></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input">
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
                            <img src={password_icon} alt="Password Icon" />
                            <input
                                type="password"
                                placeholder='Password'
                                name="Password"
                                value={user.Password}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="forgot-password">Lost Password<span><a href="http://localhost:3000/password-change">Click here</a></span></div>
                        <div className="submit-container">
                            <div className="submit"><a href="http://localhost:3000/register">Sign Up</a></div>
                            <div className="submit"><button type='submit'>Login</button></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
