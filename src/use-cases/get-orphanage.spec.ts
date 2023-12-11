import { InMemoryOrphanagesRepository } from '@/repositories/in-memory/in-memory-orphanages-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetOrphanageUseCase } from './get-orphanage'

let orphanagesRepository: InMemoryOrphanagesRepository
let sut: GetOrphanageUseCase

describe('Get Orphanage Use Case', () => {
  beforeEach(() => {
    orphanagesRepository = new InMemoryOrphanagesRepository()
    sut = new GetOrphanageUseCase(orphanagesRepository)
  })

  it('should be able to get orphanage', async () => {
    const newOrphanage = await orphanagesRepository.create({
      name: 'Orf. Esperança',
      description:
        'Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.',
      phone: '(47) 9 9293 1142',
      visiting_instructions:
        'Venha como se sentir a vontade e traga muito amor e paciência para dar.',
      visiting_hours: 'Das 8h até 18h',
      are_open_on_the_weekend: true,
      latitude: -21.1194368,
      longitude: -42.9359104,
      photos: [{ name: 'image-test', url: 'url-test' }],
    })

    const { orphanage } = await sut.execute({ orphanageId: newOrphanage.id })

    expect(orphanage).toEqual(
      expect.objectContaining({
        id: newOrphanage.id,
        name: 'Orf. Esperança',
      }),
    )
  })

  it('should be not able to get orphanage with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orphanageId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
