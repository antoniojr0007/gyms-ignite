export class GymAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists')
  }
}
