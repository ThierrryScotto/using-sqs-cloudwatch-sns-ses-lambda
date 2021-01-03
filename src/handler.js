'use strict';

// sqs 
const sqs = require('./services/sqs');

// model
const Message = require('./models/message')

module.exports.sendEmail = async (event) => {

  const messages = await sqs.receiveMessage();

  if (messages.length > 0) {
    for await(let message of messages) {
      await Message.create({ messageId: message.MessageId, messageBody: message.Body});
      await sqs.deleteMessage(message);
    }
  } else {
    return { statusCode: 200, body: JSON.stringify({ message: 'No message', }, null, 2),
    };
  }

  return { statusCode: 201, body: JSON.stringify({ message: 'messages saved', }, null, 2), };
};
