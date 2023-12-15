import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import uploadConfig from '../middlewares/multer'

import { create } from './create-orphanage'
import { fetchOrganages } from './fetch-orphanages'
import { getOrphanage } from './get-orphanage'

const upload = multer(uploadConfig)

export async function orphanagesRoutes(app: FastifyInstance) {
  app.get('/orphanages', fetchOrganages)
  app.get('/orphanages/:orphanageId', getOrphanage)
  app.post('/orphanages', { preHandler: upload.array('images') }, create)
}
