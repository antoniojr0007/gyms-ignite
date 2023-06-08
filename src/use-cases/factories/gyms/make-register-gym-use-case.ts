import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { RegisterGymUseCase } from '@/use-cases/gyms/register'

export function makeRegisterGymUseCase() {
  const prismaGymRepository = new PrismaGymsRepository()
  const useCase = new RegisterGymUseCase(prismaGymRepository)

  return useCase
}
