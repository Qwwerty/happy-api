import { InMemoryOrphanagesRepository } from '@/repositories/in-memory/in-memory-orphanages-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrphanageUseCase } from './create-orphanage'

let orphanagesRepository: InMemoryOrphanagesRepository
let sut: CreateOrphanageUseCase

describe('Create Orphanage Use Case', () => {
  beforeEach(() => {
    orphanagesRepository = new InMemoryOrphanagesRepository()
    sut = new CreateOrphanageUseCase(orphanagesRepository)
  })

  it('should be able to create a orphanage', async () => {
    const { orphanage } = await sut.execute({
      name: 'Orf. Esperança',
      description:
        'Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.',
      phone: '(47) 9 9293 1142',
      visitingInstructions:
        'Venha como se sentir a vontade e traga muito amor e paciência para dar.',
      visitingHours: 'Das 8h até 18h',
      areOpenOnTheWeekend: true,
      latitude: -21.1194368,
      longitude: -42.9359104,
      photos: [{ name: 'image-test', url: 'url-test' }],
    })

    expect(orphanage.id).toEqual(expect.any(String))
  })
})
