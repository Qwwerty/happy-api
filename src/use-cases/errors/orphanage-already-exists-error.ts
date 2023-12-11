export class OrphanageAlreadyExistsError extends Error {
  constructor() {
    super('Resource not found.')
  }
}
