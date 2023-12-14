import { env } from '@/env'
import { S3 } from '@aws-sdk/client-s3'
import sharp from 'sharp'

interface IFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

const s3 = new S3({
  region: env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: env.AWS_ACESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
})

export async function uploadFileS3(file: IFile) {
  try {
    const optimized = await sharp(file.path)
      .resize(1280, 720, { fit: 'inside', withoutEnlargement: true })
      .toFormat('jpeg', { progressive: true, quality: 50 })
      .toBuffer()

    const uploadParams = {
      Body: optimized,
      Bucket: env.AWS_BUCKET_NAME,
      Key: file.filename,
      ContentType: 'image/jpeg',
    }

    await s3.putObject(uploadParams)

    return {
      name: file.filename,
      url: `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`,
    }
  } catch (error) {
    throw new Error('Unable to sabe orphanage images')
  }
}
