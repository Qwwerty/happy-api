import { PrismaOrphanagesRepository } from '@/repositories/prisma/prisma-orphanages-repository'
import { CreateOrphanageUseCase } from '../create-orphanage'

export function makeCreateOrphanageUseCase() {
  const orphanagesRepository = new PrismaOrphanagesRepository()
  const useCase = new CreateOrphanageUseCase(orphanagesRepository)

  return useCase
}
