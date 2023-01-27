const express = require("express");
const cors = require('cors');
const app = express();

var nodemailer = require('nodemailer');
app.use(express.json());
app.use(cors())
const PORT = 8000;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'imranovazer8@gmail.com',
        pass: 'tmaqdelhxkxepbvz'
    }
});

app.post("/api/email", (req, res) => {

    const mailOptions = {
        from: 'imranovazer8@gmail.com', // sender address
        to: 'imranovazer@gmail.com', // list of receivers
        subject: 'Portfolio contact', // Subject line
        html: `<p>Sent from ${req.body.data.email}<br/> Message : ${req.body.data.text} </p>`// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
            res.status(404).json({
                status: "Error",
                data: err
            })

        }
        else {
            console.log(info);
            console.log(req.body);
            res.status(200).json({
                status: "Success",
                data: `${mailOptions.html}`
            })
        }

    });

})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})

