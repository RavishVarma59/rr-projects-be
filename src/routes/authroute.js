const express = require("express");

const {signup,login, logout} = require("../controllers/auth");
const userAuth = require("../middleware/authroute");
const { getUserDetail } = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// user related api call 
router.get('/userdetails',userAuth,getUserDetail);
module.exports = router;