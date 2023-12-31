import fastify from 'fastify'
import fastifyMulter from 'fastify-multer'
import fastifyCors from '@fastify/cors'

import { ZodError } from 'zod'
import { env } from './env'
import { orphanagesRoutes } from './http/controllers/routes'

export const app = fastify()

app.register(fastifyMulter.contentParser)
app.register(fastifyCors)

app.register(orphanagesRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
