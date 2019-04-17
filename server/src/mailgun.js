const domain = "mail.coloradocommunityradio.com";
const mailgunAPIKey = "";
const mailgun = require('mailgun-js')({ apiKey: mailgunAPIKey, domain: domain });

// Create and export function to send emails through Mailgun API
exports.sendEmail = function (recipient, message) {
  const data = {
    from: 'CCRN Accounts <accounts@coloradocommunityradio.com>',
    to: recipient,
    subject: message.subject,
    text: message.text
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) { console.log(error); }
    else console.log(body);
  });
};
