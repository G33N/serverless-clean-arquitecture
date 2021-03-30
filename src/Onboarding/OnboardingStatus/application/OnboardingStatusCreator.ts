import { ClientId } from '@onboarding/Client/domain/ClientId'
import { OnboardingStatusRepository } from '../domain/OnboardingStatusRepository'
import { OnboardingStatus } from '../domain/OnboardingStatus'

type Params = {
  clientId: ClientId
  notificationsSended: number
  lastNotification: string
  status: string
}

export class OnboardingStatusCreator {
  constructor(private repository: OnboardingStatusRepository) {}

  async run({ clientId, notificationsSended, lastNotification, status }: Params): Promise<void> {
    const onboardingStatus = OnboardingStatus.create(
      clientId,
      notificationsSended,
      lastNotification,
      status
    )

    this.repository.save(onboardingStatus)
  }
}
