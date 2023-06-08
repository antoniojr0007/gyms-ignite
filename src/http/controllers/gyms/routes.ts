import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { VerifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { nearby } from './nearby'
import { register } from './register'
import { search } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)

  app.post('/gyms/register', { onRequest: [VerifyUserRole('ADMIN')] }, register)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
