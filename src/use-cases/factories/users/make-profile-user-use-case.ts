import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ProfileUseCase } from '@/use-cases/users/profile'

export function MakeProfileUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new ProfileUseCase(prismaUserRepository)

  return useCase
}
