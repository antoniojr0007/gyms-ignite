import { MakeValidateCheckInUseCase } from '@/use-cases/factories/check-in/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })
  const { checkInId } = createCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = MakeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
