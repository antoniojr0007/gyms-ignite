import { MakeHistoryUsersCheckInsUseCase } from '@/use-cases/factories/check-in/make-history-users-check-ins-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = historyCheckInsQuerySchema.parse(request.query)

  const historyUserUseCase = MakeHistoryUsersCheckInsUseCase()

  const { checkIns } = await historyUserUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
