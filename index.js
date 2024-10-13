require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure the email transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, // Your email address from the .env file
      pass: process.env.PASSWORD, // Your app password from the .env file
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.USER, // Send to your email address
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
