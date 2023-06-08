import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '@/use-cases/gyms/search-gyms'

export function makeSearchGymsUseCase() {
  const prismaGymRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(prismaGymRepository)

  return useCase
}
