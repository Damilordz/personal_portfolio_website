import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // Middleware for parsing application/json
app.use(
  cors({
    origin: "https://personal-portfolio-website-frontend.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST"], // Allowed HTTP methods
  })
); // Middleware for enabling Cross-Origin Resource Sharing (CORS)

// Route for sending email
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Email
      pass: process.env.EMAIL_PASS, // Email password
    },
  });

  // Set up email data
  let mailOptions = {
    from: email, // Sender's email address
    to: process.env.EMAIL_USER, // Recipient's email address (configured in .env file)
    subject: `Contact Form: ${subject}`, // Email subject
    text: `You have a new message from ${name} (${email}):\n\n${message}`, // Email content
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Error sending email, please try again later.",
      });
    } else {
      console.log("Email sent: " + info.response);
      return res
        .status(200)
        .json({ status: "success", message: "Email sent successfully!" });
    }
  });
});

// Route for testing server
app.get("/welcome", (req, res) => {
  res.send("<h1>Welcome to Backend</h1>");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
