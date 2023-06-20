const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js');


const signup = (req, res) => {
    res.status(201).json("Signup Successfull");
}

const getbill = (req, res) => {

    const { userEmail } = req.body;

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL, pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: "Saurav",
            intro: "Don't worry no bills this month🥂",
            table: {
               data: [
                    {
                        item: "Nodemailer Stack",
                        description: "Backend Application",
                        price: "$0.1",
                    }
                ]
            },
            outro: "Are you looking for more surprises don't worry we will provide you some"
        }
      
    }
    let mail = mailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Place order",
        html: mail
    }

    transporter.sendMail(message).then(()=> {
        return res.status(201).json({
            msg: "you should recieve an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
    // res.status(200).json("Bill successfull");
}

module.exports = {
    signup, getbill
}
