export enum HttpMethod {
  POST = 'POST',
  PUT = 'PUT'
}

export interface Invoke {
  resource?: string
  body: string
  httpMethod?: HttpMethod
  headers?: { [name: string]: string }
  pathParameters?: { [name: string]: string } | null
  queryStringParameters?: { [name: string]: string } | null
}
