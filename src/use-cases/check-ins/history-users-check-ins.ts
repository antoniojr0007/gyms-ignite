import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface IHistoryUsersCheckInsUseCaseRequest {
  userId: string
  page: number
}

interface IHistoryUsersCheckInsUseCaseResponse {
  checkIns: CheckIn[]
}

export class HistoryUsersCheckInsUseCase {
  constructor(private CheckInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IHistoryUsersCheckInsUseCaseRequest): Promise<IHistoryUsersCheckInsUseCaseResponse> {
    const checkIns = await this.CheckInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
