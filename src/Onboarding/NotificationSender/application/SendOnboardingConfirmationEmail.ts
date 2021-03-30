import { NotificationSender } from '@onboarding/NotificationSender/domain/NotificationSender'
import { OnboardingConfirmationEmail } from '@onboarding/NotificationSender/domain/OnboardingConfirmationEmail'
import { EmailAddress } from '@onboarding/NotificationSender/domain/EmailAddress'
import { OnboardingConfirmationEmailError } from '@onboarding/NotificationSender/domain/OnboardingConfirmationEmailError'

export default class SendOnboardingConfirmationEmail {
  constructor(private notificationSender: NotificationSender) {}

  async run(userEmailAddress: EmailAddress): Promise<void> {
    const onboardingConfirmationEmail = new OnboardingConfirmationEmail(userEmailAddress)
    try {
      await this.notificationSender.sendEmail(onboardingConfirmationEmail)
    } catch (error) {
      throw new OnboardingConfirmationEmailError(userEmailAddress)
    }
  }
}
