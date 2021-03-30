import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@shared/apiGateway'
import { formatJSONResponse } from '@shared/apiGateway'
import { middyfy } from '@shared/lambda'

import { DynamoOnboardingStatusRepository } from '@onboarding/OnboardingStatus/infrastructure/DynamoOnboardingStatusRepository'
import { ClientId } from '@onboarding/Client/domain/ClientId'
import { OnboardingStatusCreator } from '@onboarding/OnboardingStatus/application/OnboardingStatusCreator'
import dayjs from 'dayjs'
import schema from './schema'

const createOnboardingStatus: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const onboardingStatusCreator = new OnboardingStatusCreator(
    new DynamoOnboardingStatusRepository()
  )
  const clientId = new ClientId(event.body.clientId)

  try {
    await onboardingStatusCreator.run({
      clientId,
      notificationsSended: 1,
      lastNotification: dayjs().format(),
      status: 'pending'
    })

    return formatJSONResponse({
      message: `Status for ${clientId}, created`,
      event
    })
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
}

export const main = middyfy(createOnboardingStatus)
