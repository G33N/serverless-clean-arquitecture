import { Invoke } from '@shared/domain/Invoke'
import { InvokeResponse } from '@shared/domain/InvokeResponse'

export interface InvokeRepository {
  invokeEvent(functionName: string, payload: Invoke): Promise<InvokeResponse>
  invokeResponse(functionName: string, payload: Invoke): Promise<InvokeResponse>
}
