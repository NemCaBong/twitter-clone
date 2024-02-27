/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { SendEmailCommand, SESClient } = require('@aws-sdk/client-ses')
const { config } = require('dotenv')

config()

// Create SES service object.
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
  }
})

// tạo ra một command để gửi email
const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body,
  subject,
  replyToAddresses = []
}) => {
  return new SendEmailCommand({
    // gửi từ đâu và tới đâu
    Destination: {
      /* required */
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses]
    },
    Message: {
      /* required */
      // phần thân email
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      // tieu de email
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    // nguồn gửi
    Source: fromAddress,
    ReplyToAddresses: replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses]
  })
}

// send tới ai nội dung là gì, tiêu đề là gì
const sendVerifyEmail = async (toAddress, subject, body) => {
  const sendEmailCommand = createSendEmailCommand({
    fromAddress: process.env.SES_FROM_ADDRESS,
    toAddresses: toAddress,
    body,
    subject
  })

  try {
    return await sesClient.send(sendEmailCommand)
  } catch (e) {
    console.error('Failed to send email.')
    return e
  }
}

sendVerifyEmail(
  'hoagback250407@gmail.com',
  'Tiêu đề email',
  '<h1>Nội dung email được gửi từ nemcabong@gmail.com ngày 27</h1>'
)
