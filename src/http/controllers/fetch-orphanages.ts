import { makeFetchOrphanagesUseCase } from '@/use-cases/factories/make-fetch-orphanages-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchOrganages(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchOrganagesUseCase = makeFetchOrphanagesUseCase()

  const { orphanages } = await fetchOrganagesUseCase.execute()

  return reply.status(200).send({
    orphanages,
  })
}
