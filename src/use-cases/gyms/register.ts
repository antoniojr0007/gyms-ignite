import { GymsRepository } from '@/repositories/gyms-repository'
import { GymAlreadyExistsError } from '@/use-cases/errors/gym-already-exists-error'
import { Gym } from '@prisma/client'

interface IGymRegisterUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  email: string
  latitude: number
  longitude: number
}

interface IGymRegisterUseCaseResponse {
  gym: Gym
}

export class RegisterGymUseCase {
  constructor(private GymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    email,
    latitude,
    longitude,
  }: IGymRegisterUseCaseRequest): Promise<IGymRegisterUseCaseResponse> {
    const GymWithSameEmail = await this.GymsRepository.findByEmail(email)

    if (GymWithSameEmail) {
      throw new GymAlreadyExistsError()
    }

    const gym = await this.GymsRepository.create({
      title,
      description,
      phone,
      email,
      latitude,
      longitude,
    })

    return { gym }
  }
}
