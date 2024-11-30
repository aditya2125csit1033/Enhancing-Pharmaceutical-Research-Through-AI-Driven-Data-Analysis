const { registerdb } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const auth3 = require('./text-prep.js');
const findUser = async (req, res) => {
  const { Email } = req.body; 
  try {
    const user = await registerdb.findOne({ where: { Email: Email } }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); 
    }
    const { Username } = user;
    return res.status(200).json({ Username: Username }); 
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' }); // Handle server errors
  }
};

const checkUsername = async(req, res) =>{
  try{
    const{Username} = req.body;
    const found = await registerdb.findOne({ where: { Username: Username } }); 
    if(found){
      return res.status(200).json({msg:"yes"});
    }else{
      return res.status(200).json({msg:"no"});
    }
  }catch (error) {
    console.error("Error checking email:", error);
    res.status(500).send("Internal Server Error");
  }
};
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;  // Use req.body to get the email from the request
    const user = await registerdb.findOne({ where: { Email: email } });
    if (user) {
      console.log(user);
      return res.status(200).json({ msg: "yes" });
    } else {
     return res.status(200).json({ msg: "no" });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).send("Internal Server Error");
  }
  };
const updatepass = async (req, res) => {
  try {
    const {Username, uval } = req.body;

    const user = await registerdb.findOne({ where: { Username: Username } });
    
    if (user) {
      const hashedPassword = await bcrypt.hash(uval, 10);

      await registerdb.update({ Password: hashedPassword }, { where: { Username } });

      return res.status(200).json({ msg: "great" });
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const user = await registerdb.findOne({ where: { Username } });
    
    if (user) {
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (isMatch) {
        const token = jwt.sign(
          { id: user.id, Username: user.Username, Email: user.Email },
          process.env.WALL_SEC,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict"
        });

        return res.status(200).json({ msg: "great" });
      } else {
        return res.status(401).json({ msg: "badomen" });
      }
    } else {
      return res.status(401).json({ msg: "Invalid username" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};
const fileUpload = async (req, res) => {
  console.log("file reached here");
  console.log(req.files); 
  console.log(req.body);  
  
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  
  }else{
     
    await auth3.conversion();
    return res.status(200).json({ message: 'files uploaded' });
  }

};

const register = async (req, res) => {
  console.log("Request Body:", req.body); 
  try {
    const { Username, Email, Password, Pfp } = req.body;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!passwordRegex.test(Password)) {
      return res.status(400).json({ msg: "false1" });
    }
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ msg: "false2" });
    }

    const userExist = await registerdb.findOne({ where: { Email } });
    if (userExist) {
      return res.status(400).json({ msg: "false3" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newPost = await registerdb.create({
      Username,
      Email,
      Password: hashedPassword,
      Pfp
    });

    res.status(201).json({ newPost });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized, token not provided" });
  }

  jwt.verify(token, process.env.WALL_SEC, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

const dashboard = (req, res) => {
  res.status(200).json({ msg: "Welcome to the dashboard", user: req.user });
};

module.exports = { login, register, dashboard, authenticateToken, checkEmail, findUser, updatepass, checkUsername, fileUpload};