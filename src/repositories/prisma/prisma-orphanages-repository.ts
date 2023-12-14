import { prisma } from '@/lib/prisma'
import {
  ILocation,
  IOrphanage,
  OrphanagesRepository,
} from '../orphanages-repository'

export class PrismaOrphanagesRepository implements OrphanagesRepository {
  async findByLocation(data: ILocation) {
    const orphanage = await prisma.orphanage.findFirst({
      where: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })

    return orphanage
  }

  async findById(id: string) {
    const orphanage = await prisma.orphanage.findUnique({
      where: {
        id,
      },
    })

    return orphanage
  }

  async findMany() {
    const orphanages = await prisma.orphanage.findMany()

    return orphanages
  }

  async create(data: IOrphanage) {
    const {
      name,
      description,
      phone,
      latitude,
      longitude,
      visiting_instructions,
      visiting_hours,
      photos = [],
    } = data

    const orphanage = await prisma.orphanage.create({
      data: {
        name,
        description,
        phone,
        latitude,
        longitude,
        visiting_instructions,
        visiting_hours,
        photos: {
          create: [...photos],
        },
      },
    })

    return orphanage
  }
}
