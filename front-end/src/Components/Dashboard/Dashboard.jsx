import React, { useState } from 'react';
import './Dashboard.css';
import dwi from '../Assets/dw.png';
import letschat from '../Assets/letschat.png';
import hamenu from '../Assets/hamenu.png';
import dashboard from '../Assets/dashboard.png';
import reports from '../Assets/reports.png';
import settings from '../Assets/settings.png';
import attach from '../Assets/attach.png';
import dialog from '../Assets/dialog.png';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import send_icon from '../Assets/send_icon.png';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
const Dashboard = ()=>{
  const queryParams = new URLSearchParams(window.location.search);
  const Username = queryParams.get('Username');
  const [Tdialog, setTdialog] = useState(false);
  const [Collapse, setCollapse] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [bold, setBold] = useState({ fontWeight: 'normal' });
  const [HBM, setHBM] = useState(false);
  const [state, setState] = useState(false);
  const [uupdate, setUpdate] = useState(false);
  const [uval, setUval] = useState('');
  const [dash, setDash] = useState(true);
  const [rep, setRep] = useState(false);
  const [set, setSet] = useState(false);
  const [letc, setLetc] = useState(false);
  const [prompt, setPrompt] =useState('');
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mssg, setMssg] = useState('');
  const [ImageStyle, setImageStyle] = useState({
    height: '25px',
    width: '25px',
    filter: 'invert(1)',
  });
  const handlePrompt = (e) =>{

    setPrompt(e.target.value);
  };
  function ScrollDown() {
    const inner = document.querySelector('.chatarea');
    inner.scrollTop = inner.scrollHeight; // Corrected 'ScrollTop' to 'scrollTop'
}

