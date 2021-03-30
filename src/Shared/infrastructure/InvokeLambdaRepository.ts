import { Invoke } from '@shared/domain/Invoke'
import { InvokeResponse } from '@shared/domain/InvokeResponse'
// import { Logger } from '@shared/domain/Logger'
import { Lambda } from 'aws-sdk'

import { InvokeRepository } from '@shared/domain/InvokeRepository'

export type InvocationType = 'Event' | 'RequestResponse' | 'DryRun' | string

export class InvokeLambdaRepository implements InvokeRepository {
  constructor() {}

  async invokeEvent(functionName: string, payload: Invoke): Promise<InvokeResponse> {
    // this.logger.debug(
    //   JSON.stringify({
    //     method: 'InvokeRepository.invokeEvent',
    //     data: { body: { functionName, payload } }
    //   })
    // )
    const lambda = new Lambda()

    try {
      const params = {
        FunctionName: functionName,
        InvocationType: 'Event',
        Payload: JSON.stringify(payload)
      }
      const result = await lambda.invoke(params).promise()

      // this.logger.debug(JSON.stringify({ message: 'invokeEventResponse', data: { body: result } }))

      const response: InvokeResponse = {
        statusCode: result.StatusCode,
        body: String(result.Payload)
      }

      return response
    } catch (error) {
      // this.logger.error(
      //   JSON.stringify({ method: 'InvokeRepository.invokeEvent Error', data: { error } })
      // )
      throw new Error(`Error invoking invokeEvent ${error}`)
    }
  }

  async invokeResponse(functionName: string, payload: Invoke): Promise<InvokeResponse> {
    // this.logger.debug(
    //   JSON.stringify({
    //     method: 'InvokeRepository.invokeResponse',
    //     data: { body: { functionName, payload } }
    //   })
    // )
    const lambda = new Lambda()

    try {
      const params = {
        FunctionName: functionName,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(payload)
      }

      const result = await lambda.invoke(params).promise()

      // this.logger.debug(JSON.stringify({ message: 'invokeResponse', data: { body: result } }))

      return JSON.parse(`${String(result.Payload)}`)
    } catch (error) {
      // this.logger.error(
      //   JSON.stringify({ method: 'InvokeRepository.invokeResponse Error', data: { error } })
      // )
      throw new Error(`Error invoking invokeResponse ${error}`)
    }
  }
}
