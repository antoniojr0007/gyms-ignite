import { makeSearchGymsUseCase } from '@/use-cases/factories/gyms/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBobySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { q, page } = searchGymBobySchema.parse(request.query)

  const searchUserUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchUserUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
