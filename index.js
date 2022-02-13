const cron = require('node-cron');

const config = require('./config');
const accountSid = config.ACCOUNT_SID;
const authToken = config.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const messages = require('./messages');

var currentmessage = 0;

function SendMessage() {
    client.messages
        .create({
            body: messages[currentmessage],
            from: '+18455522027',
            to: config.PHONE_NR
        })
        .then(message => {
            currentmessage++;
        });
}
cron.schedule('* * * * * ', () => {
    console.log('message sent');
    SendMessage();
});