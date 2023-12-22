export class OrphanageAlreadyExistsError extends Error {
  constructor() {
    super('Orphanage already exists.')
  }
}
