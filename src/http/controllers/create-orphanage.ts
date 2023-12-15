import { uploadFileS3 } from '@/lib/s3'
import { makeCreateOrphanageUseCase } from '@/use-cases/factories/make-create-orphanage-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface IPhoto {
  name: string
  url: string
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrphanageSchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    visitingInstructions: z.string(),
    visitingHours: z.string(),
    areOpenOnTheWeekend: z.coerce.boolean(),
  })

  const {
    name,
    description,
    phone,
    latitude,
    longitude,
    visitingInstructions,
    visitingHours,
    areOpenOnTheWeekend,
  } = createOrphanageSchema.parse(request.body)

  const createOrphanageImagesSchema = z.array(
    z.object({
      mimetype: z.enum(['image/png', 'image/jpg', 'image/jpeg']),
    }),
  )

  createOrphanageImagesSchema.parse(request.files)

  const filesPromises = []
  let photos = [] as Array<IPhoto>

  if (request.files.length) {
    for (const file of request.files) {
      filesPromises.push(uploadFileS3(file))
    }

    photos = await Promise.all(filesPromises)
  }

  const createOrphanageUseCase = makeCreateOrphanageUseCase()

  await createOrphanageUseCase.execute({
    name,
    description,
    phone,
    latitude,
    longitude,
    visitingInstructions,
    visitingHours,
    areOpenOnTheWeekend,
    photos,
  })

  return reply.status(201).send()
}
