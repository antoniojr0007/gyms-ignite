import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '@/use-cases/users/register'

export function makeRegisterUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(prismaUserRepository)

  return useCase
}
