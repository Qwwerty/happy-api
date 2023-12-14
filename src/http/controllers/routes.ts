import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import uploadConfig from '../middlewares/multer'

import { create } from './create-orphanage'

const upload = multer(uploadConfig)

export async function orphanagesRoutes(app: FastifyInstance) {
  app.post('/orphanages', { preHandler: upload.array('images') }, create)
}
