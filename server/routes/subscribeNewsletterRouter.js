const express = require('express');
const { OTPNotMatchedError } = require('../errors/otpNotMatchedError');
const router = express.Router()
const generateotpHandler = require("../routeHandler/generateotpHandler");
const verifyotpHandler = require('../routeHandler/verifyotpHandler');

router.post("/generateotp", (req, res, next) => {
    console.log(req.body);
    generateotpHandler(req.body.email, res)
    
})
router.post("/verifyotp", (req, res, next) => {
    console.log(req.body);
    try {
        verifyotpHandler(req.body.email, req.body.otp, res)
    } catch (err) {
        console.log(err);
        res.json({ status: "SYSTEM_ERROR" });
    }
    
})

module.exports = router;