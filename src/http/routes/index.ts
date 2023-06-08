import { FastifyInstance } from 'fastify'
import { checkInsRoutes } from '../controllers/check-ins/routes'
import { gymsRoutes } from '../controllers/gyms/routes'
import { usersRoutes } from '../controllers/users/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(gymsRoutes)
  app.register(checkInsRoutes)
}