const handlePromsub = async (e) => {
    e.preventDefault();
    
    const prompMatter = document.querySelector('.chatarea'); 

    prompMatter.innerHTML += await `
        <div class="text-boxx">
            <div class="sent-text text">
                ${prompt} 
            </div>
        </div>`;

    ScrollDown();

      
  
    try {
      const promptres = await fetch('http://localhost:5000/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
        body: JSON.stringify({Prompt: prompt,
          PromHeader: "Prompt"
         }), 
=======
        body: JSON.stringify({Prompt: prompt }), 
>>>>>>> 12d252c1254f4ee12869a063e488ac934e1d65a3
      });
      setPrompt('');
      document.getElementById("prompt").value = "";
      const respin = await promptres.json();
      if (promptres.ok) {
        prompMatter.innerHTML += `
        <div class="text-boxxr">
          <div class="received-text text">
<<<<<<< HEAD
            ${respin.response}
=======
            ${respin.msg}
>>>>>>> 12d252c1254f4ee12869a063e488ac934e1d65a3
          </div>
          </div>`;
          ScrollDown();
      } else {
        alert('An error occurred');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };
  
  const [hambfunc, setHambfunc] = useState(false);

  const dashStyle = {
    fontSize: '20px',
    fontWeight: "bolder",
    padding: "14px",
    
    background: "black",
    boxShadow: '4px 3px 4px rgb(129, 132, 132)'
  };

  const repStyle = {
    fontSize: '20px',
    fontWeight: "bolder",
    padding: "14px",

    background: "black",
    boxShadow: '4px 3px 4px rgb(129, 132, 132)'
  };

  const setStyle = {
    fontSize: '20px',
    fontWeight: "bolder",
    padding: "14px",
   
    background: "black",
    boxShadow: '4px 3px 4px rgb(129, 132, 132)'
  };

  const letcStyle = {
    fontSize: '20px',
    fontWeight: "bolder",
    padding: "14px",
    
    background: "black",
    boxShadow: '4px 3px 4px rgb(129, 132, 132)'
  };

  const update = () => {
    setUpdate((prevState) => !prevState);
    setUval('');
    setMessage('');
  };
  const handleReset = () => {
    setUval('');
    setMessage('');
  }
  const logout = async() => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    const resing = await fetch('http://localhost:5000/logout',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(resing.ok){
      console.log("successfully logged out");
      window.location.replace('http://localhost:3000/');
    }else{
      console.error("error logging out");
    }
  };

  const hamburgermenu = () => {
    setCollapse((prevState) => !prevState);
    setHBM((prevState) => !prevState);
  };

  const collp = () => {
    setCollapse((prevState) => !prevState);
    setHBM((prevState) => !prevState);
  };


  const onCD = () => {
    setDash(true);
    setLetc(false);
    setRep(false);
    setSet(false);
  };

  const onCR = () => {
    setDash(false);
    setLetc(false);
    setRep(true);
    setSet(false);
  };

  const onCL = () => {
    setDash(false);
    setLetc(true);
    setRep(false);
    setSet(false);
  };
  const onDialogMouse = () => {
    setTdialog((prevState) => !prevState);
  }
  const onCS = () => {
    setDash(false);
    setLetc(false);
    setRep(false);
    setSet(true);
  };

  const handleShowO = () => {
    setShowImage(true);
    setBold({ fontWeight: 'bold' });
  };

  const handleShowL = () => {
    setShowImage(false);
    setBold({ fontWeight: 'normal' });
  };

  const imagehandleO = () => {
    setImageStyle({
      margin: '-2px',
      height: '28px',
      width: '28px',
      filter: 'invert(1)',
    });
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
  if (files.length === 0) {
    console.log('No files selected');
  } else {
    console.log('Files selected:', files);
  }
    setSelectedFiles(e.target.files); 
  };
  const handleDialogClose =()=>{
    setDialogOpen(false);
  }
  const handleDialogOpen =()=>{
    setDialogOpen(true);
  }
  const imagehandleL = () => {
    setImageStyle({
      height: '25px',
      width: '25px',
      filter: 'invert(1)',
    });
  };
  
  const ham = () => {
    setHambfunc((prevState) => !prevState);
    
  };
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting file...');
    const formData = new FormData();
  
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    for (let pair of formData.entries()) {
      console.log('reached here');
      console.log(pair[0], pair[1]); 
    }
  
    try {
      const filrep = await fetch('http://localhost:5000/file-upload', {
        method: 'POST',
        body: formData,
      });
  
      if (filrep.ok) {
        alert('Files uploaded successfully!');
      } else {
        alert('Error uploading files');
      }
    } catch (error) {
      alert('There was an error in loading files: ' + error.message);
    }
  };
    const handleInput = (e) => {
    setUval(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uval.length === 0) {
      return setMessage('Password field is required');
    }

    try {
      const response = await fetch('http://localhost:5000/updatepass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username, uval }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Password updated successfully');
      } else {
        setMessage(result.msg || 'Error updating password');
      }
    } catch (error) {
      setMessage('There was an error');
    }
  };


  return (
    <div className="main" >
      {/* {Collapse && ( */}
        {!Collapse && (<div className="left">
          <div className="topper">
            <div
              className="lists account"
              onMouseEnter={handleShowO}
              onMouseLeave={handleShowL}
            >
              <div className="noham">
                <span style={bold}>@{Username}</span>
                {showImage && (
                  <div>
                    <img
                      onClick={ham}
                      onMouseEnter={imagehandleO}
                      onMouseLeave={imagehandleL}
                      className="imi"
                      src={dwi}
                      style={ImageStyle}
                      alt="Profile Icon"
                    />
                  </div>
                )}
              </div>
              {hambfunc && (
                <motion.div
                className="ham"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: hambfunc ? 1 : 0, y: hambfunc ? 0 : -20 }}
                transition={{ duration: 0.5 }}
              >
                  <div className="hm1 logout" onClick={logout}>
                    Log Out
                  </div>
                  <div className="hm1 updateprofile" onClick={update}>
                    Update
                  </div>
                </motion.div>
              )}
            </div>

            <div
              className="pt lists dashboard"
              onClick={onCD}
              style={dash ? dashStyle : null}
            >
              <img src={dashboard} alt="dashboard's image" />
              Dashboard
            </div>
            <div
              className="pt lists reports"
              onClick={onCR}
              style={rep ? repStyle : null}
            >
              <img src={reports} alt="reports" />
              Reports
            </div>
            <div
              className="pt lists settings"
              onClick={onCS}
              style={set ? setStyle : null}
            >
              <img src={settings} alt="settings" />
              Settings
            </div>
          </div>
          <div className="footer">
            <div className="pt letschat" onClick={onCL} style={letc ? letcStyle : null}>
              Let's Chat . .
              <img className="helios" src={letschat} alt="Let's Chat Icon" />
            </div>
            <div className="pt collapse_menu" onClick={collp}>
              Collapse Menu
            </div>
          </div>
        </div>)}

      <motion.div className="right" 
      initial={{ width: '80%' }}
        animate={{ width: Collapse ? '100%' : '80%' }}
        transition={{ duration: 0.17 }}> 
      
            <Dialog className='uploaddialog' open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFileSubmit}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              name="files"
            />
            <div className="mess">{mssg}</div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' onClick={handleFileSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
        {HBM && (
          <div className="hamim">
            <img
              className="hamburger"
              onClick={hamburgermenu}
              src={hamenu}
              alt="Hamburger Menu"
            />
          </div>
        )}
        {uupdate && (
          <motion.div
          className="updatedb"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: uupdate ? 1 : 0, scale: uupdate ? 1 : 0.9 }} 
          exit={{ opacity: 0, scale: 0.9 }} 
          transition={{ duration: 0.5 }} 
        >
            <form onSubmit={handleSubmit}>
              <h1>Update Password</h1>
              <div className="text">
                <input
                  onChange={handleInput}
                  className="textbox2"
                  type="text"
                  name="update_password"
                  placeholder="Update password"
                />

              </div>
              <div className='mess'>
                {message}
              </div>
              <div className="upsub">
                <input className="button1" type="submit" value="Submit" />
                <input className="button2" type="reset" value="reset" onClick={handleReset} />
              </div>
            </form>
          </motion.div>
        )}
        {!uupdate && dash && <div>
          <h1> ~Dashboard will be added soon.</h1>
        </div>}

        {!uupdate && rep && <h1>Reports</h1>}
        {!uupdate && letc && (
            
          <div className="L_Chat">
            <motion.div
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}   
            exit={{ opacity: 0, y: -20 }}    
            transition={{ duration: 1 }}   
          >
          <h1 className='heading'>Personal Assistant</h1>
        
              </motion.div>
          <div className="chatarea">

          </div>
          
          <div className="L_Foot">

            {Tdialog && (<div><div className="dialog">
              Attach files and images
            </div>
              <img className='tdiag'src={dialog} alt="dialog" />
            </div>
            
            )
          }
          

            <img onClick={handleDialogOpen} onMouseEnter={onDialogMouse} onMouseLeave={onDialogMouse} className='attach' src={attach} alt="attach" />
            <form className='form' onSubmit={handlePromsub} action="onSubmit">
              <input type="text"
                id='prompt'
                name='Prompt'
                placeholder='Message'
                onChange={handlePrompt}
              />
              <button type="submit" className="sendButton">
                <img className='sendIcon' src={send_icon} alt="send icon" />
              </button>
              
       

            </form>

          </div>


        </div>
        
        )
        }
        {!uupdate && set && <h1>Settings</h1>}
      </motion.div>
    </div>
  );
};

export default Dashboard;
