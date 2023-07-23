require("dotenv").config();
const express = require("express");
const app = express();
const cron = require("node-cron");
const nodemailer = require("nodemailer");

app.get("/", (req, res) => {
  res.send("Email Scheduler");
});

const port = process.env.PORT || 4000;

const task = async () => {
  const emails = ["nirant080602@gmail.com"];
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASS,
    },
  });
  try {
    let info = await transporter.sendMail({
      from: "Noob <noobgrammers123@gmail.com>",
      to: emails,
      subject: "Testing, testing, 123",
      html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
    });
    console.log(info.messageId);
  } catch (error) {
    console.log(error);
  }
};

// cron.schedule("* * * * *", task);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listining on port ${port}...`);
    });
    task();
  } catch (error) {
    console.log(error);
  }
};
start();
