import { Uuid } from '@shared/domain/value-object/Uuid'
import { PushNotificationId } from './PushNotificationId'

type ConstructorParams = {
  id?: PushNotificationId
  title: string
  body: string
  token: string
}

export class PushNotification {
  readonly id: PushNotificationId

  readonly title: string

  readonly body: string

  readonly token: string

  constructor(params: ConstructorParams) {
    this.id = params.id || new PushNotificationId(Uuid.random().value)
    this.title = params.title
    this.body = params.body
    this.token = params.token
  }

  equals(otherPushNotification: PushNotification): boolean {
    return (
      this.id.value === otherPushNotification.id.value &&
      this.title === otherPushNotification.title &&
      this.body === otherPushNotification.body &&
      this.token === otherPushNotification.token &&
      this.body === otherPushNotification.body
    )
  }
}
