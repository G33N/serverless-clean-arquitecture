export class ClientNotExist extends Error {
  constructor() {
    super('The client does not exists')
  }
}
