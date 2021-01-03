'use strict';

// 
// environment variables
require('dotenv').config();

// 
// dependencies
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'sa-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

//
//  promisify
const { promisify } = require('util');

class SQSClass {
  constructor() {
    this.sqs      = new AWS.SQS({ apiVersion: process.env.AWS_API_VERSION });
    this.QueueUrl = process.env.AWS_SQS_QUEUE_URL;
  };

  async promiseFunction(nameOfFunction) {
    const newPromiseFunction = await promisify(nameOfFunction).bind(this.sqs);
    return newPromiseFunction;
  };

  async receiveMessage() {
    const receiveMessageAsync = await this.promiseFunction(this.sqs.receiveMessage);
    if (receiveMessageAsync) {

      var params = {
        AttributeNames: [
           "SentTimestamp"
        ],
        MaxNumberOfMessages: 5,
        MessageAttributeNames: [  
          "productId",
          "saleId"
        ],
        QueueUrl: this.QueueUrl,
        VisibilityTimeout: 5,
        WaitTimeSeconds: 15
      };

      const result = await receiveMessageAsync(params);
      return result.Messages || false;
    }
  }

  async deleteMessage(message) {
    const deleteMessageSsync = await this.promiseFunction(this.sqs.deleteMessage);

    if (deleteMessageSsync) {
      var deleteParams = {
        QueueUrl      : this.QueueUrl,
        ReceiptHandle : message.ReceiptHandle
      };

      return await deleteMessageSsync(deleteParams);
    }
  }
}

module.exports = new SQSClass();