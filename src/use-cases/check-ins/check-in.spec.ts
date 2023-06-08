import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsErrors } from '../errors/max-number-of-check-ins-error'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'gym test',
      description: '',
      phone: '',
      email: 'gym-01@test.com',
      latitude: -23.6152952,
      longitude: -46.5258909,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      userId: randomUUID(),
      gymId: 'gym-01',
      userLatitude: -23.6152952,
      userLongitude: -46.5258909,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 21, 8, 0, 0))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.6152952,
      userLongitude: -46.5258909,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -23.6152952,
        userLongitude: -46.5258909,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsErrors)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 20, 8, 0, 0))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.6152952,
      userLongitude: -46.5258909,
    })

    vi.setSystemTime(new Date(2023, 3, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.6152952,
      userLongitude: -46.5258909,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'gym-02 test',
      description: '',
      phone: '',
      email: '',
      latitude: new Decimal(-23.6130218),
      longitude: new Decimal(-46.5287526),
      created_at: new Date(),
    })

    await expect(() =>
      sut.execute({
        userId: randomUUID(),
        gymId: 'gym-01',
        userLatitude: -23.564901,
        userLongitude: -46.506204,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
