const express = require('express');
const router = express.Router();
const auth = require("./controllers.js");
const auth2 = require("./ollama-controller.js");
const auth3 = require("./text-prep");
const multer = require('multer');
const path = require('path');
const disk = __dirname;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(disk, '../disk'));  
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
    const upload = multer({ storage });
router.route("/").post(auth.login);
router.route("/logout").post(auth3.logout);
router.route("/register").post(auth.register);
router.route("/check-email").post(auth.checkEmail);
router.get("/dashboard", auth.authenticateToken, auth.dashboard);
router.route("/updatepass").post(auth.updatepass);
router.route("/findUser").post(auth.findUser);
router.route("/checkUsername").post(auth.checkUsername);
router.route("/prompt").post(auth3.promptResponse);
router.route("/file-upload").post(upload.array('files', 100), auth.fileUpload);


module.exports = router;
