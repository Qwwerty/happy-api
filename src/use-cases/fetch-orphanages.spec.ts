import { InMemoryOrphanagesRepository } from '@/repositories/in-memory/in-memory-orphanages-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchOrphanagesUseCase } from './fetch-orphanages'

let orphanagesRepository: InMemoryOrphanagesRepository
let sut: FetchOrphanagesUseCase

describe('Fetch Orphanages Use Case', () => {
  beforeEach(() => {
    orphanagesRepository = new InMemoryOrphanagesRepository()
    sut = new FetchOrphanagesUseCase(orphanagesRepository)
  })

  it('should be able to fetch orphanages', async () => {
    await orphanagesRepository.create({
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

    const { orphanages } = await sut.execute()

    expect(orphanages).toHaveLength(1)
    expect(orphanages).toEqual([
      expect.objectContaining({ name: 'Orf. Esperança' }),
    ])
  })
})
