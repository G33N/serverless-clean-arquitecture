import * as dynamoose from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'

class OnboardingStatus extends Document {
  clientId: string

  notificationsSended: number

  lastNotification: string

  status: string
}

export const OnboardingStatusModel = dynamoose.model<OnboardingStatus>(
  process.env.DYNAMODB_TABLE_NAME,
  {
    clientId: String,
    notificationsSended: Number,
    lastNotification: String,
    status: String
  }
)
