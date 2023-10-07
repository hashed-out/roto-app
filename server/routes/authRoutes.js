const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
// 
require('dotenv').config();


async function mailer(recieveremail, code) {


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        secure: false,
        requireTLS: true,
        auth: {
            user: "usamarehman87@gmail.com", 
            pass: "hvdaxbsknvwrczpf", 
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'usamarehman87@gmail.com', // sender address
        to: `${recieveremail}`, // list of receivers
        subject: "Signup Verification", // Subject line
        text: `Your Verification Code is ${code}`, // plain text body
        html: `<b>Your Verification Code is ${code}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}



router.post('/signup', async (req, res) => {
    // console.log('sent by client - ', req.body);
    const { name, email, password, phone } = req.body;


    const user = new User({
        name,
        email,
        password,
        phone
    })

    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT);
        res.send({ message: "User Registered Successfully", token });
    }
    catch (err) {
        console.log(err);
    }

})

router.post('/verify', (req, res) => {
    console.log('sent by client - ', req.body);
    const { name, email, password, phone } = req.body;
    //console.log("sd");
    if (!name || !email || !phone || !password ) {
        return res.status(422).json({ error: "Please add all the fields" });
    }


    User.findOne({ email: email })
        .then(async (savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Invalid Credentials" });
            }
            try {

                let VerificationCode = Math.floor(100000 + Math.random() * 900000);
                //console.log("sd2");
                let user = [
                    {
                        name,
                        email,
                        phone,
                        password,
                        VerificationCode
                    }
                ]
                await mailer(email, VerificationCode);
                res.send({ message: "Verification Code Sent to your Email", udata: user });
            }
            catch (err) {
                console.log(err);
            }
        })


})


module.exports = router;