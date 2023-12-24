import { uploadFileS3 } from '@/lib/s3'
import { OrphanageAlreadyExistsError } from '@/use-cases/errors/orphanage-already-exists-error'
import { makeCreateOrphanageUseCase } from '@/use-cases/factories/make-create-orphanage-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface IPhoto {
  name: string
  url: string
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrphanageSchema = z.object({
    name: z.string().min(3, 'Minimum 3 characters.'),
    description: z.string().min(20, 'Minimum 20 characters.'),
    phone: z
      .string()
      .min(16, 'Invalid phone.')
      .transform((value) => value.replace(/[()\s-_]/g, '').trim()),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    visitingInstructions: z.string().min(10, 'Minimum 10 characters.'),
    visitingHours: z.string().min(1, 'Minimum 1 characters.'),
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

  try {
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
  } catch (error) {
    if (error instanceof OrphanageAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
