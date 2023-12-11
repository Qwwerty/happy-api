import type {
  IOrphanage,
  OrphanagesRepository,
} from '@/repositories/orphanages-repository'

interface FetchOrphanagesUseCaseResponse {
  orphanages: IOrphanage[]
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
