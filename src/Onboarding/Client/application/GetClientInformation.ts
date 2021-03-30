import { InvokeRepository } from '@shared/domain/InvokeRepository'
// import { ClientId } from '@onboarding/Client/domain/ClientId'
import { HttpMethod, Invoke } from '@shared/domain/Invoke'
import { ClientNotExist } from '../domain/ClientNotExist'

type Params = {
  clientId: string
}

export class GetClientInformation {
  constructor(private readonly repository: InvokeRepository) {}

  async run({ clientId }: Params) {
    const payload: Invoke = {
      resource: '/account/internal',
      body: JSON.stringify({ internalClientId: clientId }),
      httpMethod: HttpMethod.POST
    }

    const clientDetails = await this.repository.invokeEvent(process.env.ACCOUNT_LAMBDA, payload)

    // this.logger.debug(JSON.stringify(clientDetails))

    if (!clientDetails) {
      throw new ClientNotExist()
    }

    return clientDetails
  }
}
