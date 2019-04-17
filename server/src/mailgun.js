const config = require('./config');
const mailgun = require('mailgun-js')(config.mailgun);

// Create and export function to send emails through Mailgun API
exports.sendEmail = function (sender, recipient, message) {
  return new Promise((resolve, reject) => {
    const data = {
      from: sender,
      to: recipient,
      subject: message.subject,
      text: message.text,
      html: message.html
    };
    mailgun.messages().send(data, (error, body) => {
      if (error) { console.log(error); }
      else console.log(body);
    });
  });
};
