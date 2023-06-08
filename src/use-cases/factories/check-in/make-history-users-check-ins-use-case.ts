import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { HistoryUsersCheckInsUseCase } from '@/use-cases/check-ins/history-users-check-ins'

export function MakeHistoryUsersCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new HistoryUsersCheckInsUseCase(checkInsRepository)

  return useCase
}
