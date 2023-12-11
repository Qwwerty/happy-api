import type { OrphanagesRepository } from '@/repositories/orphanages-repository'
import { Orphanage } from '@prisma/client'

interface Photo {
  name: string
  url: string
}

interface CreateOrphanageUseCaseRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
  visitingInstructions: string
  visitingHours: string
  areOpenOnTheWeekend: boolean
  photos: Photo[]
}

interface CreateOrphanageUseCaseResponse {
  orphanage: Orphanage
}

export class CreateOrphanageUseCase {
  constructor(private orphanagesRepository: OrphanagesRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
    visitingInstructions,
    visitingHours,
    areOpenOnTheWeekend,
    photos,
  }: CreateOrphanageUseCaseRequest): Promise<CreateOrphanageUseCaseResponse> {
    const orphanage = await this.orphanagesRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
      visiting_instructions: visitingInstructions,
      visiting_hours: visitingHours,
      are_open_on_the_weekend: areOpenOnTheWeekend,
      photos,
    })

    return {
      orphanage,
    }
  }
}
