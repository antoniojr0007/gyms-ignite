export class LataCheckInValidationError extends Error {
  constructor() {
    super('the check-in can only be validated util 20 minutes of the creation.')
  }
}
