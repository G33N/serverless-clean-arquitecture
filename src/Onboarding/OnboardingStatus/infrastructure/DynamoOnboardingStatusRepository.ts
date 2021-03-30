import { Nullable } from '@shared/domain/Nullable'
import { ClientId } from '@onboarding/Client/domain/ClientId'
import { OnboardingStatus } from '@onboarding/OnboardingStatus/domain/OnboardingStatus'
import { OnboardingStatusRepository } from '@onboarding/OnboardingStatus/domain/OnboardingStatusRepository'
import { OnboardingStatusModel } from '@onboarding/OnboardingStatus/infrastructure/OnboardingStatusModel'

export class DynamoOnboardingStatusRepository implements OnboardingStatusRepository {
  public async save(onboardingStatus: OnboardingStatus): Promise<void> {
    const model = new OnboardingStatusModel(onboardingStatus.toPrimitives())
    try {
      await model.save()
      console.log('Save operation was successful.')
    } catch (error) {
      console.error(error)
    }
  }

  public async search(clientId: ClientId): Promise<Nullable<OnboardingStatus>> {
    const document = await OnboardingStatusModel.get(clientId.value)

    return document
      ? OnboardingStatus.fromPrimitives({ ...document, clientId: clientId.value })
      : null
  }

  protected moduleName(): string {
    return 'onboardingStatus'
  }
}
