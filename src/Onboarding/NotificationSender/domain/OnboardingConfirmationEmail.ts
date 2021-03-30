import { Email } from './Email'
import { EmailAddress } from './EmailAddress'

export class OnboardingConfirmationEmail extends Email {
  constructor(to: EmailAddress) {
    super({
      from: new EmailAddress('omni@omni.com'),
      to,
      subject: 'Comfirmation',
      body: 'Email to confirmate onboargin process'
    })
  }
}
