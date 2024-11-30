import React, { useState } from 'react';
import "./UpdateP.css";
import backgroundVideo from '../Assets/background-video.mp4';
import password_icon from '../Assets/password.png';
const UpdateP = ()=>{
    const queryParams = new URLSearchParams(window.location.search);
  const Email = queryParams.get('Email');
  const [uval, setUval] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleInput = (e) => {
    setUval(e.target.value);
  };

  const handleSubmit = async(e)=>{
      e.preventDefault();
      setLoading(true);
      const tub = await fetch('http://localhost:5000/findUser', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ Email }),
      });
      
      const { Username } = await tub.json(); 
      console.log('Username:', Username); 

    try {
        const response = await fetch('http://localhost:5000/updatepass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Username, uval}),
        });
  
        const result = await response.json();
        if (response.ok) {
          setMessage("Password updated successfully");
        } else {
          setMessage(result.msg || "Error updating password");
        }
      } catch (error) {
        setMessage("There was an error");
      } 
   

  };
    return (
        <div className='container'>
          <video autoPlay muted loop className="background-video">
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="content">
    
          <div className="header">
            <div className="text">Update</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <img src={password_icon} alt="Password Icon" />
                <input 
                  type="password"
                  placeholder='Password'
                  name="Password"
                  onChange={handleInput}
                  />
              </div>
              <div className="submit-container">
                <div className="submit">
                  <button type='submit' disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          </form>
          {message && <p>{message}</p>}
                  </div>
        </div>
      );
    };

export default UpdateP;