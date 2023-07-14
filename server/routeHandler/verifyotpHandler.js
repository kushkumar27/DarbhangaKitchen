const sqlConnector = require("../utils/database/databaseConnector")
const nodemailer = require("nodemailer");
const { OTPNotMatchedError } = require("../errors/otpNotMatchedError");



function verifyotpHandler(email, otp, res) {

    sqlConnector.query('SELECT * FROM TempOTP WHERE email = "' + email + '"', (err, results) => {
        if (err) throw err;
        console.log(results)

        if (results != undefined && results[0] != undefined && results[0].otp == otp) {

            const datetime = new Date()
            const currentDate = datetime.toISOString().slice(0, 10)
            sqlConnector.query('INSERT INTO Newsletter (email, subscribedDate) VALUES (?)', [[email, currentDate]], (err, results) => {
                if (err) throw err;
                console.log("Successfully saved user mail ")

            })
            res.json({status : "SUCCESSFULL"});
        } else {
            res.json({
                status: "FAILED"
            });
        }
    })
  
}

module.exports = verifyotpHandler;