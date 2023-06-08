import { MakeMetricsUsersCheckInsUseCase } from '@/use-cases/factories/check-in/make-metrics-users-check-ins-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsUserUseCase = MakeMetricsUsersCheckInsUseCase()

  const { checkInsCount } = await metricsUserUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
