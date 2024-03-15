import { S3 } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import { Upload } from '@aws-sdk/lib-storage'
import fs from 'fs'
import HTTP_STATUS from '~/constants/httpStatus'
import { Response } from 'express'

config()

// kết nối với s3
const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
  }
})

export const uploadFileToS3 = ({
  fileName,
  filePath,
  contentType
}: {
  fileName: string
  filePath: string
  contentType: string
}) => {
  const parallelUploads3 = new Upload({
    client: s3,
    // key là tên file sẽ đổi khi upload lên s3
    // body là cái file đó, chúng ta gửi dưới dạng buffer
    params: {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: fileName,
      Body: fs.readFileSync(filePath),
      ContentType: contentType
    },
    tags: [
      /*...*/
    ], // optional tags
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false // optional manually handle dropped parts
  })

  return parallelUploads3.done()
}

export const sendFileFromS3 = async (res: Response, filePath: string) => {
  // lấy file từ trong s3 ra và dùng server của mình để bắt nó truy cập qua
  // server mình như 1 proxy.
  try {
    const data = await s3.getObject({
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: filePath
    })
    ;(data.Body as any).pipe(res)
  } catch (err) {
    console.log(err)
    res.status(HTTP_STATUS.NOT_FOUND).send('Not found')
  }
}
