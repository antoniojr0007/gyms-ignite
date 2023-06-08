import { app } from './app'
import { env } from './env'

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    console.log(
      `🚀HTTP Server Running! no Host ${env.HOST} na Port ${env.PORT}`,
    )
  })
