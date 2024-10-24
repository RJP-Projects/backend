const nodemailer = require('nodemailer');

const sendEmail = async (recipientEmail, message) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'rjparsana8@gmail.com',
        pass: 'kigf cduq jriv chxb',
      },
    });

    let mailOptions = {
      from: 'rjparsana8@gmail.com',
      to: recipientEmail,
      subject: 'Password Reset OTP',
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

module.exports = sendEmail;

  