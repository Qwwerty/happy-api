import { Orphanage } from '@prisma/client'

export interface ILocation {
  latitude: number
  longitude: number
}

export interface IPhoto {
  name: string
  url: string
}

export interface IOrphanage {
  id?: string
  name: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
  visiting_instructions?: string | null
  visiting_hours?: string | null
  are_open_on_the_weekend?: boolean
  created_at?: Date | string
  photos?: IPhoto[]
}

export interface OrphanagesRepository {
  findByLocation(data: ILocation): Promise<Orphanage | null>
  findById(id: string): Promise<Orphanage | null>
  findMany(): Promise<Orphanage[]>
  create(data: IOrphanage): Promise<Orphanage>
}
