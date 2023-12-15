import { PrismaOrphanagesRepository } from '@/repositories/prisma/prisma-orphanages-repository'
import { GetOrphanageUseCase } from '../get-orphanage'

export function makeGetOrphanageUseCase() {
  const orphanagesRepository = new PrismaOrphanagesRepository()
  const useCase = new GetOrphanageUseCase(orphanagesRepository)

  return useCase
}
