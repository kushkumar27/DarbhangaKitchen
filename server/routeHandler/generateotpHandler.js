const sqlConnector = require("../utils/database/databaseConnector")
const nodemailer = require("nodemailer")

function generateotpHandler(email, res) {
    if (email == undefined) throw new Error("Email input field is empty")

    //Checking if user is already subscribed
    sqlConnector.query('SELECT * FROM Newsletter WHERE email = "' + email + '"', (err, results) => {
        if (err) throw err;
        console.log(results)

        if (results != undefined && results[0] != undefined) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send("User is already subscribed");
        } else {
            generateOTP(email, res)
        }
    })

    
}

function generateOTP(email, res) {
    const otp = Math.floor(Math.random() * 1000000 + 1) + ""
    // Adding this email to datbase (Table : TempOTP)
    sqlConnector.query('INSERT INTO TempOTP (email, otp) VALUES (?)', [[email, otp]], (err, results) => {
        if (err && err.code === 'ER_DUP_ENTRY') {
            sqlConnector.query('UPDATE TempOTP SET otp = "' + otp + '" WHERE email = "' + email + '"', (err, updateResult) => { if (err) throw err })
        }
        else if (err) throw err;
        console.log("Successfully generated otp ")
        res.header("Access-Control-Allow-Origin", "*");
        res.send("The OTP has been successfully sent to your Email Id");

    })

    setTimeout(() => {
        sqlConnector.query('DELETE FROM TempOTP WHERE email = "' + email + '"', (err, results) => {
            if (err) throw err;
            console.log("Successfully deleted temporary otp and email: " + email)
        })
    }, 300000);

    // notify user in email
    notifyUser(email, otp)
}

function notifyUser(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "devnotabhi24@gmail.com",
            pass: "ndqwxvtyiiyilegk"
        }
    })
    var mailOptions = {
        from: 'devnotabhi24@gmail.com',
        to: email,
        subject: "Darbhanga Kitchen: OTP for Newsletter Subscription",
        text: 'Your otp for verification is : ' + otp
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log("Successfully notified user")
    })
}

module.exports = generateotpHandler;