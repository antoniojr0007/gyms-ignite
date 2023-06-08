import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { MetricsUsersCheckInsUseCase } from '@/use-cases/check-ins/metrics-users-check-ins'

export function MakeMetricsUsersCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new MetricsUsersCheckInsUseCase(checkInsRepository)

  return useCase
}
