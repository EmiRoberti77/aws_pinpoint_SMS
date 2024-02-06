const {
  PinpointClient,
  SendMessagesCommand,
} = require('@aws-sdk/client-pinpoint');

const region = 'us-east-1';
const pinpointClient = new PinpointClient({ region });
const applicationId = '053238da52ff47dda1173fb341199e5c';
const destinationNumber = '<replace number>';
const message = 'EasyJet flight delays alert';

async function sendSMS() {
  const params = {
    ApplicationId: applicationId,
    MessageRequest: {
      Addresses: {
        [destinationNumber]: {
          ChannelType: 'SMS',
        },
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: message,
          MessageType: 'PROMOTIONAL', // Or "PROMOTIONAL"
          // SenderId: 'EMIEASYJET',
        },
      },
    },
  };

  try {
    const response = await pinpointClient.send(new SendMessagesCommand(params));
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err.message);
  }
}

sendSMS();
