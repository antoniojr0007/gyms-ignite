import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface IMetricsUsersCheckInsUseCaseRequest {
  userId: string
}

interface IMetricsUsersCheckInsUseCaseResponse {
  checkInsCount: number
}

export class MetricsUsersCheckInsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: IMetricsUsersCheckInsUseCaseRequest): Promise<IMetricsUsersCheckInsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
