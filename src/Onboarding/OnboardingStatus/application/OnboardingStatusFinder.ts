import { ClientId } from '@onboarding/Client/domain/ClientId'
import { OnboardingStatusRepository } from '../domain/OnboardingStatusRepository'
import { OnboardingStatusNotExist } from '../domain/OnboardingStatusNotExist'

type Params = {
  clientId: ClientId
}

export class OnboardingStatusFinder {
  constructor(private repository: OnboardingStatusRepository) {}

  async run({ clientId }: Params) {
    const onboardingStatus = await this.repository.search(clientId)

    if (!onboardingStatus) {
      throw new OnboardingStatusNotExist()
    }

    return onboardingStatus
  }
}
