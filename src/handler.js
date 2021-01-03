'use strict';

// sqs 
const sqs = require('./services/sqs');

// model
const Message = require('./models/message')

module.exports.sendEmail = async (event) => {

  const messages = await sqs.receiveMessage();

  for await(let message of messages) {
    await Message.create({ messageId: message.MessageId, messageBody: message.Body});
    await sqs.deleteMessage(message);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: 'messages saved',
      },
      null,
      2
    ),
  };
};
