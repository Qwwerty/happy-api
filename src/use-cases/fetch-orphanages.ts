import type { OrphanagesRepository } from '@/repositories/orphanages-repository'
import { Orphanage } from '@prisma/client'

interface FetchOrphanagesUseCaseResponse {
  orphanages: Orphanage[]
}

export class FetchOrphanagesUseCase {
  constructor(private orphanagesRepository: OrphanagesRepository) {}

  async execute(): Promise<FetchOrphanagesUseCaseResponse> {
    const orphanages = await this.orphanagesRepository.findMany()

    return {
      orphanages,
    }
  }
}
