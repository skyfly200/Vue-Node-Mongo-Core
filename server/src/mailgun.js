const config = require('./config').mailgun;
const mailgun = require('mailgun-js')({
  apiKey: config.mailgunAPIKey,
  domain: config.domain
});

// Create and export function to send emails through Mailgun API
exports.sendEmail = function (recipient, message) {
  const data = {
    from: 'CCRN Accounts <accounts@coloradocommunityradio.com>',
    to: recipient,
    subject: message.subject,
    text: message.text,
    html: message.html
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) { console.log(error); }
    else console.log(body);
  });
};
