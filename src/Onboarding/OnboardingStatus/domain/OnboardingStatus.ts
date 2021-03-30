import { ClientId } from '@onboarding/Client/domain/ClientId'

export class OnboardingStatus {
  readonly clientId: ClientId

  readonly notificationsSended: number

  readonly lastNotification: string

  readonly status: string

  constructor(
    clientId: ClientId,
    notificationsSended: number,
    lastNotification: string,
    status: string
  ) {
    this.clientId = clientId
    this.notificationsSended = notificationsSended
    this.lastNotification = lastNotification
    this.status = status
  }

  static create(
    clientId: ClientId,
    notificationsSended: number,
    lastNotification: string,
    status: string
  ): OnboardingStatus {
    const onboardingStatus = new OnboardingStatus(
      clientId,
      notificationsSended,
      lastNotification,
      status
    )

    return onboardingStatus
  }

  static fromPrimitives(plainData: {
    clientId: string
    notificationsSended: number
    lastNotification: string
    status: string
  }): OnboardingStatus {
    return new OnboardingStatus(
      new ClientId(plainData.clientId),
      plainData.notificationsSended,
      plainData.lastNotification,
      plainData.status
    )
  }

  toPrimitives() {
    return {
      clientId: this.clientId.value,
      notificationsSended: this.notificationsSended,
      lastNotification: this.lastNotification,
      status: this.status
    }
  }
}
