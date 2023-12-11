import { Prisma } from '@prisma/client'
import crypto from 'node:crypto'
import type { IOrphanage, OrphanagesRepository } from '../orphanages-repository'

export class InMemoryOrphanagesRepository implements OrphanagesRepository {
  public items: IOrphanage[] = []

  async create(data: IOrphanage) {
    const orphanage = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      visiting_instructions: data.visiting_instructions ?? null,
      visiting_hours: data.visiting_hours ?? null,
      are_open_on_the_weekend: data.are_open_on_the_weekend ?? false,
      photos: data.photos,
      created_at: new Date(),
    }

    this.items.push(orphanage)

    return orphanage
  }
}
