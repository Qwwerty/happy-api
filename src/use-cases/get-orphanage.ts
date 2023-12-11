import type { OrphanagesRepository } from '@/repositories/orphanages-repository'
import { Orphanage } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetOrphanageUseCaseRequest {
  orphanageId: string
}

interface GetOrphanageUseCaseResponse {
  orphanage: Orphanage
}

export class GetOrphanageUseCase {
  constructor(private orphanagesRepository: OrphanagesRepository) {}

  async execute({
    orphanageId,
  }: GetOrphanageUseCaseRequest): Promise<GetOrphanageUseCaseResponse> {
    const orphanage = await this.orphanagesRepository.findById(orphanageId)

    if (!orphanage) {
      throw new ResourceNotFoundError()
    }

    return {
      orphanage,
    }
  }
}
