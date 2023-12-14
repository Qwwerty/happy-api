import fastify from 'fastify'
import fastifyMulter from 'fastify-multer'

import { orphanagesRoutes } from './http/controllers/routes'

export const app = fastify()

app.register(fastifyMulter.contentParser)

app.register(orphanagesRoutes)
