import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GymAlreadyExistsError } from '../errors/gym-already-exists-error'
import { RegisterGymUseCase } from './register'

let gymsRepository: InMemoryGymsRepository
let sut: RegisterGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new RegisterGymUseCase(gymsRepository)
  })

  it('should be able to Gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-01 test',
      description: null,
      phone: null,
      email: 'gym-01@test.com',
      latitude: -23.6130218,
      longitude: -46.5287526,
    })

    expect(gym.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'gym-01@test.com'

    await sut.execute({
      title: 'gym-01 test',
      description: null,
      phone: null,
      email,
      latitude: -23.6130218,
      longitude: -46.5287526,
    })

    await expect(() =>
      sut.execute({
        title: 'gym-01 test',
        description: null,
        phone: null,
        email,
        latitude: -23.6130218,
        longitude: -46.5287526,
      }),
    ).rejects.toBeInstanceOf(GymAlreadyExistsError)
  })
})
