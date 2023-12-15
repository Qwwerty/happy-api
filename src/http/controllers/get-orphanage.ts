import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetOrphanageUseCase } from '@/use-cases/factories/make-get-orphanage-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOrphanage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOrphanageParamsSchema = z.object({
    orphanageId: z.string(),
  })

  const { orphanageId } = getOrphanageParamsSchema.parse(request.params)

  try {
    const getOrphanageUseCase = makeGetOrphanageUseCase()

    const { orphanage } = await getOrphanageUseCase.execute({ orphanageId })

    return reply.status(200).send({
      orphanage,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
