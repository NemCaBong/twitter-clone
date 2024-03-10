import { S3 } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import { Upload } from '@aws-sdk/lib-storage'
import path from 'path'

import fs from 'fs'

config()
export const uploadFileToS3 = ({
  fileName,
  filePath,
  contentType
}: {
  fileName: string
  filePath: string
  contentType: string
}) => {
  // kết nối với s3
  const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
    }
  })

  const parallelUploads3 = new Upload({
    client: s3,
    // key là tên file sẽ đổi khi upload lên s3
    // body là cái file đó, chúng ta gửi dưới dạng buffer
    params: {
      Bucket: 'twitter-clone-ap-southeast-1-duthanhduoc',
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
