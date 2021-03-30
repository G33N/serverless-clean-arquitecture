import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@shared/apiGateway'
import { formatJSONResponse } from '@shared/apiGateway'
import { middyfy } from '@shared/lambda'

import { OnboardingStatusFinder } from '@onboarding/OnboardingStatus/application/OnboardingStatusFinder'
import { DynamoOnboardingStatusRepository } from '@onboarding/OnboardingStatus/infrastructure/DynamoOnboardingStatusRepository'
import { ClientId } from '@onboarding/Client/domain/ClientId'
import { OnboardingStatusCreator } from '@onboarding/OnboardingStatus/application/OnboardingStatusCreator'

const checkOnboardingStatus: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const onboardingStatusFinder = new OnboardingStatusFinder(new DynamoOnboardingStatusRepository())
  const onboardingStatusCreator = new OnboardingStatusCreator(
    new DynamoOnboardingStatusRepository()
  )
  const clientId = new ClientId('12ca2da4-7239-4593-a2a7-37f289e24dbf')

  try {
    const onboardingStatus = await onboardingStatusFinder.run({ clientId })

    return formatJSONResponse({
      message: `Notification ${clientId}, sended`,
      data: onboardingStatus.toPrimitives(),
      event
    })
  } catch (error) {
    try {
      const onboardingStatus = await onboardingStatusCreator.run({
        clientId,
        notificationsSended: 1,
        lastNotification: '26/03/2021',
        status: 'pending'
      })
      console.log(`STATUS: ${onboardingStatus}`)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }

    console.log(`ERROR: ${error}`)
  }
}

export const main = middyfy(checkOnboardingStatus)
