import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const Response = await request(app.server)
      .post('/gyms/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-01',
        description: 'Gym 01',
        phone: '99999999999',
        email: 'gym-01@gyms.com',
        latitude: -23.6130218,
        longitude: -46.5287526,
      })

    expect(Response.statusCode).toEqual(201)
  })
})
