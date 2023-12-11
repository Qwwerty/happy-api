import { Orphanage } from '@prisma/client'
import { Decimal, DecimalJsLike } from '@prisma/client/runtime/library'

export interface IPhoto {
  name: string
  url: string
}

export interface IOrphanage {
  id?: string
  name: string
  description?: string | null
  phone?: string | null
  latitude: Decimal | DecimalJsLike | number | string
  longitude: Decimal | DecimalJsLike | number | string
  visiting_instructions?: string | null
  visiting_hours?: string | null
  are_open_on_the_weekend?: boolean
  created_at?: Date | string
  photos: IPhoto[]
}

export interface OrphanagesRepository {
  create(data: IOrphanage): Promise<Orphanage>
}
