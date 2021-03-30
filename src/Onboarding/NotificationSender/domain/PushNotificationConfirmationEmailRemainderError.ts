export class PushNotificationConfirmationEmailRemainderError extends Error {
  constructor(userDeviceToken: string) {
    super(`Error sending confirmation push notification reminder to ${userDeviceToken}`)
  }
}
