import { Email } from './Email'
import { PushNotification } from './PushNotification'

export interface NotificationSender {
  sendEmail(email: Email): Promise<void>
  sendPush(pushNotification: PushNotification): Promise<void>
}
