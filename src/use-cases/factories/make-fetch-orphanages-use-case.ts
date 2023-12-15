import { PrismaOrphanagesRepository } from '@/repositories/prisma/prisma-orphanages-repository'
import { FetchOrphanagesUseCase } from '../fetch-orphanages'

export function makeFetchOrphanagesUseCase() {
  const orphanagesRepository = new PrismaOrphanagesRepository()
  const useCase = new FetchOrphanagesUseCase(orphanagesRepository)

  return useCase
}
