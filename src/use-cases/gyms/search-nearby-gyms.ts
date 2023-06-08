import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface ISearchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface ISearchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: ISearchNearbyGymsUseCaseRequest): Promise<ISearchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
