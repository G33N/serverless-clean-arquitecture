import { ClientId } from '@onboarding/Client/domain/ClientId'
import { Nullable } from '@shared/domain/Nullable'
import { OnboardingStatus } from './OnboardingStatus'

export interface OnboardingStatusRepository {
  search(clientId: ClientId): Promise<Nullable<OnboardingStatus>>
  save(onboardingStatus: OnboardingStatus): Promise<void>
}
