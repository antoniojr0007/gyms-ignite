import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchNearbyGymsUseCase } from '@/use-cases/gyms/search-nearby-gyms'

export function makeSearchNearbyGymsUseCase() {
  const prismaGymRepository = new PrismaGymsRepository()
  const useCase = new SearchNearbyGymsUseCase(prismaGymRepository)

  return useCase
}
