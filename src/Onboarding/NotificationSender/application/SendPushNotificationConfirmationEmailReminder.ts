import { NotificationSender } from '@onboarding/NotificationSender/domain/NotificationSender'
import { PushNotificationConfirmationEmailReminder } from '@onboarding/NotificationSender/domain/PushNotificationConfirmationEmailReminder'
import { PushNotificationConfirmationEmailRemainderError } from '@onboarding/NotificationSender/domain/PushNotificationConfirmationEmailRemainderError'
// import { OnboardingStatusRepository } from '@onboarding/OnboardingStatus/infrastructure/OnboardingStatusRepository'

export default class SendPushNotificationConfirmationEmailReminder {
  constructor(
    private notificationSender: NotificationSender // private repository: OnboardingStatusRepository
  ) {}

  async run(token: string): Promise<void> {
    // const client = (await)
    // const onboardingStatus =

    const onboardingConfirmationEmailRemainder = new PushNotificationConfirmationEmailReminder(
      token
    )

    try {
      await this.notificationSender.sendPush(onboardingConfirmationEmailRemainder)
    } catch (error) {
      throw new PushNotificationConfirmationEmailRemainderError(token)
    }
  }
}
