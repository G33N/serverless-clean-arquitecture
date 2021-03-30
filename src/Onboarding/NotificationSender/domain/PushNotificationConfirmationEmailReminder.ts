import { PushNotification } from './PushNotification'

export class PushNotificationConfirmationEmailReminder extends PushNotification {
  constructor(token: string) {
    super({
      title: 'Reminder',
      body: 'Account confirmation reminder',
      token
    })
  }
}
