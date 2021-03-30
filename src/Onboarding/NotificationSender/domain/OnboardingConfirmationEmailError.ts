import { EmailAddress } from './EmailAddress'

export class OnboardingConfirmationEmailError extends Error {
  constructor(userEmailAddress: EmailAddress) {
    super(`Error sending confirmation email to ${userEmailAddress.value}`)
  }
}
