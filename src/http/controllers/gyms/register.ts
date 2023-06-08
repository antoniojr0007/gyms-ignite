import { GymAlreadyExistsError } from '@/use-cases/errors/gym-already-exists-error'
import { makeRegisterGymUseCase } from '@/use-cases/factories/gyms/make-register-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerGymBobySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    email: z.string().email(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { title, description, phone, email, latitude, longitude } =
    registerGymBobySchema.parse(request.body)

  try {
    const registerUserUseCase = makeRegisterGymUseCase()

    await registerUserUseCase.execute({
      title,
      description,
      phone,
      email,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof GymAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
