import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { LataCheckInValidationError } from '../errors/late-checki-in-validation-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface IValidateCheckInUseCaseRequest {
  checkInId: string
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private CheckInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.CheckInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }
    const distanceImMinutesFromCheckInCreated = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceImMinutesFromCheckInCreated > 20) {
      throw new LataCheckInValidationError()
    }
    checkIn.validated_At = new Date()

    await this.CheckInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
