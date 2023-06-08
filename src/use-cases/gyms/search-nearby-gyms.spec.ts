import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchNearbyGymsUseCase } from './search-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchNearbyGymsUseCase

describe('Search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      email: 'near@gym.com',
      latitude: -23.6130218,
      longitude: -46.5287526,
    })

    await gymsRepository.create({
      title: 'for Gym',
      description: null,
      phone: null,
      email: 'for@gym.com',
      latitude: -20.9315472,
      longitude: -46.9903677,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.6130218,
      userLongitude: -46.5287526,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
