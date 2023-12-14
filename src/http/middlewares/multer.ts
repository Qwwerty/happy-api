import multer from 'fastify-multer'
import { randomUUID } from 'node:crypto'

export default {
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const fileName = randomUUID()

      cb(null, fileName)
    },
  }),
}
