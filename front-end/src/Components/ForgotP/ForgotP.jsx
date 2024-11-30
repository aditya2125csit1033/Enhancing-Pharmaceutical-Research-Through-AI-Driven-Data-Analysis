import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import email_icon from '../Assets/email.png';
import "./ForgotP.css"
import backgroundVideo from '../Assets/background-video.mp4';
emailjs.init('LgH0VTdKwtSI3PsRw');
const ForgotP = () => {
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleInput = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const response = await fetch('http://localhost:5000/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), 
      });

      const data = await response.json();
      console.log("data is",data)
      if(data.msg === "yes"){
        await emailjs.send( 'service_jy6oq6w','template_m5k5p9e' , {
           recipient: email,
         } ).then(
          () => {
            alert('message sent!');
          },
          (error) => {
            alert('FAILED...', error.text);
          },
        );

      } else {
        alert("Email doesn't exist");
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while checking the email.');
    } finally {
      setLoading(false);
      setEmail('');
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
        <div className="prhead">Password Reset</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="Email icon" />
            <input 
              type="email" 
              placeholder='Enter Your Email' 
              name="email" 
              value={email} 
              onChange={handleInput} 
              required
            />
          </div>
          <div className="submit-container">
            <div className="submit">
              <button type='submit' disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ForgotP;
